import { ipAddress } from "@vercel/functions";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { ratelimit } from "../upstash";
import { ApiError } from "./errors";

export const parseRequestBody = async (req: Request) => {
  try {
    return await req.json();
  } catch (e) {
    console.error(e);
    throw new ApiError({
      code: "bad_request",
      message:
        "Invalid JSON format in request body. Please ensure the request body is a valid JSON object.",
    });
  }
};

export const ratelimitOrThrow = async (
  req: NextRequest,
  identifier?: string
) => {
  // Rate limit if user is not logged in
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!session?.email) {
    const ip = ipAddress(req);
    const { success } = await ratelimit().limit(
      `${identifier || "ratelimit"}:${ip}`
    );
    if (!success) {
      throw new ApiError({
        code: "rate_limit_exceeded",
        message: "Don't DDoS me pls 🥺",
      });
    }
  }
};

export const getIP = async () => {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const headersList = await headers(); // Await headers first
  const forwardedFor = headersList.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }

  const realIp = headersList.get("x-real-ip");

  if (realIp) {
    return realIp;
  }

  return FALLBACK_IP_ADDRESS;
};
