import * as actionTypes from '../actions/types'

const defaultUserState = {
  mastery: 0,
  owned: [],
  mastered: []
}

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_MASTERY:
      return {
        ...state,
        mastery: action.payload.mastery
      }
    case actionTypes.SET_USER_OWNED:
      return {
        ...state,
        owned: action.payload.ids
      }
    case actionTypes.SET_USER_MASTERED:
      return {
        ...state,
        mastered: action.payload.ids
      }
    default:
      return state
  }
}

export default userReducer
