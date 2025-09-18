CREATE TABLE IF NOT EXISTS "users" (
    "id" text NOT NULL DEFAULT '',
    "name" text DEFAULT NULL,
    "email" text DEFAULT NULL,
    "tokens" number DEFAULT 1000,
    "isFree" number DEFAULT 0,
    PRIMARY KEY (id)
);
