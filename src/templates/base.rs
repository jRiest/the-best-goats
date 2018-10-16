pub static BASE_LAYOUT: &'static str = r##"<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A place to find the best goats"/>
  <link rel="icon" href="/images/favicon.png">
  <title>{{title}}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
    }
    ol, ul {
      list-style: none;
    }
    body {
      line-height: 1;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background: #eae4e0;
      font-size: 16px;
      color: #222;
    }
    .goat-list {
      display: flex;
      flex-direction: column;
    }
    .goat-list li {
      background: #fff;
      border: 1px solid #d5d5d5;
      padding: 10px;
      margin: 10px 0;
      border-radius: 4px;
    }
    .goat-list {
      margin-bottom: -10px;
    }
    .goat-img-link {
      display: block;
      position: relative;
    }
    .goat-img-link:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.2);
      opacity: 0;
      transition: opacity 300ms;
    }
    .goat-img-link:hover:after {
      opacity: 1;
    }
    .goat-list img {
      width: 100%;
      display: block;
    }
    .goat-list button {
      padding: 8px 12px;
      background: #196ec5;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
    }
    .goat-list button:hover {
      background: #3c92ea;
    }
    .goat-list button:active {
      background: #215488;
    }
    .goat-name {
      font-size: 24px;
    }
    .goat-name-link {
      margin-bottom: 20px;
    }
    .goat-name-link:hover {
      color: #666;
    }
    .goat-info {
      flex-direction: column;
      display: flex;
      padding: 20px 0 10px;
      justify-content: space-between;
      align-items: center;
    }
    nav {
      background: #1a1a1a;
      overflow: hidden;
    }
    nav a:hover {
      opacity: 0.8;
    }
    nav a:active {
      opacity: 0.5;
    }
    a {
      text-decoration: none;
      cursor: pointer;
      color: inherit;
    }
    .nav-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      max-width: 800px;
      padding: 0 20px;
      margin: 0 auto;
    }
    section {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 16px 20px 16px 0;
    }
    .logo-text {
      flex: 0 1 auto;
    }
    .logo-img-wrapper {
      display: block;
      flex: 0 0 auto;
      margin-right: 10px;
      width: 45px;
      height: 42px;
    }
    .logo img {
      width: 100%;
    }
    .favorites-wrapper {
      display: flex;
      align-items: center;
    }
    .favorites-wrapper span {
      display: block;
    }
    .fav-count {
      background: #fff;
      color: #1a1a1a;
      border-radius: 12px;
      text-align: center;
      min-width: 24px;
      min-height: 24px;
      padding: 4px 8px;
      margin-right: 6px;
      flex: 0 0 auto;
    }
    .fav-text {
      line-height: 18px;
    }
    .no-favs-text {
      margin-top: 12px;
    }

    @media (max-width: 320px) {
      .logo-img-wrapper {
        display: none;
      }
    }

    @media (min-width: 400px) {
      .goat-info {
        flex-direction: row;
      }
      .goat-name-link {
        margin-bottom: 0;
        margin-right: 20px;
      }
    }
  </style>
</head>
<body>
  <nav>
    <div class="nav-wrapper">
      <a href="/" class="logo">
        <div class="logo-img-wrapper"><img src="/images/logo.svg" alt="The Best Goats Logo"></div>
        <h1 class="logo-text">The Best Goats</h1>
      </a>
      {{#if show_favorites}}
        <a href="/favorites" class="favorites-wrapper">
          <span class="fav-count">{{fav_count}}</span>
          <span class="fav-text">My Favorites</span>
        </a>
      {{/if}}
    </div>
  </nav>
  <section>
    {{~> page}}
  </section>
</body>
</html>"##;
