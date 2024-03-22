# Next.js portfolio website template

## What is this?

Not actual "portfolio website". Trying out Next.js with a portfolio website template of sorts in mind. Since at the time most articles and docs (including Vercel official) on the subject of learning Next.js revolved around building a blog... A portfolio/blog(ish) was made, but with a custom CMS setup.

`¯\_(ツ)_/¯`

## Setup

Uses MongoDb. **MongoDB Atlas** connection in particular was used by the author in 2021.

1. Pull the repo
2. Navigate to project root and install dependencies (`yarn`)
3. Setup MongoDb with MongoDB Atlas (_up-to-date instructions can be found online_)
4. Create `.env.local` file in the projects root and copy `.env.local.example` contents
5. Update the `.env.local` file with actual details
6. Uncomment user creation code block in `pages/api/create.ts` to create an admin user
7. Run the project (`yarn dev`)
8. Navigate to `/admin` path (via browser url bar) and create the admin user
9. Comment out user creation code
10. Update `data/config.json` and `locales/` to whatever and change profile pic (`public/images/profile.jpg`)
11. Create content via admin panel

## Features

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

All resources - "posts", projects (and tags) can be created, updated and deleted. About section can be updated. "Pinned" resources will be displayed on the front page. Create, update and delete API routes are protected.

## Future updates

There won't be. This project was just for trying things out and served it's purpose.
