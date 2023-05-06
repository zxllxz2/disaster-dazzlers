SELECT
    CASE
        WHEN avg_precipitation = 0 THEN 'No Rain'
        WHEN avg_precipitation > 0 AND avg_precipitation < 1 THEN '0 to 1'
        WHEN avg_precipitation >= 1 AND avg_precipitation < 2 THEN '1 to 2'
        WHEN avg_precipitation >= 2 AND avg_precipitation < 3 THEN '2 to 3'
        WHEN avg_precipitation >= 3 AND avg_precipitation < 4 THEN '3 to 4'
        WHEN avg_precipitation >= 4 AND avg_precipitation < 5 THEN '4 to 5'
        WHEN avg_precipitation >= 5 AND avg_precipitation < 6 THEN '5 to 6'
        WHEN avg_precipitation >= 6 AND avg_precipitation < 7 THEN '6 to 7'
        WHEN avg_precipitation >= 7 AND avg_precipitation < 8 THEN '7 to 8'
        WHEN avg_precipitation >= 8 AND avg_precipitation < 9 THEN '8 to 9'
        WHEN avg_precipitation >= 9 THEN '> 9'
        ELSE 'Out of Range'
    END AS snow_group,
    COUNT(*) AS response_time
FROM
    "incidents-database"."weather"
GROUP BY
    CASE
        WHEN avg_precipitation = 0 THEN 'No Rain'
        WHEN avg_precipitation > 0 AND avg_precipitation < 1 THEN '0 to 1'
        WHEN avg_precipitation >= 1 AND avg_precipitation < 2 THEN '1 to 2'
        WHEN avg_precipitation >= 2 AND avg_precipitation < 3 THEN '2 to 3'
        WHEN avg_precipitation >= 3 AND avg_precipitation < 4 THEN '3 to 4'
        WHEN avg_precipitation >= 4 AND avg_precipitation < 5 THEN '4 to 5'
        WHEN avg_precipitation >= 5 AND avg_precipitation < 6 THEN '5 to 6'
        WHEN avg_precipitation >= 6 AND avg_precipitation < 7 THEN '6 to 7'
        WHEN avg_precipitation >= 7 AND avg_precipitation < 8 THEN '7 to 8'
        WHEN avg_precipitation >= 8 AND avg_precipitation < 9 THEN '8 to 9'
        WHEN avg_precipitation >= 9 THEN '> 9'
        ELSE 'Out of Range'
    END
ORDER BY
    MIN(avg_precipitation) ASC