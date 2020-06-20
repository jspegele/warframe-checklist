import React from 'react'
import { connect } from 'react-redux'
import { Container, Segment } from 'semantic-ui-react'

import { history } from '../../routers/AppRouter'
import database from '../../firebase/firebase'
import { sourceValues } from './admin-form-data'

import Overview from './Overview'
import ItemList from './ItemList'

class AdminPage extends React.Component {
  state = {
    itemsRef: database.ref('items'),
    items: []
  }
  componentDidMount() {
    database.ref('items').once('value').then(snap => {
      const items = []
      snap.forEach(el => {
        const item = el.val()
        const formattedItem = {
          id: el.key,
          category: item.category,
          link: item.link,
          mastery: parseInt(item.mastery),
          mr: parseInt(item.mr),
          name: item.name,
          prime: (item.prime === 'TRUE'),
          slot: item.slot,
          source: item.source,
          commonSource: sourceValues.map(source => source.value).includes(item.source) ? item.source : '',
          customSource: !sourceValues.map(source => source.value).includes(item.source) ? item.source : '',
          type: item.type,
          vaulted: (item.vaulted === 'TRUE')
        }
        items.push(formattedItem)
      })
      this.setState({ items }, () => {
        this.addItemListeners()
      })
    })
  }
  componentWillUnmount = () => {
    this.removeItemListeners()
  }
  addItemListeners = () => {
    // Item Added
    const loadedItems = this.state.items.map(item => item.id)
    this.state.itemsRef
      .on('child_added', snap => {
        if (!loadedItems.includes(snap.key)) {
          const items = [...this.state.items]
          const item = snap.val()
          const formattedItem = {
            id: snap.key,
            category: item.category,
            link: item.link,
            mastery: parseInt(item.mastery),
            mr: parseInt(item.mr),
            name: item.name,
            prime: (item.prime === 'TRUE'),
            slot: item.slot,
            source: item.source,
            commonSource: sourceValues.map(source => source.value).includes(item.source) ? item.source : '',
            customSource: !sourceValues.map(source => source.value).includes(item.source) ? item.source : '',
            type: item.type,
            vaulted: (item.vaulted === 'TRUE')
          }
          items.push(formattedItem)
          this.setState({ items })
        }
      })

    // Item Changed
    this.state.itemsRef
      .on('child_changed', snap => {
        const items = [...this.state.items]
        for (let i in items) {
          if (items[i].id === snap.key) {
            items[i] = {
              ...snap.val(),
              commonSource: sourceValues.map(source => source.value).includes(items[i].source) ? items[i].source : '',
              customSource: !sourceValues.map(source => source.value).includes(items[i].source) ? items[i].source : ''
            }
            break
          }
        }
        this.setState({ items })
      })
  }
  removeItemListeners = () => {
    this.state.itemsRef.off()
  }
  render() {
    const { items } = this.state
    return (
      <>
      {this.props.isAuthenticated ? (
        <Container style={{ marginTop: 40, marginBottom: 40 }}>
          <Segment><Overview items={items} /></Segment>
          <Segment><ItemList items={items} /></Segment>
        </Container>
      ) : (
        history.push('/')
      )}
      </>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(AdminPage)
