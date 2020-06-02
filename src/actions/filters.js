import * as actionTypes from './types'

export const setTextFilter  = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  payload: {
    text
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
