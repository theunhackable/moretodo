CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`done` integer DEFAULT false NOT NULL,
	`updated_at` integer
);
