import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  // console.log("loool");
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";
  console.log("hitting middleware")
  console.log("checking token", token);


  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/test", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/test"],
};