---
title: Next.js translations (i18n) setup
slug: nextjs-i18n
description: Simpleton i18n setup within Next.js app without additinal packages.
tags: JavaScript,React,Next
pinned: true
image:
  height: 0
  width: 0
createdAt: "2021-10-13"
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

Next, create locales folder with translations (`locales/en.json`, `locales/fi.json`). Folders location doesn't matter.

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

`const locale = e.target.value + router.asPath` is there to remain on the same path. To instead go to the front page on change `e.target.value` is enough. Note that `router.asPath` is used instead of `router.pathname` because in case of a dynamic route `pathname` will print `/[dynamicId]` instead of `/dunamicRouteName`.

### Clientside translations

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

This can be extracted into React context instead and used as:

```jsx
const { t } = useContext(I18nContext);

return <div>{t.someValue}</div>;
```

Or with custom hook:

```jsx
const { t } = useTranslate();

return <div>{t.someValue}</div>;
```

### Serverside

Above works well enough for client-side translations, if SEO and serverside is of no concern. Note that the source ("View Page Source") will have default values specified in context despite locale. For serverside, locale can be accessed in `getStaticProps(context)` and passed down in props.

```jsx
import en from "./locale/en.json";
import fi from "./locale/fi.json";

//...

export async function getStaticProps({ locale }) {
  // ...
  const translation = locale === "en" ? en : fi;

  return {
    props: {
      projects: allProjects,
      translation,
    },
  };
}
```

This ensures serverside translation for proper SEO. Props then can be passed down to components via drilling or context. This can then be repeated on every page. HOWEVER, it seems context cannot be accessed "serverside", so trying to update it in `useEffect()` after receiving the props will not give the expected results. It will only update clientside and so page source, once again will be empty (or have context default value). For better, and more serious solutions, look into `react-intl` package (or other similar).

### Dynamic routes

Note that `getStaticPaths` need to be instructed manually to generate paths for all locales. For other non-dynamic path `getStaticProps` pages this will be done automatically. What does it mean practically?

If `getStaticPaths` has `fallback: false`, other locale paths (besides `defaultLocale`) will need to be generated and Next will not do it automatically. There are 3 options here to deal with this:

#### Set `fallback: "blocking"`

Paths not returned by `getStaticPaths` will be generated and served at runtime (SSR).

#### Set `fallback: true`

Same as above, but handle no data in component (loading spinner).

#### Generate locale paths

```jsx
export const getStaticPaths = ({ locales }) => {
  return {
    paths: [
      // if no `locale` is provided only the defaultLocale will be generated
      { params: { slug: 'post-1' }, locale: 'en' },
      { params: { slug: 'post-1' }, locale: 'fi' },
    ],
    // ...
  }
```
