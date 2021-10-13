---
title: Next.js Translations (i18n) Setup
slug: nextjs-i18n
description: Simple i18n setup within Next.js app without additinal packages.
pinned: true
tags: JavaScript,React,Next
image:
  height: 0
  width: 0
createdAt: "2021-10-13T00:00:00.067Z"
updatedAt: "2021-10-13T00:00:00.067Z"
---

Next.js has built in support for i18n in form of internationalized routing since `v10.0.0`. Locale options are provided through next-router and so can be accessed through `getStaticProps(context)` or `useRouter()`. The actual translation handling is up to you. As Vercel states "The i18n routing support is currently meant to complement existing i18n library solutions".

## No additional libraries "simpleton" solution

`next.config.js`:

```js
module.exports = {
  // ...
  i18n: {
    locales: ["en", "fi"],
    defaultLocale: "en",
    localeDetection: false,
  },
  // ...
};
```

Default sub-path routing strategy will append locale to domain (i.e. `www.domain.com/fi/some/path`). `localeDetection` option will automatically redirect users to their default locale if it exists.

Next, create locales folder with translations (`locales/en.json` / `locales/fi.json`). Folders location doesn't matter.

### Locale switch (language switch)

In desired component the switch could be a link like this:

```jsx
const router = useRouter();

return (
  <Link href="/" locale={router.locale === "en" ? "fi" : "en"}>
    <button>{router.locale.toUpperCase()}</button>
  </Link>
);
```

Or a select with programmatic change:

```jsx
const router = useRouter();

function changeLanguage(e) {
  const locale = e.target.value + router.asPath;
  router.replace(`/`, "/", { locale });
}

return (
  <select defaultValue={router.locale} onChange={changeLanguage}>
    <option value="en">EN</option>
    <option value="fi">FI</option>
  </select>
);
```

`const locale = e.target.value + router.asPath` is there to remain on the same path. To just go to front page `e.target.value` is enough. Note that `router.asPath` is used instead of `router.pathname` because in case of a dynamic route `pathname` will print `/[dynamicId]` instead of `/dunamicRouteName`.

### Client-side translations

A simple in component solution would be to import both translation files, access `useRouter()` to pull locale. Along the lines of:

```jsx
import en from "./locale/en.json";
import fi from "./locale/fi.json";

// ...

const router = useRouter();
const { locale } = router;
const t = locale === "en" ? en : fi;

return <div>{t.someValue}</div>;
```

#### Using React context

...
