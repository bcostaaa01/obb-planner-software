import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { config } from "../config";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKeyPreview =
  process.env.SUPABASE_KEY?.substring(0, 10) + "...";
console.log("Supabase Config:", {
  url: supabaseUrl,
  keyPreview: supabaseKeyPreview,
});

const supabase = createClient(
  config.supabase.url,
  config.supabase.key
);

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("\n--- Auth Debug Start ---");
    const authHeader = req.headers.authorization;
    console.log("Full Auth header:", authHeader);

    if (!authHeader) {
      console.log("No auth header found");
      return res.status(401).json({ message: "No authorization header" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      console.log("Invalid auth header format");
      return res.status(401).json({
        message: "Invalid authorization format. Must be Bearer token",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token length:", token.length);
    console.log(
      "Token preview:",
      token.substring(0, 10) + "..." + token.substring(token.length - 10)
    );

    if (!token) {
      console.log("No token found after Bearer");
      return res.status(401).json({ message: "No token provided" });
    }

    console.log("Attempting to get user with token...");

    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error("Supabase auth error:", {
        message: error.message,
        status: error.status,
        name: error.name,
      });
      return res.status(401).json({
        message: "Invalid token",
        error: error.message,
        status: error.status,
      });
    }

    if (!data.user) {
      console.log("No user found in response");
      return res.status(401).json({ message: "No user found" });
    }

    console.log("User authenticated successfully:", {
      id: data.user.id,
      email: data.user.email,
      role: data.user.role,
    });

    req.body.user_id = data.user.id;
    console.log("--- Auth Debug End ---\n");
    next();
  } catch (error) {
    console.error("Unexpected authentication error:", error);
    res.status(401).json({
      message: "Authentication failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
