SELECT
    CASE
        WHEN avg_snow = 0 THEN 'No Snow'
        WHEN avg_snow > 0 AND avg_snow < 1 THEN '0 to 1'
        WHEN avg_snow >= 1 AND avg_snow < 2 THEN '1 to 2'
        WHEN avg_snow >= 2 AND avg_snow < 3 THEN '2 to 3'
        WHEN avg_snow >= 3 AND avg_snow < 4 THEN '3 to 4'
        WHEN avg_snow >= 4 AND avg_snow < 5 THEN '4 to 5'
        WHEN avg_snow >= 5 AND avg_snow < 6 THEN '5 to 6'
        WHEN avg_snow >= 6 AND avg_snow < 7 THEN '6 to 7'
        WHEN avg_snow >= 7 AND avg_snow < 8 THEN '7 to 8'
        WHEN avg_snow >= 8 AND avg_snow < 9 THEN '8 to 9'
        WHEN avg_snow >= 9 THEN '> 9'
        ELSE 'Out of Range'
    END AS snow_group,
    COUNT(*) AS num_entries
FROM
    "incidents-database"."weather"
WHERE response_time_sec >= 0
GROUP BY
    CASE
        WHEN avg_snow = 0 THEN 'No Snow'
        WHEN avg_snow > 0 AND avg_snow < 1 THEN '0 to 1'
        WHEN avg_snow >= 1 AND avg_snow < 2 THEN '1 to 2'
        WHEN avg_snow >= 2 AND avg_snow < 3 THEN '2 to 3'
        WHEN avg_snow >= 3 AND avg_snow < 4 THEN '3 to 4'
        WHEN avg_snow >= 4 AND avg_snow < 5 THEN '4 to 5'
        WHEN avg_snow >= 5 AND avg_snow < 6 THEN '5 to 6'
        WHEN avg_snow >= 6 AND avg_snow < 7 THEN '6 to 7'
        WHEN avg_snow >= 7 AND avg_snow < 8 THEN '7 to 8'
        WHEN avg_snow >= 8 AND avg_snow < 9 THEN '8 to 9'
        WHEN avg_snow >= 9 THEN '> 9'
        ELSE 'Out of Range'
    END
ORDER BY
    MIN(avg_snow) ASC