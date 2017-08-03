import { get } from '../get'

export function getAdData() {
	const result = get('/api/homead')
  return result
}

export function getListData(cityName, page) {
  const result = get('/api/homelist/' + encodeURIComponent(cityName) + '/' + page)
  return result
}
