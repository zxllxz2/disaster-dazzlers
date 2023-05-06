SELECT
    CASE
        WHEN average_speed >= 0 AND average_speed < 10 THEN '0 to 10'
        WHEN average_speed >= 10 AND average_speed < 20 THEN '10 to 20'
        WHEN average_speed >= 20 AND average_speed < 30 THEN '20 to 30'
        WHEN average_speed >= 30 AND average_speed < 40 THEN '30 to 40'
        WHEN average_speed >= 40 AND average_speed < 50 THEN '40 to 50'
        WHEN average_speed >= 50 AND average_speed < 60 THEN '50 to 60'
        WHEN average_speed >= 60 AND average_speed < 70 THEN '60 to 70'
        WHEN average_speed >= 70 THEN '> 70'
        ELSE 'No Data'
    END AS average_speed_group,
    COUNT(*) AS num_entries
FROM
    "incidents-database"."incidents_weather_traffic_join"
GROUP BY
    CASE
        WHEN average_speed >= 0 AND average_speed < 10 THEN '0 to 10'
        WHEN average_speed >= 10 AND average_speed < 20 THEN '10 to 20'
        WHEN average_speed >= 20 AND average_speed < 30 THEN '20 to 30'
        WHEN average_speed >= 30 AND average_speed < 40 THEN '30 to 40'
        WHEN average_speed >= 40 AND average_speed < 50 THEN '40 to 50'
        WHEN average_speed >= 50 AND average_speed < 60 THEN '50 to 60'
        WHEN average_speed >= 60 AND average_speed < 70 THEN '60 to 70'
        WHEN average_speed >= 70 THEN '> 70'
        ELSE 'No Data'
    END
ORDER BY
    MIN(average_speed) ASC