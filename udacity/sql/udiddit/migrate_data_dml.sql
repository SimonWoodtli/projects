-- 1. migrate distinct usernames across all username related columns
INSERT INTO "users" ("username")
  SELECT REGEXP_SPLIT_TO_TABLE("upvotes", ',') AS "usernames" 
    FROM "bad_posts"
  UNION
  SELECT REGEXP_SPLIT_TO_TABLE("downvotes", ',') AS "usernames" 
    FROM "bad_posts"
  UNION
  SELECT "username" AS "usernames" FROM "bad_posts"
  UNION
  SELECT "username" AS "usernames" FROM "bad_comments";


-- 2. migrate distinct topics:
INSERT INTO "topics" ("topic")
  SELECT DISTINCT "topic" FROM "bad_posts";


-- 3. migrate existing data into posts table and get user_id and topic_id
-- from their corresponding table:
INSERT INTO "posts" ("user_id", "topic_id", "title", "url", "post")
  SELECT u.id, t.id, LEFT(bad.title,100), bad.url, bad.text_content
  FROM "users" "u"
  JOIN "bad_posts" "bad" ON
    bad.username = u.username
  JOIN "topics" "t" ON
    bad.topic = t.topic;


-- 4 migrating existing data to votes table and get user_id and post_id
-- from their corresponding table:
INSERT INTO "votes" ("post_id", "user_id", "vote")
  SELECT bad.id, u.id, 1 AS "vote_result"
  FROM (SELECT id, REGEXP_SPLIT_TO_TABLE(upvotes, ',') AS username
  FROM bad_posts) bad
  INNER JOIN users u ON
    u.username = bad.username;

INSERT INTO "votes" ("post_id", "user_id", "vote")
  SELECT bad.id, u.id, -1 AS "vote_result"
  FROM (SELECT id, REGEXP_SPLIT_TO_TABLE(downvotes, ',') AS username
  FROM bad_posts) bad
  INNER JOIN users u ON
    u.username = bad.username;


-- 5.1 migrate data from bad_posts to bad_comments to prepare for
-- migration to new table.
ALTER TABLE "bad_comments"
  ADD COLUMN "title" VARCHAR(100),
  ADD COLUMN "url" VARCHAR(2000),
  ADD COLUMN "post" TEXT;

-- this throws a PK error, why?
--INSERT INTO "bad_comments" ("title", "url", "post")
 -- SELECT LEFT(p.title, 100), p.url, p.text_content
  --FROM "bad_posts" "p";

UPDATE "bad_comments" SET
  "title" = (SELECT LEFT(bad.title, 100) FROM "bad_posts" "bad"
    WHERE bad_comments.post_id = bad.id),
  "url" = (SELECT bad.url FROM "bad_posts" "bad"
    WHERE bad_comments.post_id = bad.id),
  "post" = (SELECT bad.text_content FROM "bad_posts" "bad"
    WHERE bad_comments.post_id = bad.id);


-- 5.2 migrating existing data to comments table and get user_id and
-- post_id from their corresponding table:
INSERT INTO "comments" ("user_id", "post_id", "comment")
  SELECT u.id, p.id, bad.text_content
  FROM "users" "u"
  JOIN "bad_comments" "bad" ON
    bad.username = u.username
  JOIN "posts" "p" ON (
    bad.title = p.title AND
    (bad.url = p.url OR bad.post = p.post)
  );






----------------------------------------------------------------------------------
-- NOT NEEDED (does not work as of yet)
----------------------------------------------------------------------------------
-- 4.1 alter table bad_posts to prepare for migration to new votes table
ALTER TABLE "bad_posts"
  ADD COLUMN "username_votes" VARCHAR(50),
  ADD COLUMN "votes" SMALLINT;

-- update upvote rows into votes
UPDATE "bad_posts" SET "username_votes" = (
  SELECT REGEXP_SPLIT_TO_TABLE(bad.upvotes, ',') AS "username_votes" FROM "bad_posts" "bad");

UPDATE "bad_posts" SET "votes" = 1;

-- update downvotes rows into votes
UPDATE "bad_posts" SET "username_votes" = (
  SELECT REGEXP_SPLIT_TO_TABLE("bad.downvotes", ',') AS "username_votes" FROM "bad_posts" "bad");

UPDATE "bad_posts" SET "votes" = -1 WHERE "votes" != 1;

-- 4.2 migrating existing data to votes table and get user_id and post_id
-- from their corresponding table:
INSERT INTO "votes" ("user_id", "post_id", "vote")
  SELECT u.id, p.id, bad.votes
  FROM "users" "u"
  JOIN "bad_posts" "bad" ON
    bad.username_votes = u.username
  JOIN "posts" "p" ON
    bad.title = p.title AND
    (bad.url = p.url OR bad.post = p.post)
);
