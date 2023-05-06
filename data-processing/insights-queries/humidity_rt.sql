SELECT
    CASE
        WHEN avg_humidity >= 0 AND avg_humidity < 10 THEN '0 to 10'
        WHEN avg_humidity >= 10 AND avg_humidity < 20 THEN '10 to 20'
        WHEN avg_humidity >= 20 AND avg_humidity < 30 THEN '20 to 30'
        WHEN avg_humidity >= 30 AND avg_humidity < 40 THEN '30 to 40'
        WHEN avg_humidity >= 40 AND avg_humidity < 50 THEN '40 to 50'
        WHEN avg_humidity >= 50 AND avg_humidity < 60 THEN '50 to 60'
        WHEN avg_humidity >= 60 AND avg_humidity < 70 THEN '60 to 70'
        WHEN avg_humidity >= 70 AND avg_humidity < 80 THEN '70 to 80'
        WHEN avg_humidity >= 80 AND avg_humidity < 90 THEN '80 to 90'
        WHEN avg_humidity >= 90 AND avg_humidity <= 101 THEN '90 to 100'
        ELSE 'Out of Range'
    END AS hum_group,
    AVG(response_time_sec) AS num_entries
FROM
    "incidents-database"."incidents_weather_traffic_join"
GROUP BY
    CASE
        WHEN avg_humidity >= 0 AND avg_humidity < 10 THEN '0 to 10'
        WHEN avg_humidity >= 10 AND avg_humidity < 20 THEN '10 to 20'
        WHEN avg_humidity >= 20 AND avg_humidity < 30 THEN '20 to 30'
        WHEN avg_humidity >= 30 AND avg_humidity < 40 THEN '30 to 40'
        WHEN avg_humidity >= 40 AND avg_humidity < 50 THEN '40 to 50'
        WHEN avg_humidity >= 50 AND avg_humidity < 60 THEN '50 to 60'
        WHEN avg_humidity >= 60 AND avg_humidity < 70 THEN '60 to 70'
        WHEN avg_humidity >= 70 AND avg_humidity < 80 THEN '70 to 80'
        WHEN avg_humidity >= 80 AND avg_humidity < 90 THEN '80 to 90'
        WHEN avg_humidity >= 90 AND avg_humidity <= 101 THEN '90 to 100'
        ELSE 'Out of Range'
    END
ORDER BY
    MIN(avg_humidity) ASC