import React from 'react'

export type Unit = 'C' | 'F'

type TemperatureToggleProps = {
  unit: Unit
  onToggle: (newUnit: Unit) => void
  activeColor?: string
  inactiveColor?: string
  textColor?: string
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({
  unit,
  onToggle,
  activeColor = 'bg-gradient-to-r from-blue-500 to-blue-700',
  inactiveColor = 'bg-gray-300',
  textColor = 'text-gray-500'
}) => {
  return (
    <div className="flex space-x-2">
      <span className={`${unit === 'C' ? 'font-bold' : textColor}`}>°C</span>

      <div
        onClick={() => onToggle(unit === 'C' ? 'F' : 'C')}
        className={`relative flex h-6 w-12 cursor-pointer items-center rounded-full ${inactiveColor} p-0.5 transition-colors duration-300 ease-in-out`}
      >
        <div
          className={`absolute size-5 rounded-full shadow-md ${activeColor} transition-transform duration-500 ${
            unit === 'C' ? 'translate-x-0.5' : 'translate-x-6'
          }`}
        ></div>
      </div>

      <span className={`${unit === 'F' ? 'font-bold' : textColor}`}>°F</span>
    </div>
  )
}

export default TemperatureToggle
