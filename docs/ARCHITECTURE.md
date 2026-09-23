# Architecture

## Runtime flow

```text
Browser -> React client -> /api routes -> controllers -> MySQL
                              |
                              -> uploads/
```

The Express application factory lives in `server/app.js`; `server.js` only
loads environment variables and starts the listener. Existing API URLs remain
unchanged during the reorganization.

## Frontend boundaries

- `src/api/`: HTTP access and authentication headers.
- `src/components/`: reusable visual and interaction components.
- `src/utils/`: pure browser utilities.
- `src/App.jsx`: application state and page composition until each page has
  enough independent behavior to become a standalone page module.

CSS layout values are intentionally kept in their existing files during this
refactor. Structural changes must not alter established size or position
values.

## Backend boundaries

- `routes/`: URL and middleware binding.
- `controllers/`: request validation and response formatting.
- `config/`: infrastructure configuration.
- `middleware/`: cross-cutting request behavior.
- `server/`: application bootstrap and shared error handling.

Feature-specific service and repository modules can be introduced without
changing the public API contract.
