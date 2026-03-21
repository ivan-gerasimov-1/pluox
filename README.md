# Pluox

A personal expense tracking app. Hobby project — used daily, but also a playground for learning new things and experimenting with technologies.

> **Pre-alpha warning:** This is early-stage software. Use at your own risk — things can break, APIs can change, and data loss is possible.

## Architecture

The `core` app contains all business logic, structured around Domain-Driven Design. Each domain module (expense, category, venue, currency, etc.) follows a three-layer layout:

- **domain** — entities, value objects, repository interfaces
- **application** — use cases
- **infrastructure** — concrete repository implementations (localStorage-backed)

The shared `domain/` layer provides base classes (`Entity`, `ValueObject`) and interfaces (`Repository`, `IdGenerator`, `Temporal`) used across all modules.
