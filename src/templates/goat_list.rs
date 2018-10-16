pub static GOAT_LIST_PARTIAL: &'static str = r##"<ul class="goat-list">
{{#each goats}}
  <li>
    <a href="{{image}}" class="goat-img-link">
      <img src="{{image_small}}" alt="{{name}} the goat">
    </a>
    <div class="goat-info">
      <a href="{{image}}" class="goat-name-link">
        <h3 class="goat-name">{{name}}</h3>
      </a>
      {{#if is_favorite}}
        <form action="/remove-favorite" method="post">
      {{else}}
        <form action="/add-favorite" method="post">
      {{/if}}
        <input name="id" type="hidden" value="{{id}}">
        {{#if is_favorite}}
          <button type="submit" class="unfavorite">Remove from Favorites</button>
        {{else}}
          <button type="submit" class="favorite">Add to Favorites</button>
        {{/if}}
      </form>
    </div>
  </li>
{{/each}}
</ul>"##;
