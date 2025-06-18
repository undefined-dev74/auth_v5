CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"address" text NOT NULL,
	CONSTRAINT "users_address_unique" UNIQUE("address")
);
