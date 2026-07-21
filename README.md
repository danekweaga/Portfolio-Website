# Portfolio Website

Personal portfolio for [nonso.codes](https://nonso.codes/), deployed as static HTML on GitHub Pages.

## Local preview

Open the project folder in VS Code and use Live Server (port 5501), or serve the folder with any static file server from the repo root. Root-relative nav links (`/work.html`, etc.) require serving from the site root — opening HTML files directly in the browser will not populate navigation correctly.

## Updating navigation

Edit the `NAV_LINKS` array at the top of `script.js`. All pages share the same nav bar through that file.

## Structure

- `index.html`, `work.html`, `experience.html`, `about.html` — main pages
- `projects/` — project case studies
- `style.css` — shared styles
- `script.js` — nav, clock, mobile menu, scroll reveals
