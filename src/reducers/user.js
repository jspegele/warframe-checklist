import * as actionTypes from '../actions/types'

const defaultUserState = {
  starChartMastery: 0,
  intrinsics: {
    tactical: 0,
    piloting: 0,
    gunnery: 0,
    engineering: 0
  },
  owned: [],
  mastered: []
}

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
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
        owned: [...state.owned, ...action.payload.ids]
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
        mastered: [...state.mastered, ...action.payload.ids]
      }
    case actionTypes.REMOVE_MASTERED:
      return {
        ...state,
        mastered: state.mastered
          .slice(0, state.mastered.indexOf(action.payload.id))
          .concat(state.mastered.slice(state.mastered.indexOf(action.payload.id) + 1))
      }
    case actionTypes.SET_STAR_CHART_MASTERY:
      return {
        ...state,
        starChartMastery: action.payload.value
      }
    case actionTypes.EDIT_INTRINSICS:
      return {
        ...state,
        intrinsics: {
          ...state.intrinsics,
          ...action.payload.updates
        }
      }
    default:
      return state
  }
}

export default userReducer
