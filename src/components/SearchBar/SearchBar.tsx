import React, { useRef } from 'react'

type SearchBarProps = {
  onSearch: (city: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    const city = inputRef.current?.value || ''
    onSearch(city)
  }

  return (
    <div className="mb-4 flex w-full gap-2">
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter city"
        className="flex-1 rounded-lg border border-gray-300 p-2 transition-all focus:border-indigo-400 focus:shadow-lg focus:outline-none"
        style={{ minWidth: '0' }}
      />
      <button
        onClick={handleSearch}
        className="shrink-0 rounded-lg bg-indigo-400 px-4 py-2 text-white transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar
