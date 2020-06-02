import * as actionTypes from '../actions/types'

const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_ITEMS:
      return action.payload.items
    default:
      return state
  }
}

export default itemsReducer
