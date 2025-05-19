import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const clients = pgTable("clients", {
  id: serial().primaryKey().notNull(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  middleName: varchar("middle_name"),
  email: varchar(),
  phone: varchar(),
  caseManager: varchar("case_manager").references(() => workers.email),
  status: varchar().default("Active"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const workers = pgTable("workers", {
  id: serial().primaryKey().notNull(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  middleName: varchar("middle_name"),
  role: varchar(),
  email: varchar().notNull().unique(),
  phone: varchar().notNull(),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const caseNotes = pgTable("case_notes", {
  id: serial().primaryKey().notNull(),
  subject: varchar().notNull(),
  other: varchar(),
  note: text(),
  clientId: integer("client_id")
    .notNull()
    .references(() => clients.id),
  authorEmail: varchar("author_email")
    .notNull()
    .references(() => workers.email),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const communityResources = pgTable("community_resources", {
  id: serial().primaryKey().notNull(),
  title: varchar().notNull(),
  street: varchar(),
  city: varchar(),
  state: varchar(),
  housingPlacement: boolean().default(false),
  housingFunding: boolean().default(false),
  jobSearch: boolean().default(false),
  wfd: boolean().default(false),
  careerTraining: boolean().default(false),
  academicLifeSkills: boolean().default(false),
  rxBenefits: boolean().default(false),
  bHmHCounsel: boolean().default(false),
  bHmHReferral: boolean().default(false),
  soberLivingRecovery: boolean().default(false),
  caseManagement: boolean().default(false),
  idCards: boolean().default(false),
  foodMeals: boolean().default(false),
  clothes: boolean().default(false),
  directTransport: boolean().default(false),
  busTickets: boolean().default(false),
  email: varchar(),
  note: text(),
  website: varchar(),
  phone: varchar(),
  contactName: varchar(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

// Create Relations

export const clientsRelations = relations(clients, ({ one, many }) => ({
  worker: one(workers, {
    fields: [clients.caseManager],
    references: [workers.email],
  }),
  caseNotes: many(caseNotes),
}));

export const workersRelations = relations(workers, ({ many }) => ({
  clients: many(clients),
  caseNotes: many(caseNotes),
}));

export const caseNotesRelations = relations(caseNotes, ({ one }) => ({
  client: one(clients, {
    fields: [caseNotes.clientId],
    references: [clients.id],
  }),
  worker: one(workers, {
    fields: [caseNotes.authorEmail],
    references: [workers.email],
  }),
}));
