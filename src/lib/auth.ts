import { jwtVerify } from "jose";

// https://www.makeuseof.com/token-authentication-nextjs-using-jwt/#:~:text=Upon%20successful%20verification%2C%20it%20generates,returns%20a%20failure%20status%20response.

export function getJwtSecretKey() {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    return payload;
  } catch (error) {
    return null;
  }
}