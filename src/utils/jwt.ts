import { sign } from "jsonwebtoken";

interface TokenPayload {
  id: string;
  role: string;
}

const accessTokenExpiration = process.env.JWT_ACCESS_EXPIRATION || "1h"; 
const refreshTokenExpiration = process.env.JWT_REFRESH_EXPIRATION || "7d"; 

export const generateTokens = (payload: TokenPayload) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const accessToken = sign(payload, process.env.JWT_SECRET, {
      expiresIn: accessTokenExpiration,
    });

    const refreshToken = sign(payload, process.env.JWT_SECRET, {
      expiresIn: refreshTokenExpiration,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error instanceof Error ? error.message : error);
    throw new Error("Token generation failed");
  }
};
