import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getActivityByID, getActivityStream } from "../../../apis/athlete";
import type { ActivityStream, DetailedActivity } from "../../../types/athlete";
import { calculateElapsedTime } from "../../../utils/DateTime";

import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import type { LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./ActivityByID.module.css";

interface TrackPoint {
  offsetSec: number;
  position: LatLngTuple;
}

// Strava's time/latlng streams are index-aligned: streams[i].data[n] for
// "time" (seconds elapsed since the activity started) and streams[i].data[n]
// for "latlng" describe the same GPS fix. Zipping them gives us a way to
// look up "where was the athlete N seconds into the activity."
function buildTrackPoints(streams: ActivityStream[]): TrackPoint[] {
  const timeStream = streams.find((s) => s.type === "time");
  const latlngStream = streams.find((s) => s.type === "latlng");

  if (!timeStream || !latlngStream) {
    return [];
  }

  const times = timeStream.data as number[];
  const positions = latlngStream.data as LatLngTuple[];

  if (times.length === 0 || times.length !== positions.length) {
    return [];
  }

  return times.map((offsetSec, i) => ({ offsetSec, position: positions[i] }));
}

export default function ActivityByID() {
  const { activityID } = useParams();

  const [activity, setActivity] = useState<DetailedActivity | undefined>();
  const [loadingActivity, setLoadingActivity] = useState(false);
  const [activityError, setActivityError] = useState(false);
  const [path, setPath] = useState<LatLngTuple[]>([]);
  const [trackPoints, setTrackPoints] = useState<TrackPoint[]>([]);
  const [hoveredSongIndex, setHoveredSongIndex] = useState<number | null>(
    null
  );

  const handleGetActivityByID = useCallback(async () => {
    if (activityID) {
      setLoadingActivity(true);
      setActivityError(false);
      const detailedActivity = await getActivityByID(activityID);
      if (detailedActivity) {
        setActivity(detailedActivity);
        if (detailedActivity.map.polyline) {
          setPath(polyline.decode(detailedActivity.map.polyline)); // [[lat, lng], [lat, lng]...]
        }
      } else {
        setActivityError(true);
      }
      setLoadingActivity(false);

      // Best-effort: streams may not exist for every activity (e.g. manual
      // or indoor entries). A missing/failed fetch just means song hover
      // highlighting has nothing to show - it shouldn't fail the page.
      const streams = await getActivityStream(activityID);
      if (streams) {
        setTrackPoints(buildTrackPoints(streams));
      }
    }
  }, [activityID]);

  useEffect(() => {
    if (activityID) {
      void handleGetActivityByID();
    }
  }, [handleGetActivityByID, activityID]);

  const highlightSegment = useMemo<LatLngTuple[]>(() => {
    if (hoveredSongIndex === null || !activity || trackPoints.length === 0) {
      return [];
    }

    const item = activity.songs[hoveredSongIndex];
    if (!item) {
      return [];
    }

    const activityStartMs = new Date(activity.startDate).getTime();
    const startOffsetSec =
      (new Date(item.playedAt).getTime() - activityStartMs) / 1000;
    let endOffsetSec = startOffsetSec + item.song.durationMs / 1000;

    // A song's played_at only marks when it started - if the listener
    // skipped to the next track early, this song's real end is whenever
    // that next one started, not its full nominal duration. Without this,
    // a skipped song's window overruns into the next song's, and their
    // highlighted segments overlap on the map.
    const nextItem = activity.songs[hoveredSongIndex + 1];
    if (nextItem) {
      const nextStartOffsetSec =
        (new Date(nextItem.playedAt).getTime() - activityStartMs) / 1000;
      endOffsetSec = Math.min(endOffsetSec, nextStartOffsetSec);
    }

    return trackPoints
      .filter(
        (p) => p.offsetSec >= startOffsetSec && p.offsetSec <= endOffsetSec
      )
      .map((p) => p.position);
  }, [hoveredSongIndex, activity, trackPoints]);

  const backButton = (
    <Button
      component={Link}
      to="/athlete"
      startIcon={<ArrowBackIcon />}
      variant="contained"
      sx={{
        alignSelf: "flex-start",
        backgroundColor: "rgb(204, 51, 153)",
        color: "#000",
        "&:hover": {
          backgroundColor: "rgb(178, 27, 128)",
        },
      }}
    >
      Back to Activities
    </Button>
  );

  if (activityError) {
    return (
      <div className={styles.container}>
        <div className={`${styles.contentRow} ${styles.centered}`}>
          <div className={styles.detailsColumn}>
            {backButton}
            <div className={styles.detailsCard}>God damn error</div>
          </div>
        </div>
      </div>
    );
  }

  if (loadingActivity) {
    return (
      <div className={styles.container}>
        <div className={`${styles.contentRow} ${styles.centered}`}>
          <div className={styles.detailsColumn}>
            {backButton}
            <div className={styles.detailsCard}>loading....</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentRow}>
        <div className={styles.detailsColumn}>
          {backButton}

          {activity && (
            <div className={styles.detailsCard}>
              <div>
                <h2 className={styles.activityTitle}>{activity.name}</h2>
                <p className={styles.sportType}>{activity.sportType}</p>
              </div>

              <div className={styles.statGrid}>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>Distance</span>
                  <span className={styles.statValue}>
                    {(activity.distance / 1000).toFixed(2)} KM
                  </span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>Moving Time</span>
                  <span className={styles.statValue}>
                    {calculateElapsedTime(activity.movingTime)}
                  </span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>Elapsed Time</span>
                  <span className={styles.statValue}>
                    {calculateElapsedTime(activity.elapsedTime)}
                  </span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>Elevation Gain</span>
                  <span className={styles.statValue}>
                    {Math.round(activity.totalElevationGain)} M
                  </span>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>Avg Speed</span>
                  <span className={styles.statValue}>
                    {(activity.averageSpeed * 3.6).toFixed(1)} KM/H
                  </span>
                </div>
                {activity.calories > 0 && (
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>Calories</span>
                    <span className={styles.statValue}>
                      {Math.round(activity.calories)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activity && (
            <div className={styles.songsCard}>
              <h3 className={styles.songsTitle}>Listening History</h3>
              {activity.songs.length > 0 ? (
                <div className={styles.songsList}>
                  {activity.songs.map((item, index) => (
                    <div
                      className={styles.songRow}
                      key={item.song.spotifyId + item.playedAt}
                      onMouseEnter={() => setHoveredSongIndex(index)}
                      onMouseLeave={() =>
                        setHoveredSongIndex((current) =>
                          current === index ? null : current
                        )
                      }
                    >
                      <img
                        src={item.song.imageUrl}
                        alt="album cover"
                        className={styles.albumImage}
                      />
                      <div className={styles.songTextContainer}>
                        <span className={styles.songTitle}>
                          {item.song.title}
                        </span>
                        <span className={styles.songArtist}>
                          {item.song.artist}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.songsEmpty}>
                  No listening activity for this activity
                </p>
              )}
            </div>
          )}
        </div>

        <div className={styles.mapWrapper}>
          {path.length > 0 ? (
            <MapContainer bounds={path} boundsOptions={{ padding: [32, 32] }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polyline positions={path} color="#cc3399" />
              {highlightSegment.length > 1 && (
                <Polyline
                  positions={highlightSegment}
                  color="#ffd700"
                  weight={6}
                />
              )}
            </MapContainer>
          ) : (
            <div className={styles.mapPlaceholder}>No route data</div>
          )}
        </div>
      </div>
    </div>
  );
}
