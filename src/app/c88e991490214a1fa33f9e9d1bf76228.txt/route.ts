import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("c88e991490214a1fa33f9e9d1bf76228", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
