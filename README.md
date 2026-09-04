# calebgeiger.com

Personal site / portfolio. Static, single file, no build step — deployed via GitHub Pages
from `main` (domain set by [`CNAME`](CNAME)).

## Files

| Path                   | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `index.html`           | The whole site — markup, CSS and JS inline.                    |
| `og-image.png`         | 1200×630 social preview card (LinkedIn, Slack, iMessage, X).    |
| `apple-touch-icon.png` | 180×180 iOS home-screen icon. Favicon is an inline SVG data URI. |
| `CNAME`                | Custom domain for GitHub Pages.                                 |

## Local development

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

Or use the VS Code Live Server extension (configured for port 5501 in
[`.vscode/settings.json`](.vscode/settings.json)).

## Editing notes

- **Sections** are numbered `00`–`04` in the `.section-label` text. Renumber if you
  add or reorder them, and keep the `#id`, the nav link, and `aria-labelledby` in sync.
- **Colors** are CSS custom properties at the top of the `<style>` block. `--text-dim`
  and `--green-dim` carry real copy and are kept at ≥4.5:1 contrast on the background;
  `--text-faint` is the dimmest step still safe for text. Dropping any of them darker
  will fail WCAG AA.
- **Animations** all no-op under `prefers-reduced-motion: reduce`. The scroll-reveal
  effect is gated behind a `.js` class on `<html>`, so content stays visible if JS fails.
- **Print** styles collapse the page into an ink-friendly one-pager (`Cmd-P` to check).
- **Social preview:** regenerate `og-image.png` if the name or title changes. After
  deploying, re-scrape the URL in
  [LinkedIn's Post Inspector](https://www.linkedin.com/post-inspector/) to bust its cache.

## TODO

- [ ] Add metrics to the `#projects` cards (records processed, hours saved, close-time cut).
- [ ] Fill in the `currentlyLearning` line in `#about` (commented placeholder in the source).
- [ ] Add a résumé PDF and un-comment the download link in `#contact`.
- [ ] Trim the `#skills` tags to what you'd want to be interviewed on.
