# База баїнгу

Portable Ukrainian knowledge base. Static HTML, CSS and JavaScript; no build step, backend, tracking, dependencies, remote fonts or account integration.

## Preview

From this directory run `python3 -m http.server 8765`, then visit http://localhost:8765.

## GitHub Pages

Publish these files at the repository root. In GitHub Settings → Pages select Deploy from a branch, the desired branch and `/ (root)`. Relative asset links also support project Pages under a repository subpath. Publication is managed separately; this checkout is not yet deployed.

## Update

Edit `content.js` for the structured rules, operational guidelines, open questions and test schema. `app.js` renders the UI; the tests list contains one user-confirmed Turkey GEO-exclusion test. Records render automatically using `title`, `sub2` (nullable until verified), `social`, `account` (string preserving zeros), `creative`, `catalog`, `scheduled`, `started` (actual date, nullable), `hypothesis`, `exclusions` (array), `comparison`, `result` and `status`. Naming documentation is separate in `naming`. Same-campaign ad comparison rules are in `comparison`; the collection status and private-history principles are in `history`. Hourly snapshot collection is configured separately and its first baseline is saved privately; this public site contains no raw snapshots and does not collect AIO data. Automated performance verdicts and alert rules remain unconfigured. Never add hypothetical campaigns as real tests. Current version: 0.3.1, October 25, 2026.

The download button exports the complete knowledge data as JSON. Navigation is hash-based for static hosting and browser Back/Forward. Search filters the ProCaps TR rules locally. No data is sent anywhere.

## Public content boundary

Only agreed general rules belong here. Do not publish credentials, customer information, account identifiers, real AIO reports or private financial performance. The public test card contains only the explicitly approved concise launch descriptors; it does not expose credentials or raw AIO reporting. The `noindex,nofollow` meta tag asks search engines not to index the site; it is not authentication or privacy protection. A public GitHub repository and a public Pages site can be viewed by anyone.

## Validation

Run `node --check app.js` and `node --check content.js`. Review mobile and desktop navigation, search/no-results, JSON download, and all six sections before release.
