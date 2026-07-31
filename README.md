# H3VAL

Marketing site for H3VAL. Built with
[TanStack Start](https://tanstack.com/start) (React, file-based routing) on
Vite, deployed to Cloudflare Workers.

## Stack

- **Framework**: TanStack Start + TanStack Router
- **Build**: Vite 7
- **Styling**: Tailwind CSS v4
- **Lint/format**: [Biome](https://biomejs.dev/)
- **Types**: TypeScript (strict, `noEmit`)
- **E2E**: Playwright
- **Deploy**: Cloudflare Workers via `wrangler`

## Development

```sh
npm install
npm run dev
```

## Commands

```sh
npm run dev         # vite dev server
npm run build        # production build
npm run lint          # biome check
npm run format        # biome check --write
npm run typecheck    # tsc (no emit)
npm run e2e           # playwright tests
npm run deploy        # build + wrangler deploy
```

See `AGENTS.md` for conventions and guidelines.
