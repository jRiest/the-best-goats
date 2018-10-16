pub static FAVORITES_PAGE: &'static str = r##"{{#*inline "page"}}
  <h1>Favorites</h1>
  {{#if has_favorites}}
    {{~> (goat_list_template)~}}
  {{else}}
    <p class="no-favs-text">No favorites yet :(</p>
  {{/if}}
{{/inline}}
{{~> (parent)~}}"##;
