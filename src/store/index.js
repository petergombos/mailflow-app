import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import searchReducer from './searchReducer'

const reducers = combineReducers({
  search: searchReducer
})

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

export default store
