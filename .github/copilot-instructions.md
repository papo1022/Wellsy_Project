# Copilot Instructions for Wellsy_Project

## Repository overview
- This is a monorepo with two main apps:
  - `wellsy_backend`: Spring Boot backend (Java 21, Maven, JPA, MySQL).
  - `wellsy_frontend`: React + Vite frontend (JavaScript, axios, React Router).
- Root `README.md` is minimal; rely on code structure and module configs for context.

## How to run and validate
- Frontend (`/wellsy_frontend`):
  - Install: `npm install`
  - Dev server: `npm run dev`
  - Lint: `npm run lint`
  - Build: `npm run build`
- Backend (`/wellsy_backend`):
  - Run: `./mvnw spring-boot:run`
  - Test: `./mvnw test`
  - Package: `./mvnw clean package`

## Backend conventions
- Package root: `com.kh.wellsy`.
- Domain-oriented layout is consistent:
  - `.../<domain>/controller`
  - `.../<domain>/model/dao`
  - `.../<domain>/model/service`
  - `.../<domain>/model/vo`
- Controllers typically return `ResponseEntity<?>`.
- Data access uses Spring Data JPA repositories (`*Dao` often extends `JpaRepository`).
- Some domains use soft-delete semantics via `status` (`'Y'`/`'N'`) rather than physical deletes.
- App context path is `/wellsy` and default server port is `8006`.

## Frontend conventions
- Source layout is feature-oriented under `src/` (`notice`, `employee`, `health`, `main`, `common`).
- Most features split into:
  - `api/*Api.js` for axios calls
  - `components/*.jsx` for UI
  - `styles/*.css` for feature styling
- Routing is centralized in `src/App.jsx`.
- API modules currently use hardcoded local backend URLs (e.g., `/wellsy/...`), so backend path/port changes require frontend API updates.

## Security and configuration notes
- Backend uses `spring.profiles.active=local` and expects DB credentials in `application-local.properties`.
- Never commit real credentials, tokens, or secret values.
- Keep CORS and security-related changes aligned with `config/SecurityConfig.java`.

## Database context
- SQL reference files exist at repository root (`sample.sql`, `wellsy.sql`).
- Schema assumptions in entities/repositories should stay compatible with these SQL definitions and `spring.jpa.hibernate.ddl-auto=validate`.

## Change strategy for future agents
- Prefer minimal, localized changes in the relevant domain/feature module.
- When changing an API contract, update both backend endpoint behavior and frontend `api/*Api.js` callers.
- Keep naming and folder patterns consistent with existing modules.
