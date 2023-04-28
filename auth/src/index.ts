import mongoose from "mongoose";
import { app } from "./app";

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
