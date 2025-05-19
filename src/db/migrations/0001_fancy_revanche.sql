ALTER TABLE "case_notes" DROP CONSTRAINT "case_notes_author_id_workers_id_fk";
--> statement-breakpoint
ALTER TABLE "case_notes" DROP COLUMN "author_id";