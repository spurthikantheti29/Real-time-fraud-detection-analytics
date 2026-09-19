import { defineConfig } from "drizzle-kit"
import fs from "node:fs"

function loadLocalEnv() {
  const files = [".env.local", ".env"]
  for (const file of files) {
    if (!fs.existsSync(file)) continue
    const content = fs.readFileSync(file, "utf8")
    for (const line of content.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/)
      if (!match || process.env[match[1]]) continue
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "")
    }
  }
}

loadLocalEnv()

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required to run Drizzle migrations.")
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})
