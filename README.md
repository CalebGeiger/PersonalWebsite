# calebgeiger.com

Personal site / portfolio. Static, single file, no build step, no dependencies —
deployed via GitHub Pages from `main` (domain set by [`CNAME`](CNAME)).

## Files

| Path                   | Purpose                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| `index.html`           | The whole site — markup, CSS and JS inline.                      |
| `404.html`             | Terminal-styled not-found page. GitHub Pages picks it up by name. |
| `og-image.png`         | 1200×630 social preview card (LinkedIn, Slack, iMessage, X).      |
| `apple-touch-icon.png` | 180×180 iOS home-screen icon. Favicon is an inline SVG data URI.  |
| `CNAME`                | Custom domain for GitHub Pages.                                   |

## Local development

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

Or the VS Code Live Server extension (port 5501, set in
[`.vscode/settings.json`](.vscode/settings.json)).

## Design system

**Colour carries meaning.** Three accents, three jobs — nothing takes an accent
unless it belongs to one of these categories. That rule is what keeps the page
from collapsing back into monochrome green:

| Token     | Colour | Means                | Used on                                  |
| --------- | ------ | -------------------- | ---------------------------------------- |
| `--ident` | amber  | who he is            | name accent, role, company names         |
| `--live`  | green  | alive / interactive  | links, focus, active nav, terminal, flow |
| `--data`  | cyan   | machine facts        | dates, stack tags, metadata, diagrams    |
| `--text`  | white  | structure and prose  | headings, body copy                      |

**Type is a two-voice system.** IBM Plex Sans for prose and headings; JetBrains
Mono for machine-facing things — nav, labels, tags, code, diagrams, the terminal.
Mono everywhere is a texture with no contrast, and it reads badly at paragraph
length; the split is what makes the page look designed rather than themed.

**Section widths vary on purpose** — 900px for prose, 1100px for projects (the
diagrams need room), and Skills is a full-bleed tinted band. One repeated column
for a whole page is what makes a site feel like a template.

Every colour used for text clears WCAG AA (4.5:1) on its surface. Verified with
axe-core: 0 violations on both pages.

## The hero terminal

A real command line, not a prop. It is strictly **additive** — everything it can
print already exists in the page below, so hiding it (which happens under 1000px,
where a typed CLI behind a soft keyboard is worse than none) costs no content.

It reads its answers **out of the live DOM** rather than from a second copy of the
content. Edit a project or a job in the markup and the terminal updates for free;
there is no parallel data structure to drift. All output goes in via `textContent`.

Commands: `help` `whoami` `about` `skills` `experience` `ls` `cat <project>`
`contact` `goto <section>` `crt` `clear`, plus arrow-key history, Tab completion
and `Ctrl-L`. To add one, add a method to the `COMMANDS` object — it is picked up
by `help`, by Tab completion and by the dispatcher automatically.

`cat` matches on the `data-slug` attribute of each `.project-row`, so keep those
slugs in sync if you rename a project.

## Architecture diagrams

Each project row carries an inline SVG flow diagram on a `0 0 620 120` viewBox.
Nodes are `<rect class="d-node">` + centred `<text class="d-label">`; connectors
are a `.d-wire` base line with a `.d-flow` dashed line stacked on top, which
animates on row hover so data visibly moves.

The three deliberately have **different shapes** — linear pipeline, write-back
loop, fan-in merge — so they read as real architecture rather than one template
repeated three times.

Each `<svg>` needs `role="img"` and an `aria-label` describing the flow in prose;
that label is the only thing a screen reader gets. Keep text inside the viewBox
(long labels near x=620 will collide with the panel edge).

## Editing notes

- **Sections** are numbered `00`–`04` in `.section-label`. Renumber if you add or
  reorder, and keep the `#id`, the nav link and `aria-labelledby` in sync.
- **Animations** all no-op under `prefers-reduced-motion: reduce`. Scroll-reveal
  is gated behind a `.js` class on `<html>`, so content stays visible if JS fails.
- **Scanlines and grid are hero-only.** They used to cover the whole page, which
  cost legibility on body copy. `crt` in the terminal toggles them.
- **Print** collapses to an ink-friendly one-pager, diagrams included (`Cmd-P`).
- **Social preview:** regenerate `og-image.png` if the name or title changes, then
  re-scrape the URL in
  [LinkedIn's Post Inspector](https://www.linkedin.com/post-inspector/) to bust
  its cache.

## TODO

- [ ] Add real metrics to the project rows — records processed, hours saved,
      close-time cut. The diagrams show *what*; numbers show *how much*, and that
      is the single biggest remaining upgrade to the page.
- [ ] Resolve the two overlapping "Full-time" roles in `#experience`
      (Krecom 2025–Present and Schools In 2023–Present).
- [ ] Trim `#skills` to what you'd want to be interviewed on.
- [ ] Fill in the `currentlyLearning` line in `#about` (commented in the source).
- [ ] Add a résumé PDF and a download link in `#contact`.
