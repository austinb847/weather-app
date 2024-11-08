import React from 'react'
import { ForecastResponse } from '../../services/WeatherService'
import { Unit } from '../TemperatureToggle/TemperatureToggle'

type ForecastCardsProps = {
  forecasts: ForecastResponse['list']
  temperatureUnit: Unit
}

export const ForecastCardsSkeleton: React.FC = () => (
  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className="w-full animate-pulse rounded-lg bg-gray-300 p-4 shadow-lg"
      >
        <div className="mx-auto mb-2 h-4 w-16 rounded-md bg-gray-400"></div>
        <div className="mx-auto mb-2 size-10 rounded-full bg-gray-400"></div>
        <div className="mx-auto mb-1 h-4 w-12 rounded-md bg-gray-400"></div>
        <div className="mx-auto h-3 w-3/4 rounded-md bg-gray-400"></div>
      </div>
    ))}
  </div>
)

const ForecastCards: React.FC<ForecastCardsProps> = ({
  forecasts,
  temperatureUnit
}) => (
  <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
    {forecasts.map((forecast, index) => (
      <div
        key={index}
        className="w-full rounded-lg bg-gradient-to-br from-indigo-100 to-blue-200 p-4 text-center text-gray-800 shadow-md"
      >
        <p className="text-sm font-semibold">
          {new Date(forecast.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'short'
          })}
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
          alt={forecast.weather[0].description}
          className="mx-auto my-2 size-10"
        />
        <p className="text-lg font-bold">
          {Math.round(
            temperatureUnit === 'C'
              ? forecast.main.temp
              : forecast.main.temp * 1.8 + 32
          )}
          °{temperatureUnit}
        </p>
        <p className="text-xs">{forecast.weather[0].description}</p>
      </div>
    ))}
  </div>
)

export default ForecastCards
