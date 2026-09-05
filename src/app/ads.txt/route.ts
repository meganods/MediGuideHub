import { NextResponse } from "next/server";

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  const envPubId =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ||
    process.env.ADSENSE_CLIENT_ID ||
    "";
  
  // Format publisher ID (e.g. ca-pub-1234567890 -> pub-1234567890)
  const formattedPubId = envPubId
    ? envPubId.replace(/^ca-/, "")
    : "pub-0000000000000000";

  const adsTxtContent = `# Google AdSense ads.txt for mediguide4u.com
# Official Google Authorized Digital Sellers Record
google.com, ${formattedPubId}, DIRECT, f08c47fec0942fa0
`;

  return new NextResponse(adsTxtContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
