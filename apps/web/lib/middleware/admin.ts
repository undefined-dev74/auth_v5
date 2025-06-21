import { parse } from "@/lib/middleware/utils";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export default async function AdminMiddleware(req: NextRequest) {
  const { path } = parse(req);

  // Get the JWT token instead of making database calls
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check if user is authenticated
  if (!token && path !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    // Check admin status from the token (no database call needed)
    if (!token.isAdmin) {
      return NextResponse.next(); // throw 404 page
    } else if (path === "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.rewrite(
    new URL(`/admin.dub.co${path === "/" ? "" : path}`, req.url)
  );
}
