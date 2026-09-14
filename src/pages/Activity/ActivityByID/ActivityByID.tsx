import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getActivityByID } from "../../../apis/athlete";
import type { DetailedActivity } from "../../../types/athlete";
import { calculateElapsedTime } from "../../../utils/DateTime";

import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import type { LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./ActivityByID.module.css";

export default function ActivityByID() {
  const { activityID } = useParams();

  const [activity, setActivity] = useState<DetailedActivity | undefined>();
  const [loadingActivity, setLoadingActivity] = useState(false);
  const [activityError, setActivityError] = useState(false);
  const [path, setPath] = useState<LatLngTuple[]>([]);

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
    }
  }, [activityID]);

  useEffect(() => {
    if (activityID) {
      void handleGetActivityByID();
    }
  }, [handleGetActivityByID, activityID]);

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
        </div>

        <div className={styles.mapWrapper}>
          {path.length > 0 ? (
            <MapContainer bounds={path} boundsOptions={{ padding: [32, 32] }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polyline positions={path} color="#cc3399" />
            </MapContainer>
          ) : (
            <div className={styles.mapPlaceholder}>No route data</div>
          )}
        </div>
      </div>
    </div>
  );
}
