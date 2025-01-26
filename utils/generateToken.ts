import { UserRole } from "@models/common.model";
import jwt from "jsonwebtoken";

interface Payload {
  id: string;
  username: string;
  role: UserRole;
}

function generateToken(payload: Payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });
}

export default generateToken;
