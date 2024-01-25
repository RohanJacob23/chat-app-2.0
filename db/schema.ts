import { relations } from "drizzle-orm";
import {
  text,
  timestamp,
  pgTable,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import { AdapterAccount } from "next-auth/adapters";
import { v4 as uuidv4 } from "uuid";

export const users = pgTable("user", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text("name"),
  email: text("email").notNull(),
  password: text("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const messages = pgTable("message", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  senderId: text("senderId")
    .notNull()
    .references(() => users.id),
  receiverId: text("receiverId")
    .notNull()
    .references(() => users.id),
  content: text("content"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const friendRequest = pgTable("friendRequest", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  senderId: text("senderId")
    .notNull()
    .references(() => users.id),
  receiverId: text("receiverId")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const friend = pgTable("friend", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  userId1: text("userId1")
    .notNull()
    .references(() => users.id),
  userId2: text("userId2")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow(),
});

// export const userRelations = relations(users, ({ many }) => ({
//   friend: many(friend),
//   friendRequest: many(friendRequest),
//   message: many(messages),
// }));

// export const messageRelations = relations(messages, ({ one }) => ({
//   sender: one(users, { fields: [messages.senderId], references: [users.id] }),
//   receiver: one(users, {
//     fields: [messages.receiverId],
//     references: [users.id],
//   }),
// }));

// export const friendRequestRelations = relations(friendRequest, ({ one }) => ({
//   sender: one(users, {
//     fields: [friendRequest.senderId],
//     references: [users.id],
//   }),
//   receiver: one(users, {
//     fields: [friendRequest.receiverId],
//     references: [users.id],
//   }),
// }));

// export const friendRelations = relations(friend, ({ one }) => ({
//   user1: one(users, { fields: [friend.userId1], references: [users.id] }),
//   user2: one(users, { fields: [friend.userId2], references: [users.id] }),
// }));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
