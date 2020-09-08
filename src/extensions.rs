use js_sys::Error;
use std::fmt::Display;
use wasm_bindgen::prelude::*;

pub trait ToJsResult<T> {
    fn ok_or_js_err(self) -> Result<T, JsValue>;
}

pub trait ToJsResultWithMsg<T> {
    fn ok_or_js_err_with_msg(self, msg: &str) -> Result<T, JsValue>;
}

impl<T> ToJsResult<T> for Option<T> {
    fn ok_or_js_err(self) -> Result<T, JsValue> {
        match self {
            Some(v) => Ok(v),
            None => Err(JsValue::from(Error::new("expected Some but found None"))),
        }
    }
}

impl<T> ToJsResultWithMsg<T> for Option<T> {
    fn ok_or_js_err_with_msg(self, msg: &str) -> Result<T, JsValue> {
        match self {
            Some(v) => Ok(v),
            None => Err(JsValue::from(Error::new(msg))),
        }
    }
}

impl<T, E> ToJsResult<T> for Result<T, E>
where
    E: Display,
{
    fn ok_or_js_err(self) -> Result<T, JsValue> {
        match self {
            Ok(v) => Ok(v),
            Err(e) => Err(JsValue::from(Error::new(&e.to_string()))),
        }
    }
}

impl<T, E> ToJsResultWithMsg<T> for Result<T, E> {
    fn ok_or_js_err_with_msg(self, msg: &str) -> Result<T, JsValue> {
        match self {
            Ok(v) => Ok(v),
            Err(_e) => Err(JsValue::from(Error::new(msg))),
        }
    }
}
