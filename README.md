# Next.js portfolio site

## What is this?

Trying out Next.js with a portfolio website template of sorts. Since most articles and docs (including Vercel official) on the subject of learning Next.js revolves around building a blog, might just as well...

`¯\_(ツ)_/¯`

## Setting up

To use this as a template requires MongoDb connection. **MongoDB Atlas** is used by the author in 2021 (in case the author forgets in 2 years).

1. Pull the repo (`git clone git@github.com:AVeselovski/le-portfolio.git`)
2. Navigate to project root and install dependencies (`cd le-portfolio` and `yarn`)
3. Setup MongoDb with MongoDB Atlas (up-to-date instructions can be found online)
4. Create `.env.local` file in the projects root and copy `.env.local.example` contents
5. Update the `.env.local` file with real connection string
6. Uncomment user creation code block in `pages/api/create.ts` to create encrypted admin user
7. Run the project (`yarn dev`)
8. Navigate to `/admin` path (via browser url bar) and create the admin user
9. Update `data/config.json` and `locales/` to whatever and change the mugshot to a more pleasant one (`public/images/profile.jpg`)
10. Create content via admin panel

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

Add `[new-locale].json` (with copied `en.json` contents) to `locales/` folder and update `locales/index.tsx`:

```ts
import en from "./en.json";
import fi from "./fi.json"; // <- new locale

const locales: { [key: string]: ITranslation } = { en, fi }; // <- add here
```

Content ("posts", projects) are not translate supported at this time.

### Content management

All resources - "posts", projects (and tags) can be created, updated and deleted. About section can be updated as well. "Pinned" resources will be displayed on the front page.

All create, update and delete API routes are protected.

## Limitations

Time, will & effort.

## Future updates (unlikely)

There won't be. This project served its purpose.
