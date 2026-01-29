# FH-ecommerce server (dev stub)

This small Express server provides simple endpoints used by the admin UI during local development:

- POST `/api/upload` : accepts multipart `file` and saves into `server/uploads/`, returns `{ url }`.
- GET/POST/PUT/DELETE `/api/admin/products|categories|brands` : file-backed CRUD stored under `server/data/*.json`.

Quick start:

```bash
cd electronics-shop-frontend/server
npm install
npm start
```

Server runs on `http://localhost:5176` by default. When running the frontend dev server, either run the server alongside it and configure proxy, or build the frontend and serve from this server.
