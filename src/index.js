import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import schemaDirectives from "./directives";
import session from "express-session";
import cors from "cors";

const MongoStore = require('connect-mongodb-session')(session)

//to disable the depreciate warning as mongoose documentation suggests
mongoose.set("useFindAndModify", false);

const app = express();
const PORT = process.env.PORT || 8088;
const PATH = "/graphql";

require("dotenv").config();

(async () => {
  try {
    await mongoose.connect(
       `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
         process.env.DB_HOST
       }/${process.env.DB_NAME}?retryWrites=true&w=majority`,
       { useNewUrlParser: true }
     );

    app.disable("x-powered-by");
 
    const store = new MongoStore({
      uri: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
        process.env.DB_HOST}`,
      databaseName: process.env.DB_NAME,
      collection: 'sessions',
  })

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
          sameSite: "none",
          secure: true
        }
      })
    );

    const corsOptions = {
      origin: `${process.env.FRONT_END_URL}`,
      credentials: true
    };
    app.use(cors(corsOptions));
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
      cors: false
    });

    app.listen(PORT, () => {
      console.log(`Sup man, app is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
