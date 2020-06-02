import * as actionTypes from './types'

export const setItems = items => ({
  type: actionTypes.SET_ITEMS,
  payload: {
    items
  }
})
