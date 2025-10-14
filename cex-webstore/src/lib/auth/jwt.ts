import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET!;

if (!JWT_SECRET) {
  throw new Error("ACCESS_TOKEN_SECRET environment variable is not set");
}

export function signToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "3h" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
}
