import { NextFunction, Request, Response } from "express";

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const admin: boolean = true;

  if (admin) {
    return next();
  }

  res.status(401).json({ error: "Unauthorized action." });
}
