import { Request, NextFunction } from "express";

function extractAuthToken(req: Request, _, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  (req as any).token = token;
  next();
}

export default extractAuthToken;
