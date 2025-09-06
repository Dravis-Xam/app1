import jwt, { SignOptions } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const TOKEN_REFRESH_THRESHOLD = Number(process.env.TOKEN_REFRESH_THRESHOLD) || 300; // in seconds

// Middleware: verifies and refreshes token near expiry
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.authToken; // <-- match cookie name with login route

  if (!token) {
    return res.status(401).json({ message: "Access token not found" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & {
      id: string;
      username: string;
    };
    
    const currentTime = Math.floor(Date.now() / 1000); // in seconds
    const timeToExpire = decoded.exp! - currentTime;

    // Refresh token if it's close to expiring
    if (timeToExpire < TOKEN_REFRESH_THRESHOLD) {
      const newToken = jwt.sign(
        { id: decoded.id, username: decoded.username },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } as SignOptions
      );

      res.cookie("authToken", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 15, // 15 minutes
      });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;
