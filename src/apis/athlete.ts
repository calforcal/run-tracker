import Cookies from "js-cookie";
import type { AthleteResponse, Athlete, ActivityResponse, Activity, Activities, DetailedActivity, DetailedActivityResponse } from "../types/athlete";

const accessToken = Cookies.get("accessToken")
const backendURL = "http://localhost:8000"

export const getAthlete = async () => {
  try {
    const response = await fetch(`${backendURL}/api/athlete`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: AthleteResponse = await response.json();

    const athlete: Athlete = {
      id: data.id,
      username: data.username,
      resourceState: data.resource_state,
      firstName: data.firstname,
      lastName: data.lastname,
      city: data.city,
      state: data.state,
      country: data.country,
      sex: data.sex,
      premium: data.premium,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      badgeTypeID: data.badge_type_id,
      profileMedium: data.profile_medium,
      profile: data.profile,
      friend: data.friend,
      follower: data.follower,
      followerCount: data.follower_count,
      friendCount: data.friend_count,
      mutualFriendCount: data.mutual_friend_count,
      athleteType: data.athlete_type,
      datePreference: data.date_preference,
      measurementPreference: data.measurement_preference,
      clubs: data.clubs,
      ftp: data.ftp,
      weight: data.weight,
      bikes: data.bikes,
      shoes: data.shoes
    }

    return athlete
  } catch (err) {
    console.error(err);
  }
};

export const getAthleteActivities = async (): Promise<Activities | undefined> => {
  try {
    const response = await fetch(`${backendURL}/api/athlete/activities`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: ActivityResponse[] = await response.json();
    
    const activities: Activity[] = data.map((activity) => ({
      resourceState: activity.resource_state,
      athlete: {
        id: activity.athlete.id,
        resourceState: activity.athlete.resource_state,
      },
      name: activity.name,
      distance: activity.distance,
      movingTime: activity.moving_time,
      elapsedTime: activity.elapsed_time,
      totalElevationGain: activity.total_elevation_gain,
      type: activity.type,
      sportType: activity.sport_type,
      workoutType: activity.workout_type,
      id: activity.id,
      externalId: activity.external_id,
      uploadId: activity.upload_id,
      startDate: activity.start_date,
      startDateLocal: activity.start_date_local,
      timezone: activity.timezone,
      utcOffset: activity.utc_offset,
      startLatlng: activity.start_latlng,
      endLatlng: activity.end_latlng,
      locationCity: activity.location_city,
      locationState: activity.location_state,
      locationCountry: activity.location_country,
      achievementCount: activity.achievement_count,
      kudosCount: activity.kudos_count,
      commentCount: activity.comment_count,
      athleteCount: activity.athlete_count,
      photoCount: activity.photo_count,
      map: {
        id: activity.map.id,
        summaryPolyline: activity.map.summary_polyline,
        resourceState: activity.map.resource_state,
      },
      trainer: activity.trainer,
      commute: activity.commute,
      manual: activity.manual,
      private: activity.private,
      flagged: activity.flagged,
      gearId: activity.gear_id,
      fromAcceptedTag: activity.from_accepted_tag,
      averageSpeed: activity.average_speed,
      maxSpeed: activity.max_speed,
      averageCadence: activity.average_cadence,
      averageWatts: activity.average_watts,
      weightedAverageWatts: activity.weighted_average_watts,
      kilojoules: activity.kilojoules,
      deviceWatts: activity.device_watts,
      hasHeartrate: activity.has_heartrate,
      averageHeartrate: activity.average_heartrate,
      maxHeartrate: activity.max_heartrate,
      maxWatts: activity.max_watts,
      prCount: activity.pr_count,
      totalPhotoCount: activity.total_photo_count,
      hasKudoed: activity.has_kudoed,
      sufferScore: activity.suffer_score,
    }));

    return { activities };
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const getActivityByID = async (activityID: string): Promise<DetailedActivity | undefined> => {
  try {
    const response = await fetch(`${backendURL}/api/athlete/activities/${activityID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: DetailedActivityResponse = await response.json()

    const activity: DetailedActivity = mapDetailedActivity(data)

    return activity;
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export function mapDetailedActivity(
  response: DetailedActivityResponse
): DetailedActivity {
  return {
    id: response.id,
    externalId: response.external_id,
    uploadId: response.upload_id,
    name: response.name,
    distance: response.distance,
    movingTime: response.moving_time,
    elapsedTime: response.elapsed_time,
    totalElevationGain: response.total_elevation_gain,
    elevHigh: response.elev_high,
    elevLow: response.elev_low,
    type: response.type,
    sportType: response.sport_type,
    startDate: response.start_date,
    startDateLocal: response.start_date_local,
    timezone: response.timezone,
    startLatlng: response.start_latlng,
    endLatlng: response.end_latlng,
    achievementCount: response.achievement_count,
    kudosCount: response.kudos_count,
    commentCount: response.comment_count,
    athleteCount: response.athlete_count,
    photoCount: response.photo_count,
    totalPhotoCount: response.total_photo_count,
    map: {
      id: response.map.id,
      summaryPolyline: response.map.summary_polyline,
      resourceState: response.map.resource_state,
      polyline: response.map.polyline

    },
    trainer: response.trainer,
    commute: response.commute,
    manual: response.manual,
    private: response.private,
    flagged: response.flagged,
    workoutType: response.workout_type,
    uploadIdStr: response.upload_id_str,
    averageSpeed: response.average_speed,
    maxSpeed: response.max_speed,
    hasKudoed: response.has_kudoed,
    hideFromHome: response.hide_from_home,
    gearId: response.gear_id,
    kilojoules: response.kilojoules,
    averageWatts: response.average_watts,
    deviceWatts: response.device_watts,
    maxWatts: response.max_watts,
    weightedAverageWatts: response.weighted_average_watts,
    description: response.description,
    calories: response.calories,
    deviceName: response.device_name,
    embedToken: response.embed_token,
  };
}
