import { useState, useEffect, DependencyList } from 'react'

// Generic async data hook
function useAsyncData<T>(
  fetchFunction: () => Promise<T>,
  dependencies: DependencyList = [],
  shouldFetch: boolean = true
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!shouldFetch) return

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchFunction()
        setData(result)
      } catch (err) {
        setError('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return { data, loading, error }
}

export default useAsyncData
