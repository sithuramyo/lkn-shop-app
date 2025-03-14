import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;  // ✅ Add accessToken property
    expiresAt?: number;    // ✅ Add expiresAt property
    jti?: string;
  }

  interface User {
    accessToken: string;
    expiresAt: number;
    jti?: string;
  }
}
