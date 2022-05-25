create user mte@localhost;
create database mte;

grant all privileges on mte.* to mte@localhost;

use mte;
CREATE TABLE `post` (
	`nid`	int(8)	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`uid`	varchar(12)	NOT NULL,
	`title`	text	NOT NULL,
	`desc`	longtext	NULL,
	`body`	longtext	NOT NULL,
	`createdAt`	timestamp	NOT NULL	DEFAULT current_timestamp,
	`updatedAt`	timestamp	NOT NULL	DEFAULT current_timestamp,
	`type`	int(1)	NOT NULL	DEFAULT 1,
	`views`	bigint	NOT NULL	DEFAULT 0
);

CREATE TABLE `comment` (
	`cid`	varchar(12)	NOT NULL,
	`uid`	varchar(12)	NOT NULL,
	`nid`	int(8)	NOT NULL,
	`content`	text	NOT NULL,
	`pid`	varchar(12)	NULL
);

CREATE TABLE `user` (
	`uid`	varchar(12)	NOT NULL,
	`nickname`	varchar(32)	NOT NULL,
	`permission`	int(1)	NOT NULL	DEFAULT 0,
	`email`	varchar(100)	NULL,
	`profile`	longtext	NULL,
	`createdAt`	timestamp	NOT NULL	DEFAULT current_timestamp
);

ALTER TABLE `post` ADD CONSTRAINT `PK_POST` PRIMARY KEY (
	`nid`
);

ALTER TABLE `comment` ADD CONSTRAINT `PK_COMMENT` PRIMARY KEY (
	`cid`,
	`uid`
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`uid`
);

ALTER TABLE `comment` ADD CONSTRAINT `FK_user_TO_comment_1` FOREIGN KEY (
	`uid`
)
REFERENCES `user` (
	`uid`
);


