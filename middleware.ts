import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  let login = req.cookies.get("islogin");
  let url = req.url;
  if (login && url.includes("/login")) {
    return NextResponse.redirect("https://mytimestore.vercel.app");
  }
}

// See "Matching Paths" below to learn more
