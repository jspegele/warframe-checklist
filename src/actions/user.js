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
  return dispatch => {
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
  return dispatch => {
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
  return dispatch => {
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
  return dispatch => {
    mastered = mastered
      .slice(0, mastered.indexOf(itemId))
      .concat(mastered.slice(mastered.indexOf(itemId) + 1))
    return database.ref(`checklists/${listId}/mastered/`).set(mastered).then(() => {
      dispatch(removeMastered(itemId))
    })
  }
}

export const setStarChartMastery = value => ({
  type: actionTypes.SET_STAR_CHART_MASTERY,
  payload: {
    value
  }
})

export const startSetStarChartMastery = (listId, value) => {
  return dispatch => {
    return database.ref(`checklists/${listId}/starChartMastery/`).set(value).then(() => {
      dispatch(setStarChartMastery(value))
    })
  }
}

export const editIntrinsics = updates => {
  return ({
    type: actionTypes.EDIT_INTRINSICS,
    payload: {
      updates
    }
  })
}

export const startEditIntrinsics = (listId, updates) => {
  return dispatch => {
    return database.ref(`checklists/${listId}/intrinsics/`).update(updates).then(() => {
      dispatch(editIntrinsics(updates))
    })
  }
}
