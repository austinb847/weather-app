import { useState, useEffect } from 'react'
import WeatherService from '../services/WeatherService'
import { WeatherResponse } from '../services/WeatherService'

function useCurrentWeather(city: string) {
  const [currentWeatherData, setCurrentWeatherData] =
    useState<WeatherResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(null)

        const weatherData = await WeatherService.getCurrentWeather(city)
        setCurrentWeatherData(weatherData)
      } catch (err) {
        setError('Failed to fetch weather data')
      } finally {
        setLoading(false)
      }
    }

    if (city) {
      fetchWeather()
    }
  }, [city])

  return { currentWeatherData, loading, error }
}

export default useCurrentWeather
