import useAsyncData from './useAsyncData'
import WeatherService from '../services/WeatherService'
import { ForecastResponse } from '../services/WeatherService'

function useFiveDayForecast(city: string) {
  const {
    data: forecastData,
    loading,
    error
  } = useAsyncData<ForecastResponse>(
    () => WeatherService.getFiveDayForecast(city),
    [city],
    !!city
  )

  return { forecastData, loading, error }
}

export default useFiveDayForecast
