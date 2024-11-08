import { useMemo, useState } from 'react'
import useCurrentWeather from '../hooks/useCurrentWeather'
import useFiveDayForecast from '../hooks/useFiveDayForecast'
import SearchBar from './SearchBar/SearchBar'
import CurrentWeatherCard, {
  CurrentWeatherCardSkeleton
} from './CurrentWeatherCard/CurrentWeatherCard'
import ForecastCards, {
  ForecastCardsSkeleton
} from './ForecastCards/ForecastCards'
import { Unit } from './TemperatureToggle/TemperatureToggle'

function App() {
  const [searchCity, setSearchCity] = useState<string>('')
  const [temperatureUnit, setTemperatureUnit] = useState<Unit>('C')
  const { currentWeatherData, loading, error } = useCurrentWeather(searchCity)
  const {
    forecastData,
    loading: forecastLoading,
    error: forecastError
  } = useFiveDayForecast(searchCity)

  const dateText = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const dailyForecasts = useMemo(() => {
    return forecastData?.list
      .filter((forecast) => forecast.dt_txt.includes('12:00:00'))
      .slice(0, 5)
  }, [forecastData])

  const handleSearch = (city: string) => setSearchCity(city)

  const hasError = error || forecastError

  return (
    <div className="flex min-h-screen items-start justify-center bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 px-4 pt-10 md:px-8">
      <div className="font-poppins flex w-full max-w-lg flex-col items-center rounded-lg bg-indigo-50 p-6 text-center shadow-2xl md:p-8">
        <SearchBar onSearch={handleSearch} />
        {hasError ? (
          <p className="text-red-500">Failed to fetch weather data</p>
        ) : (
          <>
            {loading ? (
              <CurrentWeatherCardSkeleton />
            ) : (
              currentWeatherData && (
                <CurrentWeatherCard
                  data={currentWeatherData}
                  temperatureUnit={temperatureUnit}
                  onToggleUnit={setTemperatureUnit}
                  dateText={dateText}
                />
              )
            )}
            {forecastLoading ? (
              <ForecastCardsSkeleton />
            ) : (
              dailyForecasts && (
                <ForecastCards
                  forecasts={dailyForecasts}
                  temperatureUnit={temperatureUnit}
                />
              )
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App
