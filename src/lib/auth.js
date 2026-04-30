import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI || "mongodb://localhost:27017");
const db = client.db("qurbanihat");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BETTER_AUTH_URL || (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://qurbanihat-livestock-booking-pha.vercel.app"),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
    },
  },

  trustedOrigins: ["http://localhost:3000", "https://qurbanihat-livestock-booking-pha.vercel.app"],
});