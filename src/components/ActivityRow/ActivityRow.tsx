import type { Activity } from "../../types/athlete";
import { calculateElapsedTime } from "../../utils/DateTime";
import styles from "./ActivityRow.module.css";

interface ActivityProps {
  activity: Activity;
}

export const ActivityRow: React.FC<ActivityProps> = ({ activity }) => {
  return (
    <div className={styles.activityContainer}>
      <h3>{activity.name}</h3>
      <div className={styles.detailsRow}>
        <div>{activity.sportType}</div>
        <div>{(activity.distance / 1000).toFixed(2)} KM</div>
        <div>{calculateElapsedTime(activity.movingTime)} Minutes</div>
      </div>
    </div>
  );
};
