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

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);
