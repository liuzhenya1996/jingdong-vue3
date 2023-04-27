import { useRoute } from 'vue-router'
export const useRouteEffect = () => {
  const route = useRoute()
  const getQueryValue = (queryName) => {
    return route.query[queryName] || null
  }
  return { getQueryValue }
}
