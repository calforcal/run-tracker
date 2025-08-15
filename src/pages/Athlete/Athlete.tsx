import { useState, useEffect, useCallback } from "react";
import type { Athlete } from "../../types/athlete";
import { getAthlete, getAthleteActivities } from "../../apis/athlete";

export default function Athlete() {
  const [athlete, setAthlete] = useState<Athlete | null>();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleGetAthlete = useCallback(async () => {
    setLoading(true);

    const response = await getAthlete();
    console.log(response);
    if (response) {
      setLoading(false);
      setAthlete(response);
      return;
    }

    setLoading(false);
    setIsError(true);
    return;
  }, []);

  useEffect(() => {
    void handleGetAthlete();
    void getAthleteActivities();
  }, [handleGetAthlete]);

  if (isError) {
    return <div>God damn error</div>;
  }
  if (loading) {
    return <div>loading....</div>;
  }
  if (athlete) {
    return (
      <>
        <div>This is the username: {athlete.username}</div>
      </>
    );
  }
}
