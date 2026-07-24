import axios from "axios";


// In production, set VITE_API_BASE_URL to your deployed Flask URL.
const baseURL = "http://localhost:5000/";

const client = axios.create({
  baseURL,
  timeout: 10000,
});

export async function fetchTeams() {
  const { data } = await client.get("/teams");
  return data.teams;
}

export async function fetchWeather(city) {
  const { data } = await client.get("/weather", { params: { city } });
  return data;
}

export async function fetchPrediction(payload) {
  const { data } = await client.post("/predict", payload);
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
