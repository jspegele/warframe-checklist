import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'
import 'semantic-ui-css/semantic.min.css'

import database from './firebase/firebase'
import configureStore from './store/configureStore'
import { setItems } from './actions/items'
import AppRouter from './routers/AppRouter'

// POPULATE DATABASE
// const itemsData = require('./data/warframe-master-data.json')
// const itemsRef = database.ref('items')
// itemsData.forEach(item => itemsRef.push(item))

// configure redux store
const store = configureStore()

// get items from firebase and send to store
const items = []
database.ref('items').once('value').then(snap => {
  snap.forEach(item => {
    const newItem = {
      id: item.key,
      ...item.val()
    }
    items.push(newItem)
  })
  store.dispatch(setItems(items))
})

// get user saved info and send to store
// const json = getDataFromLocalStorage()
// if (json) {
//   const storedData = JSON.parse(json)
//   if (storedData.mastery) store.dispatch(setUserMastery(storedData.mastery))
//   if (storedData.owned) store.dispatch(setUserOwned(storedData.owned))
//   if (storedData.mastered) store.dispatch(setUserMastered(storedData.mastered))
//   if (storedData.preferences) {
//     store.dispatch(setHideOwned(storedData.preferences.hideOwned))
//     store.dispatch(setHideMastered(storedData.preferences.hideMastered))
//   }
// }

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);
