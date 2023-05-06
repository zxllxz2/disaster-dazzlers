WITH traffic_with_rounded_time AS (
  SELECT *,
    -- Round down measurement_tstamp to the nearest 5-minute interval
    DATE_TRUNC('minute', measurement_tstamp) - INTERVAL '1' MINUTE * (MINUTE(measurement_tstamp) % 5) AS rounded_tstamp
  FROM traffic
)

SELECT
  iw.*,
  t.speed,
  t.average_speed,
  t.reference_speed,
  t.travel_time_seconds,
  t.confidence_score,
  t.cvalue,
  t.congestion,
  t.extreme_congestion
FROM
  incidents_weather_join AS iw
LEFT JOIN
  traffic_with_rounded_time AS t
ON
  iw.xdsegid = t.xd_id
  AND
  -- Find the nearest 5-minute interval for time_utc
  iw.time_utc BETWEEN t.rounded_tstamp AND t.rounded_tstamp + INTERVAL '5' MINUTE
;
