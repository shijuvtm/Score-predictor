"""
weather.py
----------
Small wrapper around the OpenWeatherMap "current weather" endpoint.
Raises WeatherError on any failure so app.py can turn it into a clean
JSON error response.
"""

import os
import requests

OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"


class WeatherError(Exception):
    pass


def get_weather(city: str) -> dict:
    api_key = os.environ.get("OPENWEATHER_API_KEY")
    if not api_key:
        raise WeatherError(
            "Weather service is not configured. Set OPENWEATHER_API_KEY in backend/.env"
        )

    try:
        response = requests.get(
            OPENWEATHER_URL,
            params={
                "q": f"{city},IN",
                "appid": api_key,
                "units": "metric",
            },
            timeout=6,
        )
    except requests.exceptions.RequestException as exc:
        raise WeatherError(f"Could not reach weather service: {exc}") from exc

    if response.status_code == 404:
        raise WeatherError(f"City '{city}' was not found")
    if response.status_code == 401:
        raise WeatherError("Weather service rejected the API key")
    if not response.ok:
        raise WeatherError(f"Weather service returned status {response.status_code}")

    data = response.json()
    try:
        return {
            "city": data["name"],
            "temperature": round(data["main"]["temp"], 1),
            "humidity": data["main"]["humidity"],
            "condition": data["weather"][0]["main"],
            "description": data["weather"][0]["description"],
            "wind_speed": data["wind"]["speed"],
            "pressure": data["main"]["pressure"],
        }
    except (KeyError, IndexError) as exc:
        raise WeatherError("Unexpected response shape from weather service") from exc
