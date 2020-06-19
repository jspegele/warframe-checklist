import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import itemsReducer from '../reducers/items'
import filtersReducer from '../reducers/filters'
import userReducer from '../reducers/user'
import authReducer from '../reducers/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Store creation

export default () => {
  const store = createStore(
    combineReducers({
      items: itemsReducer,
      filters: filtersReducer,
      user: userReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )

  return store;
}
