import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import cors from "cors";
import { Mutation, Query } from "./graphql/resolvers";
import fs from "fs";
import path from "path";

const startServer = async () => {
  // Load schema from schema.graphql
  const typeDefs = fs.readFileSync(
    path.join(__dirname, "/graphql/schema.graphql"),
    "utf-8"
  );

  // Initialize Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
    },
  });

  await server.start();

  const app = express();

  // Middleware for Apollo Server
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server)
  );

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });
};

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
