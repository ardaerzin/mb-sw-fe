import { AllPeople } from 'lib/graph/Queries'
import useGraphSWR from 'lib/graph/Utils/useGraphSWR'
import useSharedState from './useSharedState'

const useSearch = (initialData) => {
  /**
   * swr hook setup
   * dataKey: graph key
   * initialData: original first data from the server
   */
  const { data: people, loading } = useGraphSWR({
    dataKey: 'allPeople',
    initialData
  })

  /**
   * access shared search state for search text
   */
  const [searchState] = useSharedState('searchState')
  const { text, status } = searchState || {}

  /**
   * filter data based
   */
  let p = people || []
  if (status) {
    // perform a case 'insensitive' search on Person Names
    p = p.filter((pi) => {
      return pi.name.toLowerCase().includes(text.toLowerCase())
    })
  }
  return { people: p, loading }
}

export default useSearch
