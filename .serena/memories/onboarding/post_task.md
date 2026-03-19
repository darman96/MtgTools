# After finishing a task
- Run `dotnet build MtgTools.slnx` to confirm the .NET host, `MtgTools.WebView`, and any referenced projects still compile cleanly.
- In `MtgTools.Ui.App`, rerun `npm install` if dependencies changed, then `npm run build` (and optionally `npm run preview`) to make sure the production bundle still generates the files expected under `wwwroot/app`.
- If you touched Storybook stories or shared components, run `npm run build-storybook` so the updated static assets are validated inside `wwwroot/storybook` (the same output those builds use when the host launches with `--storybook`).
- Smoke-test the local experience as needed: `dotnet run --project MtgTools.App` (with or without `--storybook`) exercises the host plus WebView, and `npm run dev` / `npm run storybook` lets you quickly glance at the UI changes.
- Use `git status` / `git diff` to confirm only the intended files changed; keep commits for when explicitly requested, but still stage/track files per the workflow.
- Update README or other docs whenever you introduce new scripts, architectural shifts, or noteworthy steps so future contributors know how to continue the workflow.