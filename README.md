# Stargate TypeScript/Next.js/Apollo sample application

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This is a sample application which shows how to query a Cassandra cluster using GraphQL, Next.js and Apollo Client.

## Getting Started

### Setup Stargate and your environment

Start stargate in development mode, using the provided `docker-compose.yml` file:

```bash
docker-compose up
```

Then, follow the instruction in the official Stargate documentation so the approprate Cassandra `library` keyspace and with the `authors` and `books` tables are created:

https://stargate.io/docs/stargate/0.1/quickstart/quick_start-graphql.html

Once you're set, generate a secret token with:

```bash
bin/create-token.sh
```

Once generated, copy/paste the token in a `.env.local` file:

```
NEXT_PUBLIC_X_CASSANDRA_TOKEN=your-secret-token-here
```

This token will then be used by the Apollo Client http-link when querying Stargate GraphQL endpoint for the `library`.

### Run the development server

We use [GraphQL Code Generator](https://graphql-code-generator.com/) and follow the approach detailed here: https://formidable.com/blog/2019/strong-typing/

```bash
npm run dev
# or
yarn dev
```

This will start next.js in dev mode and regenerate TypeScript types on file change.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result, and start adding books to the library stored in Cassandra.

Happy tinkering!
