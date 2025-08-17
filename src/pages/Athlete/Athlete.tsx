import { useState, useEffect, useCallback } from "react";
import type { Activities, Athlete } from "../../types/athlete";
import { getAthlete, getAthleteActivities } from "../../apis/athlete";

export default function Athlete() {
  const [athlete, setAthlete] = useState<Athlete | null>();
  const [loadingAthlete, setLoadingAthlete] = useState(false);
  const [isAthleteError, setIsAthleteError] = useState(false);
  const [activities, setActivities] = useState<Activities | null>();
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [isErrorActivities, setIsErrorActivities] = useState(false);

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
      setActivities(activitiesData);
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
        <div>This is the username: {athlete.username}</div>
        <div>This is activity one: {activities.activities[0].name}</div>
      </>
    );
  }
}
