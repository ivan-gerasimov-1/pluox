# Pluox

A personal expense tracking app. Hobby project — used daily, but also a playground for learning new things and experimenting with technologies.

> **Pre-alpha warning:** This is early-stage software. Use at your own risk — things can break, APIs can change, and data loss is possible.

## Installation

Pluox is a PWA — it can be installed directly from the browser to your home screen and used like a native app, including offline.

## Local-first

All data is stored locally in the browser's `localStorage` — no account or server required to use the app. It works offline out of the box.

> **No sync yet:** Cross-device sync is not implemented. Your data lives only in the browser where you entered it. Clearing browser storage will permanently erase everything.

## Architecture

### Backend

Minimal Hono API with a single purpose: proxying and caching currency exchange rates from Open Exchange Rates. Deployable to Cloudflare Workers.

### Core

All business logic, structured around Domain-Driven Design. Each module (expense, category, venue, currency, etc.) follows a three-layer layout:

- **domain** — entities, value objects, repository interfaces
- **application** — use cases
- **infrastructure** — concrete repository implementations (localStorage-backed)

The shared `domain/` layer provides base classes (`Entity`, `ValueObject`) and interfaces (`Repository`, `IdGenerator`, `Temporal`) used across all modules.

### Web

React 19 SPA built with Vite, React Router 7, and TanStack Query. PWA-enabled. Wires together `core` modules via a DI container and exposes routes for expenses, categories, venues, and settings.

### Kit

Shared React UI component library used by `web`. Built with CVA and Radix UI primitives.
