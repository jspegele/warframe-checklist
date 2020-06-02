import * as actionTypes from './types'

export const setTextFilter  = (text = '') => ({
  type: actionTypes.SET_TEXT_FILTER,
  payload: {
    text
  }
})

export const setMaxMR = (mr = null) => ({
  type: actionTypes.SET_MAX_MR,
  payload: {
    mr
  }
})

export const setHideOwned = (hide) => ({
  type: actionTypes.SET_HIDE_OWNED,
  payload: {
    hide
  }
})

export const setHideMastered = (hide) => ({
  type: actionTypes.SET_HIDE_MASTERED,
  payload: {
    hide
  }
})

export const setWeaponSort = sort => ({
  type: actionTypes.SET_WEAPON_SORT,
  payload: {
    sort
  }
})

export const setWarframeSort = sort => ({
  type: actionTypes.SET_WARFRAME_SORT,
  payload: {
    sort
  }
})

export const setCompanionSort = sort => ({
  type: actionTypes.SET_COMPANION_SORT,
  payload: {
    sort
  }
})

export const setVehicleSort = sort => ({
  type: actionTypes.SET_VEHICLE_SORT,
  payload: {
    sort
  }
})
