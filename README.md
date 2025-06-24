This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
frontend
├─ components.json
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ defaults
│  │  └─ avatar.jpg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ logo-dark-2.png
│  ├─ logo-dark.png
│  ├─ logo-light.png
│  ├─ logo.png
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ (auth)
│  │  │  ├─ login
│  │  │  │  ├─ layout.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ signup
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ student
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ teacher
│  │  │  │     └─ page.tsx
│  │  │  └─ verify-email
│  │  │     ├─ layout.tsx
│  │  │     ├─ page.tsx
│  │  │     └─ VerifyEmail.tsx
│  │  ├─ (demo)
│  │  │  └─ test
│  │  │     ├─ layout.tsx
│  │  │     └─ page.tsx
│  │  ├─ api
│  │  │  └─ (auth)
│  │  │     ├─ login
│  │  │     │  └─ route.ts
│  │  │     ├─ logout
│  │  │     │  └─ route.ts
│  │  │     ├─ refresh
│  │  │     │  └─ route.ts
│  │  │     ├─ signup
│  │  │     │  └─ route.ts
│  │  │     └─ verify-email
│  │  │        ├─ sent-code
│  │  │        │  └─ route.ts
│  │  │        └─ verify-code
│  │  │           └─ route.ts
│  │  ├─ dashboard
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components
│  │  ├─ app-sidebar.tsx
│  │  ├─ auth
│  │  │  ├─ JoinAsRole.tsx
│  │  │  └─ JoinUSWindow.tsx
│  │  ├─ basic
│  │  │  ├─ ChangeThemeBtn.tsx
│  │  │  └─ Navbar.tsx
│  │  ├─ dashboard
│  │  │  ├─ CourseCard.tsx
│  │  │  ├─ Dashboard.tsx
│  │  │  ├─ Logo.tsx
│  │  │  ├─ Watch.tsx
│  │  │  └─ Watch2.tsx
│  │  ├─ form
│  │  │  ├─ FooterTxt.tsx
│  │  │  ├─ FormHeader.tsx
│  │  │  ├─ InputField.tsx
│  │  │  ├─ ORLine.tsx
│  │  │  ├─ OtpFooter.tsx
│  │  │  ├─ OtpForm.tsx
│  │  │  ├─ OtpHeader.tsx
│  │  │  ├─ OtpInput.tsx
│  │  │  ├─ SubmitBtn.tsx
│  │  │  └─ WithGoogleBtn.tsx
│  │  ├─ icons.tsx
│  │  ├─ nav-main.tsx
│  │  ├─ nav-projects.tsx
│  │  ├─ nav-secondary.tsx
│  │  ├─ nav-user.tsx
│  │  ├─ search-form.tsx
│  │  ├─ signup-form-demo.tsx
│  │  ├─ site-header.tsx
│  │  └─ ui
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button.tsx
│  │     ├─ card.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ GradientLine.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ progress.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ sonner.tsx
│  │     └─ tooltip.tsx
│  ├─ hooks
│  │  └─ use-mobile.ts
│  ├─ lib
│  │  ├─ delay.ts
│  │  ├─ deleteToken.ts
│  │  ├─ getTokens.ts
│  │  ├─ sent-verification-code.ts
│  │  ├─ utils.ts
│  │  └─ validateFormData.ts
│  ├─ middleware.ts
│  ├─ redux
│  │  ├─ features
│  │  │  ├─ auth
│  │  │  │  ├─ authSlice.ts
│  │  │  │  └─ loginWithEmail.ts
│  │  │  └─ counter
│  │  │     └─ counterSlice.ts
│  │  ├─ hooks.ts
│  │  ├─ provider.tsx
│  │  └─ store.ts
│  ├─ styles
│  │  └─ globals.css
│  └─ types
│     ├─ auth.ts
│     └─ watch.ts
└─ tsconfig.json

```