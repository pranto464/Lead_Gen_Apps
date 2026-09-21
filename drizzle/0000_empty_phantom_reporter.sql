CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`company` text,
	`email` text,
	`created_at` integer NOT NULL
);
