import database from '../firebase/firebase'

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

export const setHideOwned = value => ({
  type: actionTypes.SET_HIDE_OWNED,
  payload: {
    value
  }
})

export const startSetHideOwned = (listId, value) => {
  return (dispatch, getState) => {
    return database.ref(`checklists/${listId}/preferences/hideOwned`).set(value).then(() => {
      dispatch(setHideOwned(value));
    })
  }
}

export const setHideMastered = value => ({
  type: actionTypes.SET_HIDE_MASTERED,
  payload: {
    value
  }
})

export const startSetHideMastered = (listId, value) => {
  return (dispatch, getState) => {
    return database.ref(`checklists/${listId}/preferences/hideMastered`).set(value).then(() => {
      dispatch(setHideMastered(value));
    })
  }
}

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
