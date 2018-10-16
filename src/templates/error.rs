pub static ERROR_PAGE: &'static str = r##"{{#*inline "page"}}
  <h1>{{error_message}}</h1>
{{/inline}}
{{~> (parent)~}}"##;
