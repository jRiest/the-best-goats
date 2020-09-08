use crate::templates;
use handlebars::Handlebars;
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use wasm_bindgen_futures::{future_to_promise, JsFuture};
use web_sys::{FetchEvent, FormData, Headers, Request, Response, ResponseInit};

static BASE_LAYOUT_TEMPLATE: &'static str = "BASE_LAYOUT";
static ERROR_PAGE_TEMPLATE: &'static str = "ERROR_PAGE";
static FAVORITES_PAGE_TEMPLATE: &'static str = "FAVORITES_PAGE";
static GOAT_LIST_PARTIAL_TEMPLATE: &'static str = "GOAT_LIST_PARTIAL";
static HOME_PAGE_TEMPLATE: &'static str = "HOME_PAGE";
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
