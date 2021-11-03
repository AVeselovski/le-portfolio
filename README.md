# Next.js portfolio site / "junk" bank

https://aveselovski.vercel.app/

## What is this?

This shall act as a personal "portfolio" website for when and if ever needed, and a personal "junk" bank. While technically might look like a blog, it isn't. Posts (or "junk") are just personal ramblings and notes for reference, written in a post format in order to force **better notes** (*compared to cryptic out of context snippets in Notes app*) for easier digestion in the future. Helping forgetfulness in a fun, more organized way.

Since most, if not all articles and docs (including Vercel) on the subject of learning Next.js revolves around building a blog, the though here was: "Might just as well..."

`¯\_(ツ)_/¯`

## Next.js

This is done with Next.js with the purpose of learning & testing out Next.js capabilities. As such, there is unfinished code, with no intention to do so, unused features (such as image upload & files read/write), and purposeful inconsistencies in implemetation (i.e. SSG vs SSR vs CSR).

This explanation (hmm... *excuse*) is for whoever decides to judge the authors technical / engineering skills based on this repo. Just saying.

## Setting up

Running this requires MongoDb connection. **MongoDB Atlas** is used by the author in 2021 (in case the author forgets in 2 years).

1. Pull the repo (`git clone git@github.com:AVeselovski/le-portfolio.git`)
2. Navigate to project root and install dependencies (`cd le-portfolio` and `yarn`)
3. Setup MongoDb with MongoDB Atlas (up-to-date instructions can be found online)
4. Create `.env.local` file in the projects root and copy `.env.local.example` contents
5. Update the `.env.local` file with real connection string
6. Uncomment user creation code block in `pages/api/create.ts` to create encrypted admin user
7. Run the project (`yarn dev`)
8. Navigate to `/admin` path (via browser url bar) and create the admin user
9. Create some content

## Some features

### I18n ready

To add translations, update `next.config.js`.

```js
i18n: {
  locales: ["en", "fi"], // <- add locales
  defaultLocale: "en", // <- change default
  localeDetection: false, // <- redirect to browser default
},
```

Add `[new-locale].json` (with copied `en.json` contents) to `locales/` folder and update `locales/index.js`:

```js
import en from "./en.json";
import fi from "./fi.json"; // <- new locale

const locales = { en, fi }; // <- add here
```

### Content management

All resources - "posts", projects (and tags) can be created, updated and deleted. About section can be updated as well. "Pinned" resources will be displayed on the front page.

All create, update and delete API routes are protected.

## Limitations

Time, will & effort.

## Future updates (if any)

- Unit & end-to-end testing with jest & cypress
- Fully converting to TypeScript (seems to have been forgotten halfway through)
- Preview for `.md` with resource forms
- Fixing / implementing image upload would probably be great (if useless)
- The oh so popular light/dark theme switch (how could any website be without... /s)

But this is a _"learn Next.js quickly"_ kind of project and it's unlikely further _real_ effort will be put here.
