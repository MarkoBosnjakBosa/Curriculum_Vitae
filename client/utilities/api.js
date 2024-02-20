import { get } from "./authentication";

export const checkAuthentication = async () => {
  const { token } = get();
  const headers = { headers: { authentication: `Bearer ${token}`, "Cache-Control": "private, max-age=0, no-cache, no-store" } };
  const response = await fetch(`${window.location.origin}/checkAuthentication`, headers);
  if (!response.ok) return false;
  return await response.json();
};

export const getData = async (url) => {
  const { token } = get();
  const headers = { headers: { authentication: `Bearer ${token}`, "Cache-Control": "private, max-age=0, no-cache, no-store" } };
  const response = await fetch(url, headers);
  if (!response.ok) return null;
  return await response.json();
};
