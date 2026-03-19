# Purpose
- Mtg Tools stitches a Photino.NET-backed .NET 10 console host (`MtgTools.App` + `MtgTools.WebView`) with a Vite/Preact web UI so the desktop client can render modern web content and Storybook previews inside a single window.
- The host launches a WebView that points to either `wwwroot/app` or `wwwroot/storybook` depending on whether `--storybook` was passed, keeps window sizing sane, and wires up message handlers such as the `EchoHandler`.

# Tech stack
- C# / .NET 10 console with SDK-style projects, `Microsoft.Extensions.Hosting`, `IConfiguration`, and a lightweight `Photino.NET`-backed WebView layer.
- Web UI built with Vite + Preact (using `preact/compat` so React-style code works), styled via Chakra UI, and with Storybook 10 for component exploration.
- TypeScript 5.9, ESLint (extending `eslint-config-preact`), and NPM-based scripts keep the front-end workflow standardized.

# Structure
- `MtgTools.slnx` references the external `Photino.NET`, the host projects `MtgTools.App` and `MtgTools.WebView`, plus the UI projects `MtgTools.Ui.App` and `MtgTools.Ui.Components`.
- `MtgTools.App` serves static content from `wwwroot/app` (the production UI) and `wwwroot/storybook`, normalizes `--storybook` args, and wires up hosted services like the `EchoHandler`.
- `MtgTools.Ui.App` is a Vite project whose entrypoint is `src/index.tsx`, and `MtgTools.Ui.Components` is a placeholder packages-style project for shared stories/components.
- Static assets from the UI builds (regular site and Storybook build) are committed under the `wwwroot` folder so the host can load them without a separate server.

# Notes
- The front-end is still mostly the default `create-preact` starter, so adding meaningful UI work usually starts with edits in `src/pages/Home` or adding stories in `src/stories/chakra`.
- When in doubt, consult `Program.cs`, the `wwwroot` contents, and `package.json` to see how the build artifacts are expected to be structured for the host/WebView to consume.