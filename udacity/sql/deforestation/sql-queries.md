# Appendix

## 6. CODE for project

### general view

If no view is specifically mentioned it means that this view here has been used:

```sql
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
 r.income_group;
```

### 1. global situation:

#### 1.1 1990 forest


query:

```sql
SELECT forest_area_sqkm
FROM forestation
WHERE country_name = 'World' AND year = '1990';
```

#### 1.2 2016 forest


query:

```sql
SELECT forest_area_sqkm
FROM forestation
WHERE country_name = 'World' AND year = '2016';
```

#### 1.3 forest_loss

query:

```sql
WITH t1
AS
(
    SELECT *
    FROM forestation
), t2
AS
(
    SELECT t1.forest_area_sqkm AS new_f, t1.country_code
    FROM t1
    WHERE t1.country_name = 'World' AND t1.year = '2016'
), t3
AS
(
    SELECT t1.forest_area_sqkm AS old_f, t1.country_code
    FROM t1
    WHERE t1.country_name = 'World' AND t1.year = '1990'
)
SELECT (old_f - new_f) AS forest_loss
FROM t2
JOIN t3
ON t2.country_code = t3.country_code;
```

#### 1.4 forest_loss percent

query:

```sql
WITH t1
AS
(
    SELECT *
    FROM forestation
), t2
AS
(
    SELECT t1.forest_area_sqkm AS new_f, t1.country_code
    FROM t1
    WHERE t1.country_name = 'World' AND t1.year = '2016'
), t3
AS
(
    SELECT t1.forest_area_sqkm AS old_f, t1.country_code
    FROM t1
    WHERE t1.country_name = 'World' AND t1.year = '1990'
)
SELECT ((old_f - new_f)/old_f)*100 AS loss
FROM t2
JOIN t3
ON t2.country_code = t3.country_code;
```

#### 1.5 lost forest size country 2016

hardcoded: (works)

```sql
SELECT country_name, ROUND(CAST(total_area_sqkm AS numeric), 2) AS total_area_sqkm
FROM forestation
WHERE total_area_sqkm < 1324449 AND year = '2016'
ORDER BY total_area_sqkm DESC
LIMIT 1;
```

direct: (not working because the filter takes out all countries, how to do?)

```sql
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
FROM forestation
JOIN t1
ON forestation.country_code = t1.country_code
JOIN t2
ON forestation.country_code = t2.country_code
WHERE total_area_sqkm < (old_f - new_f) AND year = '2016'
ORDER BY total_area_sqkm DESC;
```

### 2. Regional Outlook

#### 2.1 forest area percent of world relative to land area in 2016

query:

```sql
SELECT country_name, ROUND(CAST(forest_percent AS numeric), 2) AS forest_percent, year
FROM forestation
WHERE country_name = 'World' AND year = '2016';
```

#### 2.2 highest forest percentage relative to land in 2016

query:

```sql
SELECT region, ROUND(CAST(AVG(forest_percent) AS NUMERIC), 2) forest_percent
FROM forestation
WHERE year = '2016'
AND forest_percent IS NOT NULL
AND region != 'World'
GROUP BY 1
ORDER BY forest_percent DESC
LIMIT 1;
```

#### 2.3 lowest forest percentage relative to land in 2016

query:

```sql
SELECT region, ROUND(CAST(AVG(forest_percent) AS NUMERIC), 2) forest_percent
FROM forestation
WHERE year = '2016'
AND forest_percent IS NOT NULL
AND region != 'World'
GROUP BY 1
ORDER BY forest_percent
LIMIT 1;
```

#### 2.4 forest area percent of world relative to land area in 1990

query:

```sql
SELECT country_name, ROUND(CAST(forest_percent AS numeric), 2) AS forest_percent, year
FROM forestation
WHERE country_name = 'World' AND year = '1990';
```

#### 2.5 highest forest percentage relative to land in 1990

query:

```sql
SELECT region, ROUND(CAST(AVG(forest_percent) AS NUMERIC), 2) forest_percent
FROM forestation
WHERE year = '1990'
AND forest_percent IS NOT NULL
AND region != 'World'
GROUP BY 1
ORDER BY forest_percent DESC
LIMIT 1;
```

#### 2.6 lowest forest percentage relative to land in 1990

query:

```sql
SELECT region, ROUND(CAST(AVG(forest_percent) AS NUMERIC), 2) forest_percent
FROM forestation
WHERE year = '1990'
AND forest_percent IS NOT NULL
AND region != 'World'
GROUP BY 1
ORDER BY forest_percent
LIMIT 1;
```

#### 2.7 forest percentage values by region (Table 2.1: Percent Forest Area by Region, 1990 & 2016)

When I tried to use the general forestation view it didn't work: why?
I think because it is an aggregation on top of another aggregation SUM used twice, and subqueries can only handle that.

query:

```sql
SELECT region, year, SUM(forest_percent)
FROM forestation
WHERE year = '2016' OR year = '1990'
GROUP BY region, year
ORDER BY region, year, forest_percent;
```

So I used an inline subquery:

```sql
SELECT region, year, ROUND(CAST(SUM(forest_percent) AS NUMERIC), 2) AS forest_p
FROM (
  (SELECT region, f.year,
  ( Sum(f.forest_area_sqkm) / Sum(land.total_area_sq_mi * 2.59) ) * 100
  AS forest_percent
  FROM forest_area f
  INNER JOIN land_area land
  ON land.country_code = f.country_code
  AND land.year = f.year
  INNER JOIN regions r
  ON r.country_code = land.country_code
  WHERE f.year = '1990' OR f.year = '2016'
  GROUP BY region, f.year)
) as sub
GROUP BY region, year
ORDER BY region, year, forest_p;
```

#### 2.8 comparing 2016 to 1990 forest percentage relative to land_area

query:

```sql
WITH t2 AS
(
    SELECT region, f.year, f.country_code c_code,
    ( Sum(f.forest_area_sqkm) / Sum(land.total_area_sq_mi * 2.59) ) * 100
    AS forest_percent
    FROM forest_area f
    INNER JOIN land_area land
    ON land.country_code = f.country_code
    AND land.year = f.year
    INNER JOIN regions r
    ON r.country_code = land.country_code
    WHERE f.year = '2016'
    GROUP BY region, f.year, c_code
), t3 AS
(
    SELECT region, f.year, f.country_code c_code,
    ( Sum(f.forest_area_sqkm) / Sum(land.total_area_sq_mi * 2.59) ) * 100
    AS forest_percent
    FROM forest_area f
    INNER JOIN land_area land
    ON land.country_code = f.country_code
    AND land.year = f.year
    INNER JOIN regions r
    ON r.country_code = land.country_code
    WHERE f.year = '1990'
    GROUP BY region, f.year, c_code
)
SELECT t2.region, t2.year y_16, ROUND(CAST(AVG(t2.forest_percent) AS NUMERIC), 2)
       AS f_percent_16,
       t3.year y_90, ROUND(CAST(AVG(t3.forest_percent) AS NUMERIC), 2)
       AS f_percent_90
FROM t2
JOIN t3
ON t2.c_code = t3.c_code
GROUP BY 1, 2, 4
HAVING AVG(t2.forest_percent) < AVG(t3.forest_percent)
```

### 3. COUNTRY-LEVEL DETAIL

#### 3.1 A: largest growth in total_forest_area from 1990 to 2016

query:

```sql
WITH t2 AS
(
    SELECT f.country_name, f.year y_16, f.country_code c_code,
    f.forest_area_sqkm f_area_16
    FROM forest_area f
    INNER JOIN land_area land
    ON land.country_code = f.country_code
    AND land.year = f.year
    INNER JOIN regions r
    ON r.country_code = land.country_code
    WHERE f.year = '2016'
), t3 AS
(
    SELECT f.country_name, f.year y_90, f.country_code c_code,
    f.forest_area_sqkm f_area_90
    FROM forest_area f
    INNER JOIN land_area land
    ON land.country_code = f.country_code
    AND land.year = f.year
    INNER JOIN regions r
    ON r.country_code = land.country_code
    WHERE f.year = '1990'
)
SELECT *, ROUND(CAST((t2.f_area_16 - t3.f_area_90) AS numeric), 2)
AS f_area_growth
FROM t3
JOIN t2
ON t2.c_code = t3.c_code
WHERE t2.f_area_16 IS NOT NULL AND t3.f_area_90 IS NOT NULL
ORDER BY f_area_growth DESC;
```

#### 3.2 A: largest growth in percent from 1990 to 2016

query: Iceland

```sql
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
```

query: French Polynesia

```sql
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
SELECT *, ROUND(CAST((f_percent_16 - f_percent_90) AS numeric), 2)
AS f_percent_gained
FROM t4
GROUP BY country_name, y_16, y_90, f_percent_16, f_percent_90
HAVING f_percent_16 > f_percent_90 AND
f_percent_16 - f_percent_90 = MAX(f_percent_16 - f_percent_90)
ORDER BY f_percent_gained DESC
LIMIT 1;
```

#### 3.3 B: Top 5 Amount Decrease in Forest Area by Country

query:

```sql
WITH t1 AS
(
    SELECT country_code code_16, country_name, region, year y_16,
    ROUND(CAST(forest_area_sqkm AS NUMERIC), 2) AS f_area_16
    FROM forestation
    WHERE year = '2016'
    AND forest_area_sqkm IS NOT NULL
    AND country_name != 'World'
), t2 AS
(
    SELECT country_code code_90, country_name, region,
    ROUND(CAST(forest_area_sqkm AS NUMERIC), 2) AS f_area_90
    FROM forestation
    WHERE year = '1990'
    AND forest_area_sqkm IS NOT NULL
    AND country_name != 'World'
)
SELECT t1.country_name, t1.region, f_area_90 - f_area_16 AS f_area_lost,
f_area_90, f_area_16
FROM t1
JOIN t2
ON code_16 = code_90
ORDER BY f_area_lost DESC;
```


#### 3.4 B: Top 5 Percent Decrease in Forest Area by Country

query:

```sql
WITH t1 AS
(
    SELECT country_code code_16, country_name, region, year y_16,
    ROUND(CAST(forest_percent AS NUMERIC), 2) AS f_percent_16
    FROM forestation
    WHERE year = '2016'
    AND forest_percent IS NOT NULL
), t2 AS
(
    SELECT country_code code_90, country_name, region, year y_90,
    ROUND(CAST(forest_percent AS NUMERIC), 2) AS f_percent_90
    FROM forestation
    WHERE year = '1990'
    AND forest_percent IS NOT NULL
)
SELECT t1.country_name, t1.region, Round(Cast(( ( f_percent_90 -
f_percent_16 ) / f_percent_90 ) * 100 AS NUMERIC), 2) AS f_percent_decrease,
f_percent_16, f_percent_90
FROM t1
JOIN t2
ON code_16 = code_90
WHERE f_percent_90 != 0
ORDER BY f_percent_decrease DESC;
```

#### 3.5 C: If countries were grouped by percent forestation in quartiles, which group had the most countries in it in 2016?

view:

```sql
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
```

query:

```sql
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
 )
SELECT
    Count( CASE
    WHEN t1.f_percent_16 < 0.25 THEN 1
    ELSE NULL
    END) AS quartile_1,
    Count( CASE
    WHEN t1.f_percent_16 > 0.25
    AND t1.f_percent_16 < 0.50 THEN 1
    ELSE NULL
    END) AS quartile_2,
    Count( CASE
    WHEN t1.f_percent_16 > 0.50
    AND t1.f_percent_16 < 0.75 THEN 1
    ELSE NULL
    END) AS quartile_3,
    Count( CASE
    WHEN t1.f_percent_16 > 0.75 THEN 1
    ELSE NULL
    END) AS quartile_4
FROM t1
```

#### 3.6 C: List all of the countries that were in the 4th quartile (percent forest > 75%) in 2016.

view:

```sql
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
```

query:

```sql
SELECT country_name, year, region,
ROUND(CAST((forest_area_sqkm/ total_area_sqkm) * 100 AS NUMERIC), 2) AS
f_percent_16
FROM forestation
WHERE year = 2016
AND country_name != 'World'
AND forest_area_sqkm IS NOT NULL
AND total_area_sqkm IS NOT NULL
AND (forest_area_sqkm/ total_area_sqkm) * 100 > 75
ORDER BY f_percent_16 DESC;
```

#### 3.7 C: How many countries had a percent forestation higher than the United States in 2016?

view:

```sql
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
```

hardcoded query: (works)

```sql
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
```

I tried this with 2 CTEs:

```sql
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
    COUNT( CASE
    WHEN f_percent_16 > f_percent_16_US THEN 1
    ELSE NULL
    END) AS country_counter
FROM t1
JOIN t2
ON t1.country_name = t2.country_name
```

OR this with CTE and inline subquery:

```sql
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
```

But both solutions don't count 0.
