import { post, getSearchResult } from '../utils/api'

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
  post('/search', payload)
  .then(({ data }) => {
    dispatch(searchSubmitSuccess({
      ...initialSearchState,
      ...data
    }))
    return getSearchResult(data._id)
  })
  .then(data =>
    dispatch(searchFetchSuccess(data))
  )
  .catch(err => {
    dispatch(searchSubmitError(err))
  })
}

// INITIAL STATE
const initialState = {
  isSubmitting: false,
  searches: [],
  error: ''
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
    case SUBMIT_ERROR:
      return {
        ...initialState,
        isSubmitting: false,
        error: action.payload
      }
    case SUBMIT_SUCCESS:
      return {
        ...initialState,
        isSubmitting: false,
        searches: [
          ...state.searches,
          action.payload
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
