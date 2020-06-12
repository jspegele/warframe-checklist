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
    case actionTypes.ADD_OWNED:
      return {
        ...state,
        owned: [...state.owned, action.payload.id]
      }
    case actionTypes.REMOVE_OWNED:
      return {
        ...state,
        owned: state.owned
          .slice(0, state.owned.indexOf(action.payload.id))
          .concat(state.owned.slice(state.owned.indexOf(action.payload.id) + 1))
      }
    case actionTypes.ADD_MASTERED:
      return {
        ...state,
        mastered: [...state.mastered, action.payload.id]
      }
    case actionTypes.REMOVE_MASTERED:
      return {
        ...state,
        mastered: state.mastered
          .slice(0, state.mastered.indexOf(action.payload.id))
          .concat(state.mastered.slice(state.mastered.indexOf(action.payload.id) + 1))
      }
    case actionTypes.ADD_MASTERY:
      return {
        ...state,
        mastery: state.mastery + action.payload.value
      }
    case actionTypes.SUBTRACT_MASTERY:
      return {
        ...state,
        mastery: state.mastery - action.payload.value
      }
    default:
      return state
  }
}

export default userReducer
