export interface AthleteResponse {
  id: number;
  username: string;
  resource_state: number;
  firstname: string;
  lastname: string;
  city: string;
  state: string;
  country: string;
  sex: 'M' | 'F';
  premium: boolean;
  created_at: string;
  updated_at: string;
  badge_type_id: number;
  profile_medium: string;
  profile: string;
  friend: null | boolean;
  follower: null | boolean;
  follower_count: number;
  friend_count: number;
  mutual_friend_count: number;
  athlete_type: number;
  date_preference: string;
  measurement_preference: string;
  clubs: null | unknown[];
  ftp: null | number;
  weight: number;
  bikes: null | unknown[];
  shoes: null | unknown[];
}

export interface Athlete {
  id: number;
  username: string;
  resourceState: number;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  country: string;
  sex: 'M' | 'F';
  premium: boolean;
  createdAt: string;
  updatedAt: string;
  badgeTypeID: number;
  profileMedium: string;
  profile: string;
  friend: null | boolean;
  follower: null | boolean;
  followerCount: number;
  friendCount: number;
  mutualFriendCount: number;
  athleteType: number;
  datePreference: string;
  measurementPreference: string;
  clubs: null | unknown[];
  ftp: null | number;
  weight: number;
  bikes: null | unknown[];
  shoes: null | unknown[];
}

export interface ActivityAthlete {
  id: number;
  resource_state: number;
}

export interface ActivityMap {
  id: string;
  summary_polyline: string | null;
  resource_state: number;
}

export interface ActivityResponse {
  resource_state: number;
  athlete: ActivityAthlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  workout_type: number | null;
  id: number;
  external_id: string;
  upload_id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  start_latlng: number[] | null;
  end_latlng: number[] | null;
  location_city: string | null;
  location_state: string | null;
  location_country: string;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: ActivityMap;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  gear_id: string;
  from_accepted_tag: boolean;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  average_watts: number;
  weighted_average_watts: number;
  kilojoules: number;
  device_watts: boolean;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  max_watts: number;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score: number;
}

export interface ActivitiesResponse {
  activities: ActivityResponse[];
}

export interface Activity {
  resourceState: number;
  athlete: {
    id: number;
    resourceState: number;
  };
  name: string;
  distance: number;
  movingTime: number;
  elapsedTime: number;
  totalElevationGain: number;
  type: string;
  sportType: string;
  workoutType: number | null;
  id: number;
  externalId: string;
  uploadId: number;
  startDate: string;
  startDateLocal: string;
  timezone: string;
  utcOffset: number;
  startLatlng: number[] | null;
  endLatlng: number[] | null;
  locationCity: string | null;
  locationState: string | null;
  locationCountry: string;
  achievementCount: number;
  kudosCount: number;
  commentCount: number;
  athleteCount: number;
  photoCount: number;
  map: {
    id: string;
    summaryPolyline: string | null;
    resourceState: number;
  };
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  gearId: string;
  fromAcceptedTag: boolean;
  averageSpeed: number;
  maxSpeed: number;
  averageCadence: number;
  averageWatts: number;
  weightedAverageWatts: number;
  kilojoules: number;
  deviceWatts: boolean;
  hasHeartrate: boolean;
  averageHeartrate: number;
  maxHeartrate: number;
  maxWatts: number;
  prCount: number;
  totalPhotoCount: number;
  hasKudoed: boolean;
  sufferScore: number;
}

export interface Activities {
  activities: Activity[];
}