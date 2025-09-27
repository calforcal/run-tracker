import Cookies from "js-cookie";
import type { CallbackResponse } from "../types/auth";

const backendUrl = "http://localhost:8000"

export const login = async (code: string) => {
  try {
    const body = {
      code: code,
    }
    const response = await fetch(
      `${backendUrl}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const tokenResponse: CallbackResponse = await response.json();
    if (tokenResponse.access_token) {
      Cookies.set("accessToken", tokenResponse.access_token);
    }
    return tokenResponse.access_token;
  } catch (err) {
    console.error(err);
    return ""
  }
}

export const authorizeStravaUser = async (code: string) => {
  try {
    const body = {
      code: code,
    }
    const response = await fetch(
      `${backendUrl}/api/strava/authorize-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const tokenResponse: CallbackResponse = await response.json();
    if (tokenResponse.access_token) {
      Cookies.set("accessToken", tokenResponse.access_token);
    }
    return tokenResponse.access_token;
  } catch (err) {
    console.error(err);
    return ""
  }
};

export const authorizeSpotifyUser = async (code: string) => {
  try {
    const body = {
      code: code,
    }
    const token = Cookies.get("accessToken")
    const response = await fetch(
      `${backendUrl}/api/spotify/authorize-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body),
      }
    );

    const tokenResponse: CallbackResponse = await response.json();
    if (tokenResponse.access_token) {
      console.log("ACCESS TOKEN", tokenResponse.access_token)
      Cookies.set("accessToken", tokenResponse.access_token);
    }
    return true;
  } catch (err) {
    console.error(err);
    return false
  }
};