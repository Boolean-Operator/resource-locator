CREATE TABLE "case_notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" varchar NOT NULL,
	"other" varchar,
	"note" text,
	"client_id" integer NOT NULL,
	"author_id" integer NOT NULL,
	"author_email" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"middle_name" varchar,
	"email" varchar,
	"phone" varchar,
	"case_manager" varchar,
	"status" varchar DEFAULT 'Active',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "community_resources" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"street" varchar,
	"city" varchar,
	"state" varchar,
	"housingPlacement" boolean DEFAULT false,
	"housingFunding" boolean DEFAULT false,
	"jobSearch" boolean DEFAULT false,
	"wfd" boolean DEFAULT false,
	"careerTraining" boolean DEFAULT false,
	"academicLifeSkills" boolean DEFAULT false,
	"rxBenefits" boolean DEFAULT false,
	"bHmHCounsel" boolean DEFAULT false,
	"bHmHReferral" boolean DEFAULT false,
	"soberLivingRecovery" boolean DEFAULT false,
	"caseManagement" boolean DEFAULT false,
	"idCards" boolean DEFAULT false,
	"foodMeals" boolean DEFAULT false,
	"clothes" boolean DEFAULT false,
	"directTransport" boolean DEFAULT false,
	"busTickets" boolean DEFAULT false,
	"email" varchar,
	"note" text,
	"website" varchar,
	"phone" varchar,
	"contactName" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workers" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"middle_name" varchar,
	"role" varchar,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "workers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "case_notes" ADD CONSTRAINT "case_notes_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_notes" ADD CONSTRAINT "case_notes_author_id_workers_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."workers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_notes" ADD CONSTRAINT "case_notes_author_email_workers_email_fk" FOREIGN KEY ("author_email") REFERENCES "public"."workers"("email") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_case_manager_workers_email_fk" FOREIGN KEY ("case_manager") REFERENCES "public"."workers"("email") ON DELETE no action ON UPDATE no action;