import * as actionTypes from '../actions/types'

const filtersReducerDefaultState = {
  text: '',
  maxMR: null,
  hideOwned: false,
  hideMastered: false,
  weaponSort: 'nameAsc',
  warframeSort: 'nameAsc',
  companionSort: 'nameAsc',
  vehicleSort: 'nameAsc',
  sortBy: 'nameAsc'
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_TEXT_FILTER:
      return {
        ...state,
        text: action.payload.text
      }
    case actionTypes.SET_MAX_MR:
      return {
        ...state,
        maxMR: action.payload.mr
      }
    case actionTypes.SET_HIDE_OWNED:
      return {
        ...state,
        hideOwned: action.payload.hide
      }
    case actionTypes.SET_HIDE_MASTERED:
      return {
        ...state,
        hideMastered: action.payload.hide
      }
    case actionTypes.SET_WEAPON_SORT:
      return {
        ...state,
        weaponSort: action.payload.sort
      }
    case actionTypes.SET_WARFRAME_SORT:
      return {
        ...state,
        warframeSort: action.payload.sort
      }
    case actionTypes.SET_COMPANION_SORT:
      return {
        ...state,
        companionSort: action.payload.sort
      }
    case actionTypes.SET_VEHICLE_SORT:
      return {
        ...state,
        vehicleSort: action.payload.sort
      }
    default:
      return state
  }
}

export default filtersReducer
