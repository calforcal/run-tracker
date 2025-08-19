import { useState, useEffect, useCallback } from "react";
import {
  mockActivities,
  type Activity,
  type Athlete,
} from "../../types/athlete";
import { getAthlete, getAthleteActivities } from "../../apis/athlete";

import styles from "./Athlete.module.css";
import { ActivityList } from "../../components/ActivityList/ActivityList";

export default function Athlete() {
  const [athlete, setAthlete] = useState<Athlete | null>();
  const [loadingAthlete, setLoadingAthlete] = useState(false);
  const [isAthleteError, setIsAthleteError] = useState(false);
  const [activities, setActivities] = useState<Activity[] | null>(
    mockActivities
  );
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [isErrorActivities, setIsErrorActivities] = useState(false);

  console.log(mockActivities);

  const handleGetAthlete = useCallback(async () => {
    setLoadingAthlete(true);

    const response = await getAthlete();
    console.log(response);
    if (response) {
      setLoadingAthlete(false);
      setAthlete(response);
      return;
    }

    setLoadingAthlete(false);
    setIsAthleteError(true);
    return;
  }, []);

  const handleGetAthleteActivities = useCallback(async () => {
    setLoadingActivities(true);

    const activitiesData = await getAthleteActivities();
    if (activitiesData) {
      setLoadingActivities(false);
      setActivities(activitiesData.activities);
      return;
    }

    setLoadingActivities(false);
    setIsErrorActivities(true);
  }, []);

  useEffect(() => {
    void handleGetAthlete();
    void handleGetAthleteActivities();
  }, [handleGetAthlete, handleGetAthleteActivities]);

  if (isAthleteError || isErrorActivities) {
    return <div>God damn error</div>;
  }
  if (loadingAthlete || loadingActivities) {
    return <div>loading....</div>;
  }

  if (athlete && activities) {
    return (
      <>
        <h2 className={styles.athleteTitle}>{athlete.username}'s Activities</h2>
        <ActivityList activities={activities} />
      </>
    );
  }
}
