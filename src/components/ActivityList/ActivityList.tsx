import { Link } from "react-router-dom";
import { ActivityRow } from "../ActivityRow/ActivityRow";
import type { Activity } from "../../types/athlete";
import styles from "./ActivityList.module.css";

interface ActivityListProps {
  activities: Activity[];
}

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <div className={styles.activityListContainer}>
      {activities?.map((activity, index) => (
        <div key={index} className={styles.activityListContainer}>
          <Link
            to={`/activity/${activity.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ActivityRow activity={activity} />
          </Link>
        </div>
      ))}
    </div>
  );
};
