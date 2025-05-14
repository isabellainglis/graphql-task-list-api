# Task List API

A simple task list api built with:

- Node js
- Typescript
- Apollo Server
- Prisma
- Pothos
- SQLite (embedded database)

## Setup

Clone the repository:

```bash
git clone git@github.com:isabellainglis/graphql-task-list-api.git
```

Install dependencies:

```bash
cd graphql-task-list-api
npm install
```

Create a .env file and add environment variable:

```bash
DATABASE_URL="file:./dev.db"
```

Generate Prisma client and run initial SQL migration:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Start the development server:

```bash
npm run dev
```

Access the server in your browser at http://localhost:4000
