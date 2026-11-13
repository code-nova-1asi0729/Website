# Vigilia – Landing Page

Static marketing site for **Vigilia**, a building-safety monitoring platform.

**Live site:** https://code-nova-1asi0729.github.io/Website/
**Web app:** https://vigilia-frontend.vercel.app

## Tech stack

- HTML5, CSS3, vanilla JavaScript
- Google Fonts

## Project structure

```
Website/
├── index.html             # redirects to public/ (GitHub Pages serves the repository root)
├── public/
│   ├── index.html
│   └── assets/
│       ├── style/         # style.css, wireframe.css
│       ├── scripts/       # i18n.js, script.js, landing-extras.js, videos.js
│       └── images/
│           └── team/      # team member photos
└── README.md
```

## Deployment

GitHub Pages publishes automatically from the `main` branch.

## Contributing

- Branching: GitFlow (`feature/*` → `develop` → `release/x.y.z` → `main`)
- Commits: [Conventional Commits](https://www.conventionalcommits.org/), e.g. `fix(landing): improve color contrast`
- Versioning: [SemVer 2.0.0](https://semver.org/)

## Team

CodeNova – UPC, 1ASI0729
