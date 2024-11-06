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

export type ForecastResponse = {
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
  cnt: number
  list: {
    dt: number
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      sea_level: number
      grnd_level: number
      humidity: number
      temp_kf: number
    }
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }[]
    clouds: {
      all: number
    }
    wind: {
      speed: number
      deg: number
      gust: number
    }
    visibility: number
    pop: number
    rain?: {
      '3h': number
    }
    sys: {
      pod: 'd' | 'n'
    }
    dt_txt: string
  }[]
}

type units = 'metric' | 'imperial' | 'standard'

class WeatherService {
  private static baseWeatherUrl = 'https://api.openweathermap.org/data/2.5'

  static async getCurrentWeather(
    city: string,
    units: units = 'metric'
  ): Promise<WeatherResponse> {
    const response = await axios.get<WeatherResponse>(
      `${this.baseWeatherUrl}/weather`,
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

  static async getFiveDayForecast(
    city: string,
    units: units = 'metric'
  ): Promise<ForecastResponse> {
    const response = await axios.get<ForecastResponse>(
      `${this.baseWeatherUrl}/forecast`,
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
