import jwt from "jsonwebtoken";

interface Payload {
  id: string;
  username: string;
}

function generateToken(payload: Payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });
}

export default generateToken;
