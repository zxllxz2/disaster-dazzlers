SELECT
    CASE
        WHEN avg_wind_speed >= 0 AND avg_wind_speed < 2 THEN '0 to 2'
        WHEN avg_wind_speed >= 2 AND avg_wind_speed < 4 THEN '2 to 4'
        WHEN avg_wind_speed >= 4 AND avg_wind_speed < 6 THEN '4 to 6'
        WHEN avg_wind_speed >= 6 AND avg_wind_speed < 8 THEN '6 to 8'
        WHEN avg_wind_speed >= 8 AND avg_wind_speed < 10 THEN '8 to 10'
        WHEN avg_wind_speed >= 10 AND avg_wind_speed < 12 THEN '10 to 12'
        WHEN avg_wind_speed >= 12 AND avg_wind_speed < 14 THEN '12 to 14'
        ELSE 'Out of Range'
    END AS wind_group,
    AVG(response_time_sec) AS num_entries
FROM
    "incidents-database"."incidents_weather_traffic_join"
GROUP BY
    CASE
        WHEN avg_wind_speed >= 0 AND avg_wind_speed < 2 THEN '0 to 2'
        WHEN avg_wind_speed >= 2 AND avg_wind_speed < 4 THEN '2 to 4'
        WHEN avg_wind_speed >= 4 AND avg_wind_speed < 6 THEN '4 to 6'
        WHEN avg_wind_speed >= 6 AND avg_wind_speed < 8 THEN '6 to 8'
        WHEN avg_wind_speed >= 8 AND avg_wind_speed < 10 THEN '8 to 10'
        WHEN avg_wind_speed >= 10 AND avg_wind_speed < 12 THEN '10 to 12'
        WHEN avg_wind_speed >= 12 AND avg_wind_speed < 14 THEN '12 to 14'
        ELSE 'Out of Range'
    END
ORDER BY
    MIN(avg_wind_speed) ASC