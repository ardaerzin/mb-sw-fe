import useSWR from 'swr'

const useSharedState = (key, initial) => {
  const { data: state, mutate: setState } = useSWR(key, null, {
    initialData: initial
  })
  return [state, setState]
}

export default useSharedState
