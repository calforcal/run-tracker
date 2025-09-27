import Cookies from "js-cookie";
import type { ListeningHistory, ListeningHistorySnake } from "../types/tracks";
import camelcaseKeys from 'camelcase-keys';


const accessToken = Cookies.get("accessToken")
const backendURL = "http://localhost:8000"

export const getListeningHistory = async () => {
  try {
    const response = await fetch(`${backendURL}/api/users/listening-history`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: ListeningHistorySnake = await response.json();

    const songs: ListeningHistory = camelcaseKeys(data, { deep: true })

    return songs
  } catch (error) {
    console.error(error);
  }
}