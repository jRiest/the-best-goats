pub static HOME_PAGE: &'static str = r##"{{#*inline "page"}}
  <h1>Featured Goats</h1>
  {{~> (goat_list_template)~}}
{{/inline}}
{{~> (parent)~}}"##;
