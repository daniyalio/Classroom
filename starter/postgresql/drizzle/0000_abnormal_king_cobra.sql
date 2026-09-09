CREATE TABLE "cars" (
	"id" serial PRIMARY KEY NOT NULL,
	"make" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"year" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
