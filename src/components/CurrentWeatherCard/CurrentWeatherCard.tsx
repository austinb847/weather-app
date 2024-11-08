import React from 'react'
import TemperatureToggle, { Unit } from '../TemperatureToggle/TemperatureToggle'
import { WeatherResponse } from '../../services/WeatherService'

type CurrentWeatherCardProps = {
  data: WeatherResponse
  temperatureUnit: Unit
  onToggleUnit: (unit: Unit) => void
  dateText: string
}

export const CurrentWeatherCardSkeleton: React.FC = () => (
  <div className="flex animate-pulse flex-col items-center space-y-4 text-center">
    <div className="h-10 w-full rounded-md bg-gray-300 sm:w-3/4 md:w-2/3"></div>
    <div className="h-4 w-3/4 rounded-md bg-gray-300 sm:w-1/2"></div>
    <div className="mt-6 flex items-center justify-center space-x-4">
      <div className="size-16 rounded-full bg-gray-300"></div>
      <div className="h-12 w-28 rounded-md bg-gray-300"></div>
    </div>
    <div className="h-4 w-1/2 rounded-md bg-gray-300"></div>
  </div>
)

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  data,
  temperatureUnit,
  onToggleUnit,
  dateText
}) => {
  const temperature =
    temperatureUnit === 'C' ? data.main.temp : data.main.temp * 1.8 + 32

  return (
    <div className="w-full rounded-lg bg-gradient-to-br from-indigo-100 to-blue-200 p-6 text-gray-800 shadow-md">
      <div className="mb-4 flex justify-between">
        <TemperatureToggle unit={temperatureUnit} onToggle={onToggleUnit} />
        <div className="font-roboto-slab text-right text-gray-800">
          <h2 className="text-xl font-semibold">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-sm text-gray-600">{dateText}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="size-16 md:size-20"
        />
        <p className="mt-4 text-4xl font-bold text-gray-800 md:text-5xl">
          {Math.round(temperature)}°{temperatureUnit}
        </p>
        <p className="mt-2 text-sm italic text-gray-600 md:text-base">
          {data.weather[0].description}
        </p>
      </div>
    </div>
  )
}

export default CurrentWeatherCard
