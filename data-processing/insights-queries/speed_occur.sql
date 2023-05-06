SELECT
    CASE
        WHEN speed >= 0 AND speed < 10 THEN '0 to 10'
        WHEN speed >= 10 AND speed < 20 THEN '10 to 20'
        WHEN speed >= 20 AND speed < 30 THEN '20 to 30'
        WHEN speed >= 30 AND speed < 40 THEN '30 to 40'
        WHEN speed >= 40 AND speed < 50 THEN '40 to 50'
        WHEN speed >= 50 AND speed < 60 THEN '50 to 60'
        WHEN speed >= 60 AND speed < 70 THEN '60 to 70'
        WHEN speed >= 70 THEN '> 70'
        ELSE 'No Data'
    END AS speed_group,
    COUNT(*) AS num_entries
FROM
    "incidents-database"."traffic"
GROUP BY
    CASE
        WHEN speed >= 0 AND speed < 10 THEN '0 to 10'
        WHEN speed >= 10 AND speed < 20 THEN '10 to 20'
        WHEN speed >= 20 AND speed < 30 THEN '20 to 30'
        WHEN speed >= 30 AND speed < 40 THEN '30 to 40'
        WHEN speed >= 40 AND speed < 50 THEN '40 to 50'
        WHEN speed >= 50 AND speed < 60 THEN '50 to 60'
        WHEN speed >= 60 AND speed < 70 THEN '60 to 70'
        WHEN speed >= 70 THEN '> 70'
        ELSE 'No Data'
    END
ORDER BY
    MIN(speed) ASC