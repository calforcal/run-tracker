import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivityByID } from "../../../apis/athlete";
import type { DetailedActivity } from "../../../types/athlete";

import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";

export default function ActivityByID() {
  const { activityID } = useParams();

  const [activity, setActivity] = useState<DetailedActivity | undefined>();
  const [loadingActivity, setLoadingActivity] = useState(false);
  const [activityError, setActivityError] = useState(false);
  const [path, setPath] = useState<LatLngExpression[]>([]);

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

  if (activityError) {
    return <div>God damn error</div>;
  }
  if (loadingActivity) {
    return <div>loading....</div>;
  }

  return (
    <div>
      <h1>Activity {activityID}</h1>
      {activity && (
        <div>
          <h2>{activity.name}</h2>
          <p>Distance: {activity.distance}m</p>
          <p>Type: {activity.sportType}</p>
        </div>
      )}

      {path.length > 0 && (
        <MapContainer
          center={path[0] as LatLngExpression}
          zoom={14}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline positions={path} color="red" />
        </MapContainer>
      )}
    </div>
  );
}
