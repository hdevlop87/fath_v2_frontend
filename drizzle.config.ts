import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/db/schema.ts",
  out:'./migration',
  driver: 'pg',
  dbCredentials: {
    connectionString: `${process.env.NEXT_PUBLIC_DATABASE_URL}`,
  }
} satisfies Config;