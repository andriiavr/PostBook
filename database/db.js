import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = new DatabaseSync(path.join(__dirname, "app.db"));
db.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;");

const schema = fs
  .readFileSync(path.join(__dirname, "schema.sql"), "utf8")
  .replace(/CREATE TABLE /g, "CREATE TABLE IF NOT EXISTS ")
  .replace(/CREATE INDEX /g, "CREATE INDEX IF NOT EXISTS ");
db.exec(schema);

// CREATE TABLE IF NOT EXISTS does not add columns to existing tables.
const verificationColumns = db
  .prepare("PRAGMA table_info(email_verifications)")
  .all();
if (!verificationColumns.some((column) => column.name === "attempts")) {
  db.exec(
    "ALTER TABLE email_verifications ADD COLUMN attempts INTEGER NOT NULL DEFAULT 0",
  );
}

export default db;
