# Portfolio | blog (?)

https://aveselovski.vercel.app/

This shall act as a personal "portfolio" website. While technically could be categorized as a blog, it isn't. "Posts" are just ramblings of a madman, personal notes for reference, written in a post format for easier digestion in the future. Helping forgetfulness in a fun organized way.

Since most, if not all tutorials and docs (including Vercel) on the subject of learning Next.js revolves around building a blog, the though here was: "Might just as well..."

`¯\_(ツ)_/¯`

## Next.js

This is done with Next.js with the purpose of learning & testing out Next.js capabilities. As such, there is blatanly unfinished code, with no intention to do so, useless features (such as image upload & files read/write), and purposeful inconsistencies in implemetation (i.e. SSG vs SSR vs CSR).

This explanation (or excuse) is for whoever decides to judge the authors technical / engineering skills based on this repo. Don't. Or do, just be warned.

## How to run?

1. Pull the repo (`git clone git@github.com:AVeselovski/le-portfolio.git`)
2. Navigate to project root and install dependencies (`cd le-portfolio` and `yarn`)
3. Setup MongoDb with MongoDB Atlas (instructions can be found online)
4. Create `.env.local` file in the projects root and copy `.env.local.example` contents
5. Update the `.env.local` file with real connection string
6. Uncomment user creation code block in `pages/api/create.ts` to create admin user
7. Run the project (`yarn dev`)
8. Navigate to `/admin` path (via browser url bar) and create the admin user
9. Do something

## Some "features"

### I18n ready

To add translations, update `next.config.js`.

```js
i18n: {
  locales: ["en", "fi"], // <- add locales
  defaultLocale: "en", // <- change default
  localeDetection: false, // <- redirect to browser default
},
```

Add `[some-locale].json` (with copied `en.json` contents) to `locales/` folder and update `locales/index.js`:

```js
import en from "./en.json";
import fi from "./fi.json"; // <- new locale

const locales = { en, fi }; // <- add here
```

### Content management

All resources - "posts", projects (and tags) can be created, updated and deleted. About section can be updated as well. "Pinned" resources will be displayed on the front page.

All create, update and delete routes are protected.

## Limitations

Time & effort. Also laziness.

## Future updates

- Fixing / implementing image upload would probably be great
- Fully converting to TypeScript
- Testing with jest & cypress
- Preview for `.md` resource forms
- The oh so popular light/dark theme switch

But this is a _"learn Next.js and update the embarrasing old portfolio site with one stone"_ kind of project / deal. It's unlikely further _real_ effort will be put by the author.
