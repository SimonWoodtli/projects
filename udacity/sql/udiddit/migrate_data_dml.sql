SELECT regexp_split_to_table (upvotes, ',' ) as usernames FROM bad_posts
UNION
SELECT regexp_split_to_table (downvotes,, ',' ) as usernames FROM bad_posts;


select distinct username from bad_posts;
select distinct username from bad_comments;

--and union on them all

