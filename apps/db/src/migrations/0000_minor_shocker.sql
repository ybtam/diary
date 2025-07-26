CREATE TABLE "users" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"email" text NOT NULL,
	"first_name" text,
	"id" serial PRIMARY KEY NOT NULL,
	"last_name" text,
	"password" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
