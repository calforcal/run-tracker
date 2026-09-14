import Cookies from "js-cookie";

// A 401 from the backend means the access token is missing, expired, or
// otherwise invalid - there's no way to recover it client-side (the app
// never checks the JWT's exp before sending it), so the only way out is to
// drop it and send the user back through login.
export function handleUnauthorized(): void {
  Cookies.remove("accessToken");
  window.location.assign("/");
}
