# Project Agents.md Guide for OpenAI Codex

This **Agents.md** file provides comprehensive guidance for OpenAI Codex and other AI agents working with this codebase.

---

## Project Structure for Navigation

- `/src` – Source code that Codex should analyze

  - `/components` – React components
  - `/pages` – Next.js pages (Codex can generate route handlers / server actions here)
  - `/styles` – Tailwind & any scoped CSS
  - `/utils` – Utility functions

- `/public` – Static assets (do **not** modify directly)
- `/tests` – Test files Codex must maintain and extend
- `type.tsx` – **Central file that exports shared TypeScript types derived from `zod` schemas**

---

## Coding Conventions

### General

- All new code must be **TypeScript**.
- Follow existing code style in each file.
- Use meaningful variable & function names.
- Add comments for complex logic.

### React Components

- Functional components with hooks.
- Prefer **server components**; add `"use client"` only when interactive.
- Keep components small and focused.
- Prop types must be explicit.
- File naming: `PascalCase.tsx`.

### Styling

- Use **Tailwind CSS** (utility‑first).
- Only add custom CSS when truly necessary.

### **Forms**

- **Create a dedicated `useForm` hook for every form** to manage input state, validation, and submission logic in one place.

### **Data Validation & Types**

- **Define every new data structure with a `zod` schema** for runtime validation.
- **Derive and export the associated TypeScript types** from these schemas.
- **Place all shared types in `type.tsx`; create the file if it does not yet exist.**

### **Data Fetching & Client‑Side State**

- Fetch & cache remote data with **`react-query` (TanStack Query)**.
- Manage client‑side or cross‑page state with **Redux Toolkit**. Avoid duplicating server‑derived data in Redux unless it must be locally mutated.

---

## Testing Requirements

Run tests with:

```bash
# All tests
npm test

# Specific file
npm test -- path/to/test-file.test.ts

# Coverage
npm test -- --coverage
```

---

## Pull Request Guidelines

1. Provide a clear description of the changes.
2. Reference related issues.
3. Ensure **all tests pass**.
4. Include screenshots for UI changes.
5. Keep each PR focused on a single concern.

---

## Programmatic Checks

Before submitting, make sure:

```bash
npm run lint        # Lint check
npm run type-check  # TypeScript types
npm run build       # Build check
```

All three must pass before merging.

### 🚀 Server Actions First

- **Use Server Actions for all backend logic and data mutations; avoid traditional API Routes whenever possible.**
