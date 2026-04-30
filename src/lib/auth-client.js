import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://qurbanihat-livestock-booking-platform-pha.vercel.app")
});

export const { signIn, signUp, useSession } = authClient;