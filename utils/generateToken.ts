import jwt from "jsonwebtoken";

function generateToken(payload: object) {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });
}

export default generateToken;
