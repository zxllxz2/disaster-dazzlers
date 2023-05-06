SELECT
    CASE
        WHEN avg_temperature >= -15 AND avg_temperature < -10 THEN '-15 to -10'
        WHEN avg_temperature >= -10 AND avg_temperature < -5 THEN '-10 to -5'
        WHEN avg_temperature >= -5 AND avg_temperature < 0 THEN '-5 to 0'
        WHEN avg_temperature >= 0 AND avg_temperature < 5 THEN '0 to 5'
        WHEN avg_temperature >= 5 AND avg_temperature < 10 THEN '5 to 10'
        WHEN avg_temperature >= 10 AND avg_temperature < 15 THEN '10 to 15'
        WHEN avg_temperature >= 15 AND avg_temperature < 20 THEN '15 to 20'
        WHEN avg_temperature >= 20 AND avg_temperature < 25 THEN '20 to 25'
        WHEN avg_temperature >= 25 AND avg_temperature < 30 THEN '25 to 30'
        WHEN avg_temperature >= 30 AND avg_temperature < 35 THEN '30 to 35'
        WHEN avg_temperature >= 35 AND avg_temperature < 40 THEN '35 to 40'
        ELSE 'Out of Range'
    END AS temperature_group,
    COUNT(*) AS num_entries
FROM
    "incidents-database"."weather"
GROUP BY
    CASE
        WHEN avg_temperature >= -15 AND avg_temperature < -10 THEN '-15 to -10'
        WHEN avg_temperature >= -10 AND avg_temperature < -5 THEN '-10 to -5'
        WHEN avg_temperature >= -5 AND avg_temperature < 0 THEN '-5 to 0'
        WHEN avg_temperature >= 0 AND avg_temperature < 5 THEN '0 to 5'
        WHEN avg_temperature >= 5 AND avg_temperature < 10 THEN '5 to 10'
        WHEN avg_temperature >= 10 AND avg_temperature < 15 THEN '10 to 15'
        WHEN avg_temperature >= 15 AND avg_temperature < 20 THEN '15 to 20'
        WHEN avg_temperature >= 20 AND avg_temperature < 25 THEN '20 to 25'
        WHEN avg_temperature >= 25 AND avg_temperature < 30 THEN '25 to 30'
        WHEN avg_temperature >= 30 AND avg_temperature < 35 THEN '30 to 35'
        WHEN avg_temperature >= 35 AND avg_temperature < 40 THEN '35 to 40'
        ELSE 'Out of Range'
    END
ORDER BY
    MIN(avg_temperature) ASC