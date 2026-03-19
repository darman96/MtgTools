# Suggested Commands

## Common Linux workflow
- `ls` / `ls -a` — inspect directories.
- `cd <folder>` (e.g., `cd MtgTools.App` or `cd MtgTools.Ui.App`) — move into project subfolders.
- `git status`, `git diff` — review working tree changes; stage/commit only when explicitly requested.

## .NET host (`MtgTools.App` + `MtgTools.WebView`)
- `dotnet build MtgTools.slnx` — compile all C# projects and ensure `photino.NET` and the host build cleanly.
- `dotnet run --project MtgTools.App` — launch the desktop host with the UI served from `wwwroot/app`.
- `dotnet run --project MtgTools.App -- --storybook` — launch the host configured to point the WebView at `wwwroot/storybook` (the Storybook build output).

## Front-end (`MtgTools.Ui.App`)
- `npm install` — install dependencies before running front-end scripts.
- `npm run dev` — start Vite dev server (default http://localhost:5173) for live editing.
- `npm run build` — generate the production-ready bundle that normally would end up in `wwwroot/app`.
- `npm run preview` — serve the production bundle locally (http://localhost:4173) for verification.
- `npm run storybook` — start Storybook with `STORYBOOK=true` so the desktop host can render the same Storybook views.
- `npm run build-storybook` — compile Storybook into `../wwwroot/storybook`, matching the assets `MtgTools.App` can host.
- `npm run lint` / `npm run format` / `npm run check` — not yet defined, but you can add scripts pointing to ESLint/formatting tools if needed later; for now rely on `eslint` runs manually if introduced.
