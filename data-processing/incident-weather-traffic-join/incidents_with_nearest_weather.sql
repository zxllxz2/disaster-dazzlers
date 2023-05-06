CREATE TABLE "incidents-database"."incidents_with_nearest_weather" WITH (format = 'parquet') AS WITH weather_aggregated AS (
  SELECT MIN(w.station_id) AS station_id,
    w.timestamp_utc,
    AVG(w.temp) AS avg_temp,
    AVG(w.rh) AS avg_rh,
    AVG(w.wind_spd) AS avg_wind_spd,
    w.gps_coordinate_latitude,
    w.gps_coordinate_longitude
  FROM "incidents-database"."weather" w
  GROUP BY w.gps_coordinate_latitude,
    w.gps_coordinate_longitude,
    w.timestamp_utc
),
nearest_weather AS (
  SELECT i.Incident_ID AS incident_id,
    wa.station_id,
    MIN(
      ST_Distance(
        ST_Point(i.longitude, i.latitude),
        ST_Point(
          wa.gps_coordinate_longitude,
          wa.gps_coordinate_latitude
        )
      )
    ) AS min_distance
  FROM "incidents-database"."incidents" i
    JOIN "incidents-database"."incident_weather_left_join" iw ON i.Incident_ID = iw.Incident_ID
    AND iw.avg_temperature IS NULL
    JOIN weather_aggregated wa ON DATE_TRUNC('hour', i.time_utc) = DATE_TRUNC('hour', wa.timestamp_utc)
  GROUP BY i.Incident_ID,
    wa.station_id
),
nearest_weather_filtered AS (
  SELECT nw.incident_id,
    nw.station_id,
    nw.min_distance
  FROM nearest_weather nw
    JOIN (
      SELECT incident_id,
        MIN(min_distance) AS min_distance
      FROM nearest_weather
      GROUP BY incident_id
    ) min_nw ON nw.incident_id = min_nw.incident_id
    AND nw.min_distance = min_nw.min_distance
),
incidents_with_nearest_weather AS (
  SELECT i.*,
    wa.*
  FROM "incidents-database"."incidents" i
    JOIN nearest_weather_filtered nwf ON i.Incident_ID = nwf.incident_id
    JOIN weather_aggregated wa ON nwf.station_id = wa.station_id
    AND DATE_TRUNC('hour', i.time_utc) = DATE_TRUNC('hour', wa.timestamp_utc)
)
SELECT *
FROM incidents_with_nearest_weather;