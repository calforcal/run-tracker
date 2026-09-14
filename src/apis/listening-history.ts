import Cookies from "js-cookie";
import type { ListeningHistory, ListeningHistorySnake } from "../types/tracks";
import camelcaseKeys from 'camelcase-keys';
import { handleUnauthorized } from "./session";


const backendURL = "http://localhost:8000"

export const getListeningHistory = async () => {
  try {
    const accessToken = Cookies.get("accessToken")
    const response = await fetch(`${backendURL}/api/users/listening-history`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      handleUnauthorized();
      return undefined;
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch listening history: ${response.status}`);
    }

    const data: ListeningHistorySnake = await response.json();

    const songs: ListeningHistory = camelcaseKeys(data, { deep: true })

    return songs
  } catch (error) {
    console.error(error);
  }
}