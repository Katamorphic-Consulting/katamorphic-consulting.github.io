# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static website for Katamorphic Consulting, deployed on Netlify. No build step — the publish root is `.` (see `netlify.toml`). Netlify serverless functions live in `*/api/` subdirectories and run as ES module handlers.

## Previewing locally

Open any `.html` file directly in a browser, or use a simple static server:

```sh
npx serve .
# or
python3 -m http.server 8080
```

Netlify functions (`rquiz/api/`, `aiSurvey/api/`) require the Netlify CLI to run locally:

```sh
npx netlify dev
```

## Architecture

### Main marketing site
- `index.html` + `index.zh.html` / `index.ja.html` / `index.nl.html` — same page in four languages (EN, 中文, 日本語, NL); maintained as parallel files, not generated
- `styles.css` — shared stylesheet used by the main site, blog, and service pages
- `script.js` — minimal shared JS: footer year injection and contact-form dirty-state guard
- `services/` — per-service detail pages, each duplicated across the four language variants (`ai.html`, `ai.zh.html`, etc.)
- `blog/` — standalone blog post HTML files sharing `../styles.css`

### Interactive tools
| Directory | Purpose | Backend |
|-----------|---------|---------|
| `aiSurvey/` | GenAI usage survey for students | Netlify functions → jsonbin.io |
| `rquiz/` | R programming MCQ quizzes (12 quizzes) | Netlify functions → jsonbin.io |
| `matrixedu/` | Matrix operations quiz | Self-contained, Tailwind CDN |
| `mgame/` | Music memory card game | Self-contained, Web Audio API |

### Serverless functions (Netlify)
- `rquiz/api/submit.js` — POST: stores a quiz result keyed by `{firstName → quizTitle → {score, total, submissionTime}}`; rejects duplicate submissions
- `rquiz/api/results.js` — GET: returns merged results (case-insensitive name dedup); protected by `RESULTS_PASSWORD` query param
- `aiSurvey/api/config.js` — GET: exposes jsonbin credentials to the survey client

Required environment variables (set in Netlify dashboard):
- `JSONBIN_API_KEY` / `JSONBIN_SECRET_KEY`
- `JSONBIN_BIN_ID`
- `RESULTS_PASSWORD`

### rquiz answer key
All quiz answers and explanations live in `rquiz/quiz.js` as a single `answers` object keyed by quiz title string. When adding or editing quiz HTML files, the `<h1>` text must exactly match a key in that object — it's how the grading logic finds the answer set.

## Multilingual pages
Language variants are hand-maintained parallel files. When updating content in `index.html`, the same section must be updated in `index.zh.html`, `index.ja.html`, and `index.nl.html`. The same applies to `services/` pages.

## Analytics
Google Analytics (tag `G-8PQ0P2F31V`) is included in every page `<head>`. Preserve it when creating new pages.

## Writing guidelines
- Do not use em dashes in any written content (pages, blog posts, documentation). Rephrase or use commas, colons, or parentheses instead.
- Support factual claims with references and citations. Blog posts and content pages should cite their sources (for example, standards documents, official publications, or reputable articles), preferably with links.
- Do not write anything in commit messages or pull request descriptions beyond a short, plain subject line. No bodies, no attributions, no co-author trailers, no generated boilerplate.
