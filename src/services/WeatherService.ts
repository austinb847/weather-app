import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

export type WeatherResponse = {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

type units = 'metric' | 'imperial' | 'standard'

class WeatherService {
  private static baseWeatherUrl =
    'https://api.openweathermap.org/data/2.5/weather'

  static async getCurrentWeather(
    city: string,
    units: units = 'metric'
  ): Promise<WeatherResponse> {
    const response = await axios.get<WeatherResponse>(
      `${this.baseWeatherUrl}`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units
        }
      }
    )
    return response.data
  }
}

export default WeatherService
