import request from '../Utils/request'
import { useMemo } from 'react'
import useSWR from 'swr'

/**
 * 
 * @param {dataKey} dataKey of the returned data 
 * @param {id} id of the specific document we want to store. defaults to 'x' for lists
 * @param {variables} fetch variables
 * @param {initialData} initial data to begin with
 * @param {options} options 
 */
const useGraphSWR = ({
  dataKey,
  name,
  id = 'x',
  variables,
  initialData
}, options) => {
  const opts = useMemo(() => {
    const x = { ...options }
    if (initialData) {
      x.initialData = initialData
    }
    return x
  }, [options, initialData, dataKey])
  /**
   * useSWR hook
   */
  const { data: d, error, mutate } = useSWR(
    [name || dataKey, id], // key
    // the data fetcher sends a request to local api, and returns relevant graph data
    () => fetch(`/api/graph/?type=${dataKey}`, {
      type: 'test'
    }).then(res => res.json()).then(dd => dd[dataKey]),
    opts // options
  )

  /**
   * set is loading
   */
  const loading = !error && !d

  /**
   * return
   * loading: if the hook is currently loading new data
   * error: returned errors from the server
   * data: data obviously
   * mutate: function to use if we want to mutate the cache
   */
  return {
    loading,
    error,
    data: d,
    mutate
  }
}

export default useGraphSWR
