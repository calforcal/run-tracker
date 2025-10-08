import { useState, useEffect, useCallback } from "react";
import { Image } from "@mui/icons-material";
import {
  mockActivities,
  type Activity,
  type Athlete,
} from "../../types/athlete";
import { getAthlete, getAthleteActivities } from "../../apis/athlete";

import styles from "./Athlete.module.css";
import { ActivityList } from "../../components/ActivityList/ActivityList";
import type { ListeningHistoryItem } from "../../types/tracks";
import { getListeningHistory } from "../../apis/listening-history";

export default function Athlete() {
  const [athlete, setAthlete] = useState<Athlete | null>();
  const [loadingAthlete, setLoadingAthlete] = useState(false);
  const [isAthleteError, setIsAthleteError] = useState(false);
  const [activities, setActivities] = useState<Activity[] | null>(
    mockActivities
  );
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [isErrorActivities, setIsErrorActivities] = useState(false);
  const [songs, setSongs] = useState<ListeningHistoryItem[] | undefined>();
  const [loadingSongs, setLoadingSongs] = useState(false);

  // console.log(mockActivities);

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

  const handleGetListeningHistory = useCallback(async () => {
    setLoadingSongs(true);

    const response = await getListeningHistory();

    if (response) {
      setLoadingSongs(false);
      setSongs(response.items.slice(0, 10));
      return;
    }
  }, []);

  const handleGetAthleteActivities = useCallback(async () => {
    setLoadingActivities(true);

    // const activitiesData = await getAthleteActivities();
    // if (activitiesData) {
    setLoadingActivities(false);
    setActivities(mockActivities);
    // return;
    // }

    // setLoadingActivities(false);
    // setIsErrorActivities(true);
  }, []);

  useEffect(() => {
    void handleGetAthlete();
    void handleGetAthleteActivities();
    void handleGetListeningHistory();
  }, [handleGetAthlete, handleGetAthleteActivities, handleGetListeningHistory]);

  if (isAthleteError || isErrorActivities) {
    return <div>God damn error</div>;
  }
  if (loadingAthlete || loadingActivities || loadingSongs) {
    return <div>loading....</div>;
  }

  if (athlete && activities && songs) {
    return (
      <div className={styles.athleteContainer}>
        <h2 className={styles.athleteTitle}>{athlete.username}'s Activities</h2>
        <div className={styles.activitiesSongContainer}>
          <ActivityList activities={activities} />
          <div className={styles.songListContainer}>
            {songs.map((song) => {
              return (
                <div className={styles.songRow}>
                  <img
                    src={song.track.album.images[0].url}
                    alt="album cover"
                    className={styles.albumImage}
                  />
                  <div className={styles.songTextContainer}>
                    <span className={styles.titleText}>{song.track.name}</span>
                    <span className={styles.artistText}>{song.track.artists[0].name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
