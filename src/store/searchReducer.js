import axios from 'axios'
import { API_URL } from '../config'

// API Helper Functions
const checkSearchProgress = (_id, resolve, reject) => {
  axios.get(`${API_URL}/search/${_id}`)
  .then(({ data }) => {
    if (data.status === 'finished') {
      return resolve(data)
    } else {
      return setTimeout(() => checkSearchProgress(_id, resolve), 800)
    }
  })
  .catch(reject)
}

const waitForSearchResults = (_id) => {
  return new Promise((resolve, reject) => {
    checkSearchProgress(_id, resolve, reject)
  })
}

// ACTION TYPES
const SUBMIT_REQUEST = 'search/submit-request'
const SUBMIT_SUCCESS = 'search/submit-success'
const SUBMIT_ERROR = 'search/submit-error'

const FETCH_SUCCESS = 'search/fetch-success'

// ACTIONS
export const searchSubmitRequest = () => ({
  type: SUBMIT_REQUEST
})

export const searchSubmitSuccess = (payload) => ({
  type: SUBMIT_SUCCESS,
  payload
})

export const searchSubmitError = (payload) => ({
  type: SUBMIT_ERROR,
  payload
})

export const searchFetchSuccess = (payload) => ({
  type: FETCH_SUCCESS,
  payload
})

const initialSearchState = {
  isFetching: true,
  emails: [],
  error: ''
}

export const searchSubmit = (payload) => (dispatch, store) => {
  dispatch(searchSubmitRequest())
  return axios.post(`${API_URL}/search`, payload)
  .then(({ data }) => {
    dispatch(searchSubmitSuccess({
      ...initialSearchState,
      ...data
    }))
    return waitForSearchResults(data._id)
  })
  .then(data =>
    dispatch(searchFetchSuccess(data))
  )
  .catch(err => {
    console.log(err)
    // dispatch(searchSubmitError(err))
  })
}

// INITIAL STATE
const initialState = {
  isSubmitting: false,
  searches: [],
  error: {}
}

// REDUCER
const search = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_REQUEST:
      return {
        ...initialState,
        isSubmitting: true,
        searches: state.searches
      }
    case SUBMIT_SUCCESS:
      return {
        ...initialState,
        isSubmitting: false,
        searches: [
          action.payload,
          ...state.searches
        ]
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        searches: state.searches.map(s => {
          if (s._id === action.payload._id) {
            s = { ...s, ...action.payload, isFetching: false }
          }
          return s
        })
      }
    default:
      return state
  }
}

export default search
