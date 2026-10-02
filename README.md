# Belgian Air Force

A responsive public information website presenting the Belgian Air Force's history, command structure, missions, aircraft inventory, bases, international relationships and media. The public site includes an independent-publication notice in its legal information.

## Run locally

Requirements: Node.js 20+ and npm.

```sh
npm install
npm run dev
```

Open the Vite address (usually `http://localhost:5173`). The Express API runs on port 3001, and Vite proxies `/api` requests to it.

```sh
npm test
npm run build
npm start
```

`npm start` serves the production build and read-only API on port 3001. Set `PORT` to use another port.

## Project structure

```text
server/
  data.js          Public force profile, aircraft inventory, bases, command structure and news
  index.js         Express API and production static hosting
  index.test.js    API catalogue and content tests
  start.js         Production-mode entry point
src/
  api.js           Browser JSON API client with explicit errors
  App.jsx          Navigation, media gallery and public information pages
  LocationMap.jsx  Interactive map of ORBAT locations
  main.jsx         React application entry point
  styles.css       Responsive visual system and original vector artwork
index.html         Document title, description and viewport metadata
Media/             Supplied hero, poster, diplomacy and roundel artwork
  optimized/       Compressed copies of large gallery images
vite.config.js     React plugin and local API proxy
package.json       Runtime, development and test scripts
```

The bases page uses Leaflet with an Esri street-map tile layer. Internet access is required to load map tiles; provider attribution is shown on the map. Location coordinates are approximate public map positions.

## Public API

The read-only API serves content from `server/data.js`.

| Endpoint | Description |
| --- | --- |
| `GET /api/news` | Force history, development and international-affairs updates |
| `GET /api/news/:id` | One update |
| `GET /api/aircraft` | Aircraft roster |
| `GET /api/aircraft/:id` | One aircraft profile |
| `GET /api/bases` | Location directory |
| `GET /api/leadership` | Public leadership roster |
| `GET /api/organization` | Force functions |
| `GET /api/organization/structure` | Command staff, wings, squadrons and support units |
| `GET /api/force` | Mission, vision, history, international affairs, technology and recruitment information |
| `GET /api/values` | Public values |
| `GET /api/health` | Service health |

Example:

```sh
curl http://localhost:3001/api/aircraft
```

The contact form is a non-functional preview and does not transmit or store messages. Recruitment enquiries use the published Recruitment Office email address in the force profile.

## Deployment

### Vercel

Import this repository into Vercel and deploy with the included `vercel.json`; it configures Vite's production build and `dist` output. The frontend is served as static assets, while `api/[...path].js` exposes the read-only Express API as a Vercel Node.js Function. Both use the same origin, so the browser's `/api/...` requests work without a separate API URL or CORS configuration. Use Node.js 20 or newer in the Vercel project settings.

The API currently serves in-memory, read-only catalogue data; it does not require environment variables or persistent storage. The bases map also needs internet access to load its third-party map tiles.

### Render or another Node.js host

Build with `npm run build`, configure `npm start` as the start command, and use the host-provided `PORT`. The Express service hosts both the built frontend and `/api` from one origin.

Netlify can publish `dist/` as static assets, but hosting the Express API there requires a Netlify Functions adapter or a separate Node service; that adapter is not included.

## Content updates

Edit public catalogue and editorial entries in `server/data.js`. The frontend retrieves them through the JSON API. Replace placeholder media in `Media/` and preserve descriptive alternative text in `src/App.jsx`. Run `npm test` and `npm run build` after changes.
