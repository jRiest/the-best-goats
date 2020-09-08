mod extensions;
mod templates;
mod utils;

use crate::extensions::*;
use cfg_if::cfg_if;
use cookie::Cookie;
use handlebars::Handlebars;
use http::StatusCode;
use js_sys::{Array, Promise};
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use time::Duration;
use url::Url;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use wasm_bindgen_futures::{future_to_promise as ftp, JsFuture};
use web_sys::{FetchEvent, FormData, Headers, Request, Response, ResponseInit};

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

type GoatId = u32;

#[wasm_bindgen]
extern "C" {
    type GoatsNs;

    #[wasm_bindgen(static_method_of = GoatsNs)]
    fn get(key: &str, data_type: &str) -> Promise;

    #[wasm_bindgen(static_method_of = GoatsNs)]
    fn put(key: &str, val: &str) -> Promise;

    #[wasm_bindgen(static_method_of = GoatsNs)]
    fn delete(key: &str) -> Promise;
}

#[wasm_bindgen]
extern "C" {
    type FavoritesNs;

    #[wasm_bindgen(static_method_of = FavoritesNs)]
    fn get(key: &str, data_type: &str) -> Promise;

    #[wasm_bindgen(static_method_of = FavoritesNs)]
    fn put(key: &str, val: &str) -> Promise;

    #[wasm_bindgen(static_method_of = FavoritesNs)]
    fn delete(key: &str) -> Promise;
}

#[derive(Serialize, Deserialize, Debug)]
struct Goat {
    // properties from database
    id: GoatId,
    name: String,
    image: String,
    #[serde(rename = "imageSmall")]
    image_small: String,
}

static BASE_LAYOUT_TEMPLATE: &'static str = "BASE_LAYOUT";
static ERROR_PAGE_TEMPLATE: &'static str = "ERROR_PAGE";
static FAVORITES_PAGE_TEMPLATE: &'static str = "FAVORITES_PAGE";
static GOAT_LIST_PARTIAL_TEMPLATE: &'static str = "GOAT_LIST_PARTIAL";
static HOME_PAGE_TEMPLATE: &'static str = "HOME_PAGE";
static USER_ID_COOKIE: &'static str = "user_id";
static DEFAULT_TITLE: &'static str = "The Best Goats";

lazy_static! {
    static ref HBARS: Handlebars = {
        let mut reg = Handlebars::new();

        assert!(reg
            .register_template_string(BASE_LAYOUT_TEMPLATE, templates::base::BASE_LAYOUT)
            .is_ok());
        assert!(reg
            .register_template_string(ERROR_PAGE_TEMPLATE, templates::error::ERROR_PAGE)
            .is_ok());
        assert!(reg
            .register_template_string(
                FAVORITES_PAGE_TEMPLATE,
                templates::favorites::FAVORITES_PAGE
            )
            .is_ok());
        assert!(reg
            .register_template_string(
                GOAT_LIST_PARTIAL_TEMPLATE,
                templates::goat_list::GOAT_LIST_PARTIAL
            )
            .is_ok());
        assert!(reg
            .register_template_string(HOME_PAGE_TEMPLATE, templates::home::HOME_PAGE)
            .is_ok());

        reg
    };
}

fn get_user_id(req: &Request) -> Option<String> {
    let headers = req.headers();
    let cookie_header = match headers.get("cookie") {
        Ok(Some(v)) => v,
        _ => return None,
    };
    for cookie_str in cookie_header.split(';').map(|s| s.trim()) {
        if let Ok(c) = Cookie::parse(cookie_str) {
            if c.name() == USER_ID_COOKIE {
                return Some(c.value().to_owned());
            }
        }
    }
    None
}

#[derive(Serialize)]
struct GoatListItem {
    id: GoatId,
    name: String,
    image: String,
    image_small: String,
    is_favorite: bool,
}

fn get_goat_list_items(goats: Vec<Goat>, favorites: &Vec<GoatId>) -> Vec<GoatListItem> {
    goats
        .into_iter()
        .map(|goat| {
            let is_favorite = favorites.contains(&goat.id);
            GoatListItem {
                id: goat.id,
                name: goat.name,
                image: goat.image,
                image_small: goat.image_small,
                is_favorite,
            }
        })
        .collect()
}

fn get_featured_goats() -> Promise {
    GoatsNs::get("featured", "json")
}

async fn get_favorites_from_user_id(user_id: &Option<String>) -> Result<JsValue, JsValue> {
    let js_fut = match user_id {
        Some(sid) => JsFuture::from(FavoritesNs::get(&sid, "json")),
        None => JsFuture::from(Promise::resolve(&JsValue::from(Array::new()))),
    };
    js_fut.await
}

fn generate_error_response(status: StatusCode, msg: Option<&str>) -> Result<JsValue, JsValue> {
    #[derive(Serialize)]
    struct Data {
        title: String,
        parent: &'static str,
        show_favorites: bool,
        error_message: String,
    }
    let status_error_msg = format!(
        "{} {}",
        status.as_u16(),
        status.canonical_reason().unwrap_or("Unknown Error")
    );
    let error_message = match msg {
        Some(v) => v.to_owned(),
        None => status_error_msg.to_owned(),
    };
    let data = Data {
        title: format!("{} - {}", &status_error_msg, DEFAULT_TITLE),
        parent: BASE_LAYOUT_TEMPLATE,
        show_favorites: false,
        error_message,
    };

    let body = HBARS.render(ERROR_PAGE_TEMPLATE, &data).ok_or_js_err()?;

    let headers = Headers::new()?;
    headers.append("content-type", "text/html")?;
    let resp = generate_response(&body, status.as_u16(), &headers)?;
    Ok(JsValue::from(resp))
}

fn generate_redirect_headers(url: &str) -> Result<Headers, JsValue> {
    let headers = Headers::new()?;
    headers.set("location", url)?;
    Ok(headers)
}

fn generate_response(body: &str, status: u16, headers: &Headers) -> Result<Response, JsValue> {
    let mut init = ResponseInit::new();
    init.status(status);
    init.headers(&JsValue::from(headers));
    Response::new_with_opt_str_and_init(Some(body), &init)
}

// Returns the referrer URL if there is one, otherwise
// returns the URL of the request
fn get_referrer_or_orig_url(req: &Request) -> String {
    let req_headers = req.headers();
    match req_headers.get("referer") {
        Ok(Some(v)) => v,
        _ => req.url(),
    }
}

async fn render_home(req: Request) -> Result<JsValue, JsValue> {
    let user_id = get_user_id(&req);
    let favorites_value = get_favorites_from_user_id(&user_id).await?;
    let all_goats_value = JsFuture::from(get_featured_goats()).await?;

    let favorites: Vec<GoatId> = favorites_value.into_serde().ok_or_js_err()?;
    let all_goats: Vec<Goat> = all_goats_value.into_serde().ok_or_js_err()?;

    #[derive(Serialize)]
    struct Data {
        title: &'static str,
        parent: &'static str,
        goat_list_template: &'static str,
        show_favorites: bool,
        fav_count: usize,
        goats: Vec<GoatListItem>,
    }
    let data = Data {
        title: DEFAULT_TITLE,
        parent: BASE_LAYOUT_TEMPLATE,
        goat_list_template: GOAT_LIST_PARTIAL_TEMPLATE,
        show_favorites: true,
        fav_count: favorites.len(),
        goats: get_goat_list_items(all_goats, &favorites),
    };
    let body = HBARS.render(HOME_PAGE_TEMPLATE, &data).ok_or_js_err()?;

    let headers = Headers::new()?;
    headers.append("content-type", "text/html")?;
    let resp = generate_response(&body, 200, &headers)?;

    Ok(JsValue::from(resp))
}

async fn render_favorites(req: Request) -> Result<JsValue, JsValue> {
    let user_id = get_user_id(&req);
    let favorites_value = get_favorites_from_user_id(&user_id).await?;
    let all_goats_value = JsFuture::from(get_featured_goats()).await?;

    let favorites: Vec<GoatId> = favorites_value.into_serde().ok_or_js_err()?;
    let all_goats: Vec<Goat> = all_goats_value.into_serde().ok_or_js_err()?;

    let favorite_goats = all_goats
        .into_iter()
        .filter(|goat| favorites.contains(&goat.id))
        .collect();

    #[derive(Serialize)]
    struct Data {
        title: String,
        parent: &'static str,
        goat_list_template: &'static str,
        show_favorites: bool,
        fav_count: usize,
        has_favorites: bool,
        goats: Vec<GoatListItem>,
    }
    let data = Data {
        title: format!("{} - {}", "Favorites", DEFAULT_TITLE),
        parent: BASE_LAYOUT_TEMPLATE,
        goat_list_template: GOAT_LIST_PARTIAL_TEMPLATE,
        show_favorites: true,
        fav_count: favorites.len(),
        has_favorites: favorites.len() > 0,
        goats: get_goat_list_items(favorite_goats, &favorites),
    };
    let body = HBARS
        .render(FAVORITES_PAGE_TEMPLATE, &data)
        .ok_or_js_err()?;

    let headers = Headers::new()?;
    headers.append("content-type", "text/html")?;
    let headers = Headers::new()?;
    headers.append("content-type", "text/html")?;
    let resp = generate_response(&body, 200, &headers)?;

    Ok(JsValue::from(resp))
}

async fn proxy_image(path: String) -> Result<JsValue, JsValue> {
    let url = format!("https://storage.googleapis.com/best_goats{}", path);
    let request = match Request::new_with_str(&url) {
        Ok(v) => v,
        Err(e) => return JsFuture::from(Promise::reject(&e)).await,
    };

    match web_sys::window() {
        Some(window) => JsFuture::from(window.fetch_with_request(&request)).await,
        None => generate_error_response(
            StatusCode::INTERNAL_SERVER_ERROR,
            Some("Error updating favorites"),
        ),
    }
}

fn render_error(status: StatusCode) -> Promise {
    match generate_error_response(status, None) {
        Ok(v) => Promise::resolve(&v),
        Err(e) => Promise::reject(&e),
    }
}

enum FavoritesModification {
    Add,
    Remove,
}

async fn modify_favorites(
    event: FetchEvent,
    modification: FavoritesModification,
) -> Result<JsValue, JsValue> {
    let req = &event.request();
    let orig_user_id = get_user_id(req);
    let redirect_url = get_referrer_or_orig_url(req);
    let form_data_fut = match req
        .form_data()
        .ok_or_js_err_with_msg("failed to get form_data")
    {
        Ok(v) => v,
        Err(e) => Promise::reject(&e),
    };
    let form_data_value = JsFuture::from(form_data_fut).await?;
    let favorites_value = get_favorites_from_user_id(&orig_user_id).await?;

    let form_data: FormData = form_data_value.dyn_into()?;
    let mut favorites: Vec<GoatId> = favorites_value.into_serde().ok_or_js_err()?;
    let goat_id_str: String = match form_data.get("id").as_string() {
        Some(v) => v,
        None => {
            return generate_error_response(StatusCode::BAD_REQUEST, Some("Missing id parameter"));
        }
    };
    let goat_id: GoatId = match goat_id_str.parse() {
        Ok(v) => v,
        Err(_e) => {
            return generate_error_response(StatusCode::BAD_REQUEST, Some("Invalid id parameter"));
        }
    };

    let modified = match modification {
        FavoritesModification::Add => {
            if !favorites.contains(&goat_id) {
                favorites.insert(0, goat_id);
                true
            } else {
                false
            }
        }
        FavoritesModification::Remove => {
            if let Some(idx) = favorites.iter().position(|x| *x == goat_id) {
                favorites.remove(idx);
                true
            } else {
                false
            }
        }
    };

    if !modified {
        let headers = generate_redirect_headers(&redirect_url)?;
        let resp = generate_response("", 302, &headers)?;
        return Ok(JsValue::from(&resp));
    } else {
        let new_user_id = uuid::Uuid::new_v4().to_string();
        let favorites_json = serde_json::to_string(&favorites).ok_or_js_err()?;
        let update_favorites_promise: Promise = FavoritesNs::put(&new_user_id, &favorites_json);
        let update_favorites_value = JsFuture::from(update_favorites_promise).await;
        match update_favorites_value {
            Ok(_v) => {
                let cookie = Cookie::build(USER_ID_COOKIE, new_user_id)
                    .http_only(true)
                    .secure(true)
                    .max_age(Duration::days(365 * 20))
                    .finish();
                let headers = generate_redirect_headers(&redirect_url)?;
                headers.set("set-cookie", &cookie.to_string())?;

                // Delete the old user_id favorites from KV
                if let Some(uid) = orig_user_id {
                    let delete_old_favorites_promise = FavoritesNs::delete(&uid);
                    event.wait_until(&delete_old_favorites_promise)?;
                }
                let resp = &generate_response("", 302, &headers)?;
                Ok(JsValue::from(resp))
            }
            Err(_e) => generate_error_response(
                StatusCode::INTERNAL_SERVER_ERROR,
                Some("Error updating favorites"),
            ),
        }
    }
}

#[wasm_bindgen]
pub fn main(event: FetchEvent) -> Promise {
    let e = &event;
    let req = e.request();
    let url = match Url::parse(&req.url()).ok_or_js_err() {
        Ok(v) => v,
        Err(e) => return Promise::reject(&e),
    };
    let path = url.path().to_lowercase();
    let method = req.method().to_lowercase();
    let not_allowed = || render_error(StatusCode::METHOD_NOT_ALLOWED);

    match path.split("/").nth(1) {
        Some("") => match method.as_ref() {
            "get" => ftp(render_home(req)),
            _ => not_allowed(),
        },
        Some("favorites") => match method.as_ref() {
            "get" => ftp(render_favorites(req)),
            _ => not_allowed(),
        },
        Some("add-favorite") => match method.as_ref() {
            "post" => ftp(modify_favorites(event, FavoritesModification::Add)),
            _ => not_allowed(),
        },
        Some("remove-favorite") => match method.as_ref() {
            "post" => ftp(modify_favorites(event, FavoritesModification::Remove)),
            _ => not_allowed(),
        },
        Some("images") => match method.as_ref() {
            "get" => ftp(proxy_image(path)),
            _ => not_allowed(),
        },
        _ => render_error(StatusCode::NOT_FOUND),
    }
}
