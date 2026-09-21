import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
