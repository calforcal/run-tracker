import Cookies from "js-cookie";
import type { AthleteResponse, Athlete } from "../types/athlete";

const accessToken = Cookies.get("accessToken")

export const getAthlete = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/athlete", {
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

export const getAthleteActivities = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/athlete/activities", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json()
    console.log("GOT DATA", data)
  } catch (err) {
    console.error(err)
  }
}