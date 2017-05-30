import axios from 'axios'
import { API_URL } from '../config'

export const get = (endpoint) =>
  axios.get(`${API_URL}${endpoint}`)

export const post = (endpoint, payload) =>
  axios.post(`${API_URL}${endpoint}`, payload)

// Private helper
const checkSearchProgress = (_id, resolve, reject) => {
  get(`/search/${_id}`)
  .then(({ data }) => {
    if (data.status === 'finished') {
      return resolve(data)
    } else {
      return setTimeout(() => checkSearchProgress(_id, resolve), 800)
    }
  })
  .catch(reject)
}

export const getSearchResult = (_id) => {
  return new Promise((resolve, reject) => {
    checkSearchProgress(_id, resolve, reject)
  })
}

export default {
  get,
  post,
  getSearchResult
}
