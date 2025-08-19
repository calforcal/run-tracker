import { Link } from "react-router-dom";
import { ActivityRow } from "../ActivityRow/ActivityRow";
import type { Activity } from "../../types/athlete";

interface ActivityListProps {
  activities: Activity[];
}

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <>
      {activities?.map((activity, index) => (
        <div key={index}>
          <Link
            to={`/activity/${activity.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ActivityRow activity={activity} />
          </Link>
        </div>
      ))}
    </>
  );
};
