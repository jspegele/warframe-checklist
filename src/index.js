import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'
import 'semantic-ui-css/semantic.min.css'

import database from './firebase/firebase'
import configureStore from './store/configureStore'
import { setItems } from './actions/items'
import Dashboard from './components/Dashboard'

// POPULATE DATABASE
// const itemsData = require('./data/warframe-master-data.json')
// const itemsRef = database.ref('items')
// itemsData.forEach(item => itemsRef.push(item))

const store = configureStore()

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

export const localStorageId = 'wfCheclist-85c28a91-2d06-4407-b9d1-722864f5b9e8'

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>,
  document.getElementById('root')
);
