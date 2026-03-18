# `create-preact`

![Preact logo](./src/assets/preact.svg)

<h3 align="center">Get started using Preact and Vite!</h3>

## Getting Started

- `npm run dev` - Starts a dev server at http://localhost:5173/
- `npm run build` - Builds the app for production into `../dist/app`
- `npm run preview` - Starts a server at http://localhost:4173/ to test the production app build locally
- `npm run storybook` - Starts Storybook at http://localhost:6006/
- `npm run build-storybook` - Builds Storybook into `../dist/storybook`

The desktop host still serves from `MtgTools.App/wwwroot`, so a later .NET build step can copy the bundles from `MtgTools.Ui/dist` into the final output folder.
