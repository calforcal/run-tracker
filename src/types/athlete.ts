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

export const mockActivities: Activity[] = [
  {
    resourceState: 2,
    athlete: {
      id: 49883450,
      resourceState: 1,
    },
    name: "like i never left",
    distance: 31866.2,
    movingTime: 4168,
    elapsedTime: 4343,
    totalElevationGain: 335,
    type: "Ride",
    sportType: "Ride",
    workoutType: 10,
    id: 15495135682,
    externalId: "fitfiletools.fit",
    uploadId: 16547806145,
    startDate: "2025-08-17T20:46:59Z",
    startDateLocal: "2025-08-17T14:46:59Z",
    timezone: "(GMT-07:00) America/Denver",
    utcOffset: -21600,
    startLatlng: [40.02, -105.27],
    endLatlng: [40.02, -105.27],
    locationCity: null,
    locationState: null,
    locationCountry: "United States",
    achievementCount: 2,
    kudosCount: 2,
    commentCount: 0,
    athleteCount: 1,
    photoCount: 0,
    map: {
      id: "a15495135682",
      summaryPolyline: "{_hsFponaSa@aDGSGIGEY?u@Fw@@i@...",
      resourceState: 2,
    },
    trainer: false,
    commute: false,
    manual: false,
    private: false,
    flagged: false,
    gearId: "b7598641",
    fromAcceptedTag: false,
    averageSpeed: 7.645,
    maxSpeed: 19.74,
    averageCadence: 80.2,
    averageWatts: 195.7,
    weightedAverageWatts: 208,
    kilojoules: 811.3,
    deviceWatts: true,
    hasHeartrate: true,
    averageHeartrate: 141.7,
    maxHeartrate: 176,
    maxWatts: 841,
    prCount: 0,
    totalPhotoCount: 1,
    hasKudoed: false,
    sufferScore: 64,
  },
  {
    resourceState: 2,
    athlete: {
      id: 49883450,
      resourceState: 1,
    },
    name: "Morning Run with Hills",
    distance: 10432.5,
    movingTime: 3120,
    elapsedTime: 3200,
    totalElevationGain: 120,
    type: "Run",
    sportType: "Run",
    workoutType: 1,
    id: 15495135683,
    externalId: "garmin_12345.fit",
    uploadId: 16547806146,
    startDate: "2025-08-15T12:15:10Z",
    startDateLocal: "2025-08-15T06:15:10Z",
    timezone: "(GMT-07:00) America/Denver",
    utcOffset: -21600,
    startLatlng: [39.75, -104.99],
    endLatlng: [39.78, -104.95],
    locationCity: "Denver",
    locationState: "CO",
    locationCountry: "United States",
    achievementCount: 5,
    kudosCount: 8,
    commentCount: 1,
    athleteCount: 1,
    photoCount: 0,
    map: {
      id: "a15495135683",
      summaryPolyline: "y|qeF`bpbSxA`BvCvD...",
      resourceState: 2,
    },
    trainer: false,
    commute: false,
    manual: false,
    private: false,
    flagged: false,
    gearId: "shoes_928374",
    fromAcceptedTag: false,
    averageSpeed: 3.34,
    maxSpeed: 5.9,
    averageCadence: 85,
    averageWatts: 0,
    weightedAverageWatts: 0,
    kilojoules: 0,
    deviceWatts: false,
    hasHeartrate: true,
    averageHeartrate: 152,
    maxHeartrate: 174,
    maxWatts: 0,
    prCount: 2,
    totalPhotoCount: 0,
    hasKudoed: true,
    sufferScore: 45,
  },
  {
    resourceState: 2,
    athlete: {
      id: 49883450,
      resourceState: 1,
    },
    name: "Evening Trainer Ride",
    distance: 25000,
    movingTime: 3600,
    elapsedTime: 3650,
    totalElevationGain: 0,
    type: "Ride",
    sportType: "VirtualRide",
    workoutType: null,
    id: 15495135684,
    externalId: "zwift_998877.fit",
    uploadId: 16547806147,
    startDate: "2025-08-10T00:30:00Z",
    startDateLocal: "2025-08-09T18:30:00Z",
    timezone: "(GMT-07:00) America/Denver",
    utcOffset: -21600,
    startLatlng: null,
    endLatlng: null,
    locationCity: null,
    locationState: null,
    locationCountry: "United States",
    achievementCount: 0,
    kudosCount: 15,
    commentCount: 3,
    athleteCount: 1,
    photoCount: 0,
    map: {
      id: "a15495135684",
      summaryPolyline: null,
      resourceState: 2,
    },
    trainer: true,
    commute: false,
    manual: false,
    private: false,
    flagged: false,
    gearId: "trainer_55991",
    fromAcceptedTag: false,
    averageSpeed: 6.94,
    maxSpeed: 12.1,
    averageCadence: 90,
    averageWatts: 220,
    weightedAverageWatts: 225,
    kilojoules: 792,
    deviceWatts: true,
    hasHeartrate: true,
    averageHeartrate: 160,
    maxHeartrate: 188,
    maxWatts: 720,
    prCount: 0,
    totalPhotoCount: 0,
    hasKudoed: false,
    sufferScore: 72,
  },
];
