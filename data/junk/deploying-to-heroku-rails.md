---
title: "Deploying To Heroku (Rails)"
slug: "deploying-to-heroku-rails"
description: "Deploying Rails applications to heroku, using Heroku CLI."
image:
  height: 2848
  width: 4288
  src: junk-rails.jpg
tags: "Rails,Git"
createdAt: "2021-10-01T17:30:00.816Z"
updatedAt: "2021-10-01T17:30:00.816Z"
pinned: false
---

Assuming the account is setup and still working:

Install CLI: `brew tap heroku/brew && brew install heroku`
Source: https://devcenter.heroku.com/articles/heroku-cli#download-and-install

Run `heroku login` to login into CLI. Will redirect to browser login.

## Setup the project for production

In Gemfile, move 'sqlite3' gem to development and test group. Add 'pg' gem under production group:

```ruby
group :development, :test do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3', '~> 1.4'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :production do
  # Use postgres as the database for Active Record
  gem 'pg'
end
```

Run `bundle install --without production` to install the gems properly, without installing `pg` locally. This will make the necessary updates to Gemfile.lock file, which is necessary for production. Finally, push the code to Git.

**IMPORTANT: Don't forget to change stylesheet_link_tag to stylesheet_pack_tag, for assets to compile the right way in production. [Why?](/junkyard/15 "Rails 6 Webpacker Setup")**

## Deploying

With new app, run `heroku create`, to create a "shell" for the app.

`git push heroku master` to deploy the app.

`heroku run rails db:migrate` to migrate.

`heroku open` to open it after deployment

## Heroku commands

`heroku rename new-name` to rename the app & address

### Other notes

Adding a Node buildpack on Heroku project _might_ be required, but so far haven't seen any definitive proof of that.
