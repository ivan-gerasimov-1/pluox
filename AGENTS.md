# AI development context

The role of this file is to describe common mistakes and confusion points that agents might encounter as they work in this project. If you ever encounter something in the project that surprises you, please alert the developer working with you and indicate that this is the case in the AGENTS.md file to help prevent future agents from having the same issue. If the developer corrected something in the code style (or similar), ensure to write it down here.

## General guardrails

- Avoid editing automatically generated files
- Install dependencies using --save-exact to ensure deterministic builds.
- Name files and directories using camelCase.
- If user intent changes between turns, re-evaluate and switch to the matching skill before taking action

## Commits

- Use Conventional Commits
  - feat: new functionality
  - fix: bug fixes
  - docs: documentation
  - style: formatting
  - refactor: refactoring
  - test: tests
  - chore: maintenance
- Write commit messages in English
  Example commit message

  ```
  chore(\*): cleanup code
  ```

## Development

See main development documentation in [development.md](./docs/development.md)
