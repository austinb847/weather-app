import useAsyncData from './useAsyncData'
import WeatherService from '../services/WeatherService'
import { WeatherResponse } from '../services/WeatherService'

function useCurrentWeather(city: string) {
  const {
    data: currentWeatherData,
    loading,
    error
  } = useAsyncData<WeatherResponse>(
    () => WeatherService.getCurrentWeather(city),
    [city],
    !!city
  )

  return { currentWeatherData, loading, error }
}

export default useCurrentWeather
