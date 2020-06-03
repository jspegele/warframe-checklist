import * as actionTypes from './types'

export const setUserMastery = mastery => ({
  type: actionTypes.SET_USER_MASTERY,
  payload: {
    mastery
  }
})

export const setUserOwned = ids => ({
  type: actionTypes.SET_USER_OWNED,
  payload: {
    ids
  }
})

export const setUserMastered = ids => ({
  type: actionTypes.SET_USER_MASTERED,
  payload: {
    ids
  }
})
