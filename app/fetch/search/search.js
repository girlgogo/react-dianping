import { get } from '../get'

export function getSearchData(page, cityName, category, keyword) {
  const keywordStr = keyword ? '/' + keyword : ''
  const categoryStr = category ? '/' + category : 'all'
  const result = get('/api/search/' + page + '/' + cityName + categoryStr + keywordStr)
  return result
}