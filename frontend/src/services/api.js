import axios from "axios";


// In production, set VITE_API_BASE_URL to your deployed Flask URL.
const baseURL = import.meta.env.VITE_API_BASE_URL;
const apiPath = (path) => (baseURL ? path : `/api${path}`);

const client = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

async function getCsrfToken() {
  const { data } = await client.get(apiPath("/csrf"));
  return data.csrf_token;
}

export async function fetchProfile() {
  const { data } = await client.get(apiPath("/profile"));
  return data.user;
}

export async function registerAccount(payload) {
  const csrfToken = await getCsrfToken();
  const { data } = await client.post(apiPath("/signup"), payload, {
    headers: { "X-CSRF-Token": csrfToken },
  });
  return data.user;
}

export async function loginAccount(payload) {
  const csrfToken = await getCsrfToken();
  const { data } = await client.post(apiPath("/login"), payload, {
    headers: { "X-CSRF-Token": csrfToken },
  });
  return data.user;
}

export async function logoutAccount() {
  const csrfToken = await getCsrfToken();
  await client.post(apiPath("/logout"), null, {
    headers: { "X-CSRF-Token": csrfToken },
  });
}

export async function fetchTeams() {
  const { data } = await client.get(apiPath("/teams"));
  return data.teams;
}

export async function fetchPrediction(payload) {
  const { data } = await client.post(apiPath("/predict"), payload);
  return data.prediction;
}

export function isNetworkError(error) {
  return !error.response;
}

export function getErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  if (isNetworkError(error)) {
    return "Can't reach the prediction server. Is the Flask backend running?";
  }
  return error.response?.data?.error || fallback;
}

export default client;
