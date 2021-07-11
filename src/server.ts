import express, { Request, Response } from "express";
import "express-async-errors";

import "reflect-metadata";
import { router } from "./routes";

import "./database";

const app = express();
app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response) => {
  // Se for um erro tratado
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    error: "Internal Server Error",
  });
});

app.listen(3005, () => {
  console.log(`Server running on port ${3005}`);
});
