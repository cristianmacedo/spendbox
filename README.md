# SpendBox

SpendBox is a Next.js app that lets you pick a billionaire, buy absurdly expensive items, and compare the spending to everyday income.

## Stack

- Next.js 15 with the App Router
- React 19
- Tailwind CSS
- Zustand for client-side state
- Framer Motion for transitions

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run start
```

## Project Structure

- `src/app`: app shell, metadata, and the main page
- `src/components`: UI and feature components
- `src/data`: billionaire and product seed data
- `src/store`: Zustand store and selectors
- `src/lib`: formatting and utility helpers
- `src/assets`: bundled product and billionaire images

## Notes

- Billionaire portraits are bundled locally to avoid Wikimedia thumbnail rate limiting.
- Custom fortune and product inputs support both raw numbers and shorthand such as `500k`, `2.5m`, and `1 billion`.
