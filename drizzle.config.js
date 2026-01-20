import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",

  dbCredentials: {
    url:"postgresql://neondb_owner:npg_BSUZ4dGigYm3@ep-young-sky-ah0oxi1t-pooler.c-3.us-east-1.aws.neon.tech/AI-interview-mocker?sslmode=require&channel_binding=require",
  },
});
