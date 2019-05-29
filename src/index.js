import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import schemaDirectives from "./directives";
import session from "express-session";
import connectRedis from "connect-redis";

//to disable the depreciate warning as mongoose documentation suggests
mongoose.set("useFindAndModify", false);

const app = express();
const PORT = process.env.PORT || 8088;
const PATH = "/graphql";

require("dotenv").config();


(async () => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
        process.env.DB_HOST
      }:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      { useNewUrlParser: true }
    );

    app.disable("x-powered-by");
    const RedisStore = connectRedis(session);
    const store = new RedisStore({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      pass: process.env.REDIS_PASSWORD
    });

    app.use(
      session({
        store,
        name: process.env.SESS_NAME,
        secret: process.env.SESS_SECRET,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
          masAge: parseInt(process.env.SESS_LIFETIME),
          sameSite: false,
          secure: false
        }
      })
    );

    const corsOptions = {
      origin: `${process.env.FRONT_END_URL}`,
      credentials: true
    };

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
      introspection: true
    });

    server.applyMiddleware({
      app,
      cors: corsOptions
    });

    app.listen(PORT, () => {
      console.log(`Sup man, app is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
