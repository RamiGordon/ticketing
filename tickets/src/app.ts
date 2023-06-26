import { errorHandler, NotFountError } from "@alakator/common";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import express from "express";
import "express-async-errors";

const app = express();
// we have ingress doing a proxy for us, this to tell express to trust ingress
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.all("*", async () => {
  throw new NotFountError();
});

app.use(errorHandler);

export { app };
