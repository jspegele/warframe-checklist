import database from '../firebase/firebase'

import * as actionTypes from './types'

export const setUserOwned = ids => ({
  type: actionTypes.SET_USER_OWNED,
  payload: {
    ids
  }
})

export const addOwned = id => ({
  type: actionTypes.ADD_OWNED,
  payload: {
    id
  }
})

export const startAddOwned = (listId, owned, itemId) => {
  return (dispatch, getState) => {
    owned.push(itemId)
    return database.ref(`checklists/${listId}/owned/`).set(owned).then(() => {
      dispatch(addOwned(itemId));
    })
  }
}

export const removeOwned = id => ({
  type: actionTypes.REMOVE_OWNED,
  payload: {
    id
  }
})

export const startRemoveOwned = (listId, owned, itemId) => {
  return (dispatch, getState) => {
    owned = owned
      .slice(0, owned.indexOf(itemId))
      .concat(owned.slice(owned.indexOf(itemId) + 1))
    return database.ref(`checklists/${listId}/owned/`).set(owned).then(() => {
      dispatch(removeOwned(itemId))
    })
  }
}

export const addMastered = id => ({
  type: actionTypes.ADD_MASTERED,
  payload: {
    id
  }
})

export const setUserMastered = ids => ({
  type: actionTypes.SET_USER_MASTERED,
  payload: {
    ids
  }
})

export const startAddMastered = (listId, mastered, itemId) => {
  return (dispatch, getState) => {
    mastered.push(itemId)
    return database.ref(`checklists/${listId}/mastered/`).set(mastered).then(() => {
      dispatch(addMastered(itemId))
    })
  }
}

export const removeMastered = id => ({
  type: actionTypes.REMOVE_MASTERED,
  payload: {
    id
  }
})

export const startRemoveMastered = (listId, mastered, itemId) => {
  return (dispatch, getState) => {
    mastered = mastered
      .slice(0, mastered.indexOf(itemId))
      .concat(mastered.slice(mastered.indexOf(itemId) + 1))
    return database.ref(`checklists/${listId}/mastered/`).set(mastered).then(() => {
      dispatch(removeMastered(itemId))
    })
  }
}

export const setUserMastery = mastery => ({
  type: actionTypes.SET_USER_MASTERY,
  payload: {
    mastery
  }
})

export const addMastery = value => ({
  type: actionTypes.ADD_MASTERY,
  payload: {
    value
  }
})

export const startAddMastery = (listId, total, value) => {
  return (dispatch, getState) => {
    return database.ref(`checklists/${listId}/mastery/`).set(total + value).then(() => {
      dispatch(addMastery(value))
    })
  }
}

export const subtractMastery = value => ({
  type: actionTypes.SUBTRACT_MASTERY,
  payload: {
    value
  }
})

export const startSubtractMastery = (listId, total, value) => {
  return (dispatch, getState) => {
    return database.ref(`checklists/${listId}/mastery/`).set(total - value).then(() => {
      dispatch(subtractMastery(value))
    })
  }
}
