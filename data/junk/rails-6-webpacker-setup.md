---
title: "Rails 6 Webpacker Setup"
slug: "rails-6-webpacker-setup"
description: 'Basic webpacker setup for Rails 6 with "default" jQuery option and / or React.'
image:
  height: 2848
  width: 4288
  src: junk-rails.jpg
tags: "Rails,JavaScript,CSS"
createdAt: "2021-10-01T17:00:00.816Z"
updatedAt: "2021-10-01T17:00:00.816Z"
pinned: false
---

### Important notes regarding "tags"

In `<%= stylesheet_link_tag 'application', ... %>`, the _\_link_tag_ part refers to **app/assets** a.k.a "sprockets" side of things. `stylesheet_pack_tag` and `javascript_pack_tag` refer to **app/javascript/packs** a.k.a webpacker, former for extracting styles, latter for JS. When working with webpacker, having `<%= stylesheet_pack_tag ... %>` is not necessary in "development". **It is however required in "production".** This is where `extract_css: true` option in **config/webpacker.yml** also becomes important.

### Adding Bootstrap (as example)

```bash
$ yarn add bootstrap popper jquery
```

**config/webpack/environment.js:**

```js
// ...
const webpack = require("webpack");

environment.plugins.append(
  "Provide",
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    Popper: ["popper.js", "default"],
  })
);
// ...
```

**app/javascript/packs/application.js:**

```js
import "bootstrap";
import "../stylesheets/custom.scss"; // or whatever/wherever the entry style file is
```

Entry file (for example app/javascript/stylesheets/custom.scss):

```scss
@import "~bootstrap/scss/bootstrap";
```

**config/webpacker.yml:**

```yml
extract_css: true
```

### Adding React or Vue to a project

```bash
## new
$ rails new myapp --webpack=react
## existing
$ bundle exec rails webpacker:install:react
```

...and follow appropriate instructions.

#### Other notes

**app/javascript/...** is a silly name for that folder, considering the context. There can be scss files in there and image assets. Renaming it to say "webpacker", "client", "app", "frontend", whatever feels right seems like a reasonable solution. Source path in **webpacker.yml** needs to be updated accordingly:

```yml
source_path: app/client # if named "client"
```
