import Cookies from "js-cookie";
import type { CallbackResponse } from "../types/auth";

const backendUrl = "http://localhost:8000"

export const authorizeUser = async (code: string) => {
  try {
    const body = {
      code: code,
    }
    const response = await fetch(
      `${backendUrl}/api/authorize-user`,
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
    return true;
  } catch (err) {
    console.error(err);
    return false
  }
};