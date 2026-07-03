"""
weather.py
----------
Wrapper around the OpenWeatherMap Forecast API.
"""

import os
import requests

OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/forecast"


class WeatherError(Exception):
    pass


def get_weather(city: str) -> dict:
    api_key = os.getenv("OPENWEATHER_API_KEY")

    if not api_key:
        raise WeatherError("OPENWEATHER_API_KEY is not configured.")

    try:
        response = requests.get(
            OPENWEATHER_URL,
            params={
                "q": city,          # Use only the city name
                "appid": api_key,
                "units": "metric",
            },
            timeout=10,
        )

        response.raise_for_status()

    except requests.exceptions.HTTPError:
        if response.status_code == 401:
            raise WeatherError("Invalid OpenWeather API key.")
        elif response.status_code == 404:
            raise WeatherError(f"City '{city}' not found.")
        else:
            raise WeatherError(f"Weather API returned {response.status_code}.")

    except requests.exceptions.RequestException as e:
        raise WeatherError(f"Unable to connect to OpenWeather: {e}")

    data = response.json()

    if str(data.get("cod")) != "200":
        raise WeatherError(data.get("message", "Unable to fetch weather."))

    forecast = data["list"][0]

    return {
        "city": data["city"]["name"],
        "temperature": round(forecast["main"]["temp"], 1),
        "humidity": forecast["main"]["humidity"],
        "pressure": forecast["main"]["pressure"],
        "condition": forecast["weather"][0]["main"],
        "description": forecast["weather"][0]["description"],
        "icon": forecast["weather"][0]["icon"],
        "wind_speed": forecast["wind"]["speed"],
        "forecast_time": forecast["dt_txt"],
    }
