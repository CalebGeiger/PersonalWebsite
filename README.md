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

Commands: `help` `neofetch` `whoami` `about` `skills` `experience` `ls`
`cat <project>` `trace <project>` `contact` `goto <section>` `crt` `clear`, plus
arrow-key history, Tab completion (of commands and of `cat`/`trace`/`goto`
arguments) and `Ctrl-L`. To add one, add a method to the `COMMANDS` object — Tab
completion and the dispatcher pick it up automatically; add a line to the list in
`help()` too. A command that fails should `return fail(msg)`, which turns the ❯
prompt red until the next success.

`cat` and `trace` match on the `data-slug` attribute of each `.project-row`, so
keep those slugs in sync if you rename a project. `trace` scrolls to the row and
runs its diagram's `.d-flow` animation for a few seconds (the `.tracing` class).

**Chrome.** No macOS traffic lights anywhere. The hero terminal has a tmux
status line (window name follows the last command, clock is Pittsburgh time), a
two-line starship-style prompt, and boots into a `neofetch` card whose values are
read from `#about` and `#experience`. The about box is a vim buffer: tabline,
statusline, `~` past EOF, and a cursorline whose position the statusline reports.
The 404 page uses the same tmux bar. The neofetch art is set in the *system*
mono, since the Google Fonts cut of JetBrains Mono has no box-drawing or block
glyphs. Phosphor glow and vignette are part of the CRT effect and toggle with
`crt`.

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
- **Print** collapses to an ink-friendly one-pager, diagrams included (`Cmd-P`),
  and forces scroll-reveal content visible so nothing is lost printing from the top.
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
