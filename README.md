# Newport Portfolio

This repository contains a modern developer portfolio for Subham Bisoi, built as a polished single-page website using HTML, CSS, and JavaScript.

## Project Structure

- `index.html` - main landing page and portfolio markup
- `style.css` - page styles, responsive layout, and theme effects
- `script.js` - interactive behaviors, typing animation, dark mode, form validation, and project rendering
- `projects.json` - JSON dataset for dynamic project cards
- `assets/icons/` - SVG icons used for projects and skill highlights
- `resume.pdf` - downloadable resume
- `profile.jpg` - hero profile photo

## What was improved

- Dynamic project rendering from `projects.json`
- Hero typing effect with AI / Cybersecurity / Networking roles
- Modern dark/light mode toggle
- Interactive skills showcase with categories
- Contact form with inline validation
- Clean responsive layout and UI polish

## How to run

Open `index.html` in your browser. For best compatibility with JSON fetch, use a local server if needed:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Git setup

Initialize the project repository and create the first commit:

```bash
git init
git add .
git commit -m "Initial portfolio project setup"
```

If you want to connect the project to GitHub later:

```bash
git remote add origin https://github.com/<username>/<repository>.git
git branch -M main
git push -u origin main
```

## Deployment

This portfolio is ideal for GitHub Pages or any static hosting service.

- GitHub Pages: push the repository and enable Pages for the `main` branch.
- Netlify / Vercel: connect the repo and deploy as a static site.

## Notes

This portfolio is intentionally built without a framework so it remains lightweight and easy to host. The architecture follows a modern content-driven approach with reusable data files and clear separation between design, structure, and behavior.
