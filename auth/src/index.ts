import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFountError } from "./errors/not-found-error";

const app = express();
// we have ingress doing a proxy for us, this to tell express to trust ingress
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async () => {
  throw new NotFountError();
});

app.use(errorHandler);

const start = async () => {
  const authPodName = "auth-mongo-srv";
  const authPodPort = "27017";

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect(`mongodb://${authPodName}:${authPodPort}/auth,`);

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

start();
