PRAGMA defer_foreign_keys=TRUE;

CREATE TABLE IF NOT EXISTS [users] (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL UNIQUE COLLATE NOCASE,
	"password" text NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
