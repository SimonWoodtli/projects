-- DDL for "comments" table:
CREATE TABLE "comments" (
  "id" SERIAL,
  "user_id" INTEGER,
  "post_id" INTEGER,
  "comment" TEXT,
  "parent_comment_id" INTEGER,
  "comment_created_at" TIMESTAMP,
  CONSTRAINT "comments_PK" PRIMARY KEY ("id"),
  CONSTRAINT "comments_users_FK_user_id" FOREIGN KEY ("user_id")
    REFERENCES "users" ("id") ON DELETE SET NULL,
  CONSTRAINT "comments_posts_FK_post_id" FOREIGN KEY ("post_id")
    REFERENCES "posts" ("id") ON DELETE CASCADE,
  CONSTRAINT "comments_comments_FK_parent_comment_id" FOREIGN KEY
    ("parent_comment_id") REFERENCES "comments" ("id") ON DELETE CASCADE,
  CONSTRAINT "no_empty_comments" CHECK (LENGTH(TRIM("comment")) > 0)
);


-- DDL for "users" table:
CREATE TABLE "users" (
  "id" SERIAL,
  "username" VARCHAR(25),
  "logged_in_at" TIMESTAMP,
  CONSTRAINT "users_PK" PRIMARY KEY ("id"),
  CONSTRAINT "unique_usernames" UNIQUE ("username"),
  CONSTRAINT "no_empty_usernames" CHECK (LENGTH(TRIM("username")) > 0)
);


-- DDL for "topics" table:
CREATE TABLE "topics" (
  "id" SERIAL,
  "topic" VARCHAR(30),
  "description" VARCHAR(500),
  "topic_created_at" TIMESTAMP,
  CONSTRAINT "topics_PK" PRIMARY KEY ("id"),
  CONSTRAINT "unique_topics" UNIQUE ("topic"),
  CONSTRAINT "no_empty_topics" CHECK (LENGTH(TRIM("topic")) > 0)
);


-- DDL for "posts" table:
CREATE TABLE "posts" (
  "id" SERIAL,
  "user_id" INTEGER,
  "topic_id" INTEGER,
  "title" VARCHAR(100),
  "url" VARCHAR(2000),
  "post" TEXT,
  "post_created_at" TIMESTAMP,
  CONSTRAINT "posts_PK" PRIMARY KEY ("id"),
  CONSTRAINT "posts_users_FK_user_id" FOREIGN KEY ("user_id")
    REFERENCES "users" ("id") ON DELETE SET NULL,
  CONSTRAINT "posts_topics_FK_topic_id" FOREIGN KEY ("topic_id")
    REFERENCES "topics" ("id") ON DELETE CASCADE,
  CONSTRAINT "no_empty_titles" CHECK (LENGTH(TRIM("title")) > 0),
  CONSTRAINT "allow_only_url_or_post" CHECK
    ((("url" = NULL OR "url" = '') AND ("post" != NULL OR "post" != ''))
    OR (("url" != NULL OR "url" != '') AND ("post" = NULL OR "post" = '')))
);


-- DDL for "votes" table:
CREATE TABLE "votes" (
  "id" SERIAL,
  "user_id" INTEGER,
  "post_id" INTEGER,
  "vote" SMALLINT,
  CONSTRAINT "votes_PK" PRIMARY KEY ("id"),
  CONSTRAINT "votes_users_FK_user_id" FOREIGN KEY ("user_id")
    REFERENCES "users" ("id") ON DELETE SET NULL,
  CONSTRAINT "votes_posts_FK_post_id" FOREIGN KEY ("post_id")
    REFERENCES "posts" ("id") ON DELETE CASCADE,
  CONSTRAINT "one_vote_per_user" UNIQUE ("user_id", "vote"),
    --(user_id,post_id) works too?
  CONSTRAINT "vote_values_binary" CHECK ("vote" = -1 OR "vote" = 1)
);
