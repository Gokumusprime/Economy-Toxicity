import { ApolloServer } from 'apollo-server-micro';
import { typeDefs, resolvers } from './../../lib/graphql-server';
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

// Initialize CORS middleware
const cors = Cors({
  origin: ['https://studio.apollographql.com', 'http://localhost:3000'], // Allowed origins
  methods: ['POST', 'GET', 'HEAD', 'PUT', 'PATCH', 'OPTIONS', 'UPDATE', 'DELETE', 'QUERY'], // Allowed methods
  credentials: true, // Allow cookies
});

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to run middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: NextApiRequest, res: NextApiResponse, next: (err?: unknown) => void) => void
) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run CORS middleware
  await runMiddleware(req, res, cors);

  // Wait for the server to start
  await startServer;

  // Handle GraphQL requests
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}