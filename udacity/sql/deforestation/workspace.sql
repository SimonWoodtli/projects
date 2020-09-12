
WITH t1
AS
(
    SELECT forest_area_sqkm AS new_f
    FROM forestation
    WHERE country_name = 'World' AND year = '2016'
), t2
AS
(
    SELECT forest_area_sqkm AS old_f
    FROM forestation
    WHERE country_name = 'World' AND year = '1990'
), t3
AS
(
    SELECT (old_f - new_f) AS forest_decrease
    FROM t2
    JOIN t1
    ON t2.old_f = t1.new_f
)
SELECT country_name, ROUND(CAST(total_area_sqkm AS numeric), 2) AS total_area_sqkm
FROM forestation f
JOIN t3
ON t3.forest_decrease = f.forest_area_sqkm
WHERE total_area_sqkm < forest_decrease
AND year = '2016'
ORDER BY total_area_sqkm DESC
LIMIT 1;

--
SELECT country_name, ROUND(CAST(total_area_sqkm AS numeric), 2) AS total_area_sqkm
FROM forestation
WHERE total_area_sqkm < (
    SELECT forest_area_sqkm AS old_f
    FROM forestation
    WHERE country_name = 'World' AND year = '1990') 
    - (
    SELECT forest_area_sqkm AS new_f
    FROM forestation
    WHERE country_name = 'World' AND year = '2016')
AND year = '2016'
ORDER BY total_area_sqkm DESC
LIMIT 1;





















-- TESTING
WITH t1 AS
(
    SELECT country_code, country_name, region, year y_16,
    (SUM(forest_area_sqkm) / SUM(total_area_sqkm) * 100)
    AS f_percent_16
    FROM forestation
    WHERE year = '2016'
    AND total_area_sqkm IS NOT NULL
    AND forest_area_sqkm IS NOT NULL
    GROUP BY 1, 2, 3, 4
), t2 AS
(
    SELECT country_code, country_name, region, year y_90,
    (SUM(forest_area_sqkm) / SUM(total_area_sqkm) * 100)
    AS f_percent_90
    FROM forestation
    WHERE year = '1990'
    AND total_area_sqkm IS NOT NULL
    AND forest_area_sqkm IS NOT NULL
    GROUP BY 1, 2, 3, 4
)
SELECT t1.country_name, t1.region, Round(Cast(( ( f_percent_90 -
f_percent_16 ) / f_percent_90 ) * 100 AS NUMERIC), 2) AS f_percent_decrease
FROM t1
JOIN t2
ON t1.country_code = t2.country_code AND t1.country_name = t2.country_name
WHERE f_percent_90 != 0
ORDER BY f_percent_decrease DESC
LIMIT 5;




























-- iceland correct 
WITH CTE 
AS
(
    SELECT 
    t1.country_name, t1.forest_percent_1990, t2.forest_percent_2016, 
    ( t2.forest_percent_2016 - t1.forest_percent_1990 ) / 
    t1.forest_percent_1990 * 100 AS forest_percent_increase
    FROM (SELECT 
        country_name, forest_percent
        AS forest_percent_1990 
        FROM forestation 
        WHERE year = 1990 
        AND forest_area_sqkm IS NOT NULL 
        AND total_area_sq_mi IS NOT NULL 
        GROUP BY 1, 2) t1 
        JOIN (SELECT 
            country_name, forest_percent
            AS forest_percent_2016 
            FROM forestation 
            WHERE year = 2016 
            AND forest_area_sqkm IS NOT NULL 
            AND total_area_sq_mi IS NOT NULL 
            GROUP  BY 1, 2) t2 
    ON t1.country_name = t2.country_name
    WHERE  t2.forest_percent_2016 > t1.forest_percent_1990 
    ORDER BY 4 desc
)
SELECT country_name,
ROUND(CAST( forest_percent_increase AS NUMERIC), 2) AS forest_percent_increase
FROM CTE
LIMIT 1;

-- 313% increase iceland STUDY: percentage formula!!!
WITH t2 AS
(
    SELECT country_name, year, country_code c_code, forest_percent
    FROM forestation
    WHERE year = '2016'
), t3 AS
(
    SELECT country_name, year, country_code c_code, forest_percent
    FROM forestation
    WHERE year = '1990'
), t4 AS
(
SELECT t2.country_name, t2.year y_16, t2.forest_percent f_percent_16,
t3.year y_90, t3.forest_percent f_percent_90
FROM t2
JOIN t3
ON t2.c_code = t3.c_code
)
SELECT *, ROUND( CAST( (f_percent_16 / f_percent_90) * 100 AS numeric), 2)
AS f_percent_gained
FROM t4
GROUP BY country_name, y_16, y_90, f_percent_16, f_percent_90
HAVING f_percent_16 > f_percent_90 
ORDER BY f_percent_gained DESC
LIMIT 1;


--testing 2 // 3.7 C
WITH t1 AS
 (
    SELECT country_name, year,
    (forest_area_sqkm/ total_area_sqkm) AS f_percent_16_US
    FROM forestation
    WHERE country_name = 'United States'
    AND year = 2016
 )
SELECT 
    COUNT( CASE
    WHEN f_percent_16 > f_percent_16_US THEN 1
    ELSE NULL
    END) AS country_counter
FROM (
    SELECT country_name, year,
    (forest_area_sqkm/ total_area_sqkm) AS
    f_percent_16
    FROM forestation
    WHERE year = 2016
    AND country_name != 'World'
    AND forest_area_sqkm IS NOT NULL
    AND total_area_sqkm IS NOT NULL 
 ) sub
JOIN t1
ON t1.country_name = sub.country_name



AND (forest_area_sqkm/ total_area_sqkm) > 0.34

--testing // 3.7 C
WITH t1 AS
(
    SELECT country_name, year,
    (forest_area_sqkm/ total_area_sqkm) AS
    f_percent_16
    FROM forestation
    WHERE year = 2016
    AND country_name != 'World'
    AND forest_area_sqkm IS NOT NULL
    AND total_area_sqkm IS NOT NULL
    AND (forest_area_sqkm/ total_area_sqkm) > 0.34
 ), t2 AS
 (
    SELECT country_name, f_percent_16 AS f_percent_16_US
    FROM t1
    WHERE country_name = 'United States'
 )
SELECT 
    COUNT(*) AS country_counter
FROM t1
JOIN t2
ON t1.country_name = t2.country_name




COUNT(*) AS country_counter
-- working hardcoded // 3.7 C
WITH t1 AS
(
    SELECT country_name, year,
    (forest_area_sqkm/ total_area_sqkm) AS
    f_percent_16
    FROM forestation
    WHERE year = 2016
    AND country_name != 'World'
    AND forest_area_sqkm IS NOT NULL
    AND total_area_sqkm IS NOT NULL
    AND (forest_area_sqkm/ total_area_sqkm) > 0.34
 )
SELECT 
    COUNT(*) AS country_counter
FROM t1


AND (forest_area_sqkm/ total_area_sqkm) > 0.339297857030622
94 countries





















-- testing 2 (1.5 Q, hardcoded)
WITH t1
AS
(
    SELECT forest_area_sqkm AS new_f, country_code
    FROM forestation
    WHERE country_name = 'World' AND year = '2016'
), t2
AS
(
    SELECT forest_area_sqkm AS old_f, country_code
    FROM forestation
    WHERE country_name = 'World' AND year = '1990'
)
SELECT *
FROM forestation f1
JOIN forestation f2
ON f1.country_code = f2.country_code
JOIN t1
ON forestation.country_code = t1.country_code
JOIN t2
ON forestation.country_code = t2.country_code
WHERE total_area_sqkm < (old_f - new_f) AND year = '2016'
ORDER BY total_area_sqkm DESC;


-- testing (1.5 Q, hardcoded)
WITH t1
AS
(
    SELECT *
    FROM forestation
    
), t2
AS
(
    SELECT forest_area_sqkm AS new_f, country_code
    FROM forestation
    WHERE country_name = 'World' AND year = '2016'
), t3
AS
(
    SELECT forest_area_sqkm AS old_f, country_code
    FROM forestation
    WHERE country_name = 'World' AND year = '1990'
)
SELECT *
FROM t1
JOIN t2
ON t1.country_code = t2.country_code
JOIN t3
ON t1.country_code = t3.country_code

ORDER BY total_area_sqkm DESC;


WHERE total_area_sqkm < (old_f - new_f) AND year = '2016'
--working (1.5 Q, hardcoded)

SELECT country_name, ROUND(CAST(total_area_sqkm AS numeric), 2) AS total_area_sqkm
FROM forestation
WHERE total_area_sqkm < 1324449 AND year = '2016'
ORDER BY total_area_sqkm DESC
LIMIT 1;








-- view Later Q:
CREATE VIEW forestation
AS
 SELECT f.country_code,
 f.country_name,
 f.year,
 f.forest_area_sqkm,
 land.total_area_sq_mi,
 land.total_area_sq_mi * 2.59 AS total_area_sqkm,
 r.region,
 r.income_group
 FROM forest_area f
 INNER JOIN land_area land
 ON land.country_code = f.country_code
 AND land.year = f.year
 INNER JOIN regions r
 ON r.country_code = land.country_code
 GROUP BY f.country_code,
 f.country_name,
 f.year,
 f.forest_area_sqkm,
 land.total_area_sq_mi,
 r.region,
 r.income_group



-- view early Q:
CREATE VIEW forestation
AS
 SELECT f.country_code,
 f.country_name,
 f.year,
 f.forest_area_sqkm,
 land.total_area_sq_mi,
 land.total_area_sq_mi * 2.59 AS total_area_sqkm,
 r.region,
 r.income_group,
 ( Sum(f.forest_area_sqkm) / Sum(land.total_area_sq_mi * 2.59) ) * 100
 forest_percent
 FROM forest_area f
 INNER JOIN land_area land
 ON land.country_code = f.country_code
 AND land.year = f.year
 INNER JOIN regions r
 ON r.country_code = land.country_code
 GROUP BY f.country_code,
 f.country_name,
 f.year,
 f.forest_area_sqkm,
 land.total_area_sq_mi,
 r.region,
 r.income_group



