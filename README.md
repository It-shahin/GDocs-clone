# Collaborative Document Platform

A real-time document workspace inspired by Google Docs, built with Next.js, TypeScript, Convex, Clerk, Liveblocks, and TipTap.

## Overview

This application gives authenticated users a focused workspace for creating, organizing, and editing rich-text documents. Documents can live in personal or Clerk organization contexts, while Convex provides persisted document metadata and indexed search. Liveblocks and TipTap power shared editing, presence, comments, mentions, notifications, and synchronized page-margin settings.

## Features

- Clerk authentication with personal and organization workspace switching
- Document creation from blank, proposal, letter, resume, and cover-letter templates
- Paginated document lists with indexed title search
- Rename, delete, and open-in-new-tab document actions
- Rich-text editing with headings, font controls, colors, highlights, links, images, tables, lists, task lists, and alignment
- Real-time collaborative editing with participant avatars and connection status
- Anchored comments, mentions, unresolved threads, and inbox notifications
- Shared page-margin controls, print styling, spellcheck, undo, and redo
- Export to JSON, HTML, plain text, or PDF through the browser print flow

## Tech Stack

### Application

- Next.js 15 App Router
- React 19 release candidate
- TypeScript
- Tailwind CSS
- Radix UI primitives with a shadcn/ui configuration

### Data and Authentication

- Convex for document data, mutations, pagination, and indexed search
- Clerk for authentication and organization context

### Collaboration and Editing

- Liveblocks for collaborative rooms, presence, comments, mentions, notifications, and shared storage
- TipTap for the rich-text editor
- Zustand for sharing the active editor instance across controls

## Architecture

The Next.js App Router renders the document dashboard and editor interface. Clerk supplies user and organization identity to the client and Convex, while Convex queries and mutations store and retrieve document records. Each editor is associated with a Liveblocks room keyed by the document ID; a Next.js route handler validates the requesting user against document ownership or organization membership before issuing room access. TipTap renders the editor and connects its collaborative state to Liveblocks.

## Getting Started

### Prerequisites

- Node.js and npm
- A Clerk application
- A Convex project
- A Liveblocks project

### Installation

```bash
git clone https://github.com/It-shahin/GDocs-clone.git
cd GDocs-clone
npm ci --legacy-peer-deps
```

The legacy peer-resolution flag is currently required because the pinned React 19 release candidate falls outside the peer range declared by the installed Liveblocks TipTap package. Remove the flag after those dependencies are aligned.

### Environment Variables

Create `.env.local` in the project root:

```bash
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
LIVEBLOCKS_SECRET_KEY=
```

Use development credentials from your own Clerk, Convex, and Liveblocks projects. Never commit real secret values.

Convex authentication also needs the Clerk issuer configured in `convex/auth.config.ts`. Replace the existing deployment-specific `domain` value with the issuer for your own Clerk application before deploying.

### Initialize Convex

```bash
npx convex dev
```

Keep the Convex development process running while developing locally.

### Running Locally

In a second terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve a completed production build |
| `npm run lint` | Run the configured Next.js lint command |

## Project Structure

| Path | Responsibility |
| --- | --- |
| `convex/` | Document schema, scoped list queries, mutations, and search indexes |
| `src/app/(home)/` | Dashboard, search, templates, and document list |
| `src/app/documents/[documentsId]/` | Editor shell, collaboration room, toolbar, comments, and document controls |
| `src/app/api/liveblocks-auth/` | Server-side Liveblocks room authorization |
| `src/components/` | Shared application components and UI primitives |
| `src/constants/` | Template content and editor margin defaults |
| `src/extensions/` | Custom TipTap extensions |
| `src/store/` | Zustand editor state |

## Key Technical Highlights

- Convex indexes support owner- and organization-scoped pagination plus full-text title search.
- The Liveblocks authorization endpoint checks document ownership and organization membership before granting collaborative room access.
- TipTap and Liveblocks combine rich-text editing with synchronized content, comments, mentions, presence, and shared layout settings.
- Server and client responsibilities are separated between Next.js route handlers, Convex functions, and interactive editor components.

## Author

**Chahin Boudra**

- GitHub: [@It-shahin](https://github.com/It-shahin)
- LinkedIn: [chahin-boudra](https://www.linkedin.com/in/chahin-boudra/)

> This independent portfolio project is inspired by Google Docs and is not affiliated with Google.
