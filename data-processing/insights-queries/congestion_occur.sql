SELECT
    CASE
        WHEN congestion = 0 THEN '0'
        WHEN congestion > 0 AND congestion < 0.05 THEN '0 to 0.05'
        WHEN congestion >= 0.05 AND congestion < 0.1 THEN '0.05 to 0.1'
        WHEN congestion >= 0.1 AND congestion < 0.15 THEN '0.1 to 0.15'
        WHEN congestion >= 0.15 AND congestion < 0.2 THEN '0.15 to 0.2'
        WHEN congestion >= 0.2 AND congestion < 1 THEN '0.2 to 1'
        ELSE 'No Data'
    END AS congestion_group,
    COUNT(*) AS num_entries
FROM
    "incidents-database"."traffic"
GROUP BY
    CASE
        WHEN congestion = 0 THEN '0'
        WHEN congestion > 0 AND congestion < 0.05 THEN '0 to 0.05'
        WHEN congestion >= 0.05 AND congestion < 0.1 THEN '0.05 to 0.1'
        WHEN congestion >= 0.1 AND congestion < 0.15 THEN '0.1 to 0.15'
        WHEN congestion >= 0.15 AND congestion < 0.2 THEN '0.15 to 0.2'
        WHEN congestion >= 0.2 AND congestion < 1 THEN '0.2 to 1'
        ELSE 'No Data'
    END
ORDER BY
    MIN(congestion) ASC