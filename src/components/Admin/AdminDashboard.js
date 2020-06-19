import React from 'react'
import { Grid } from 'semantic-ui-react'

import database from '../../firebase/firebase'

class AdminDashboard extends React.Component {
  state = {
    itemsRef: database.ref('items'),
    items: []
  }
  componentDidMount() {
    database.ref('items').once('value').then(snap => {
      const items = []
      snap.forEach(el => {
        items.push(el.val())
      })
      this.setState({ items })
    })
  }
  render() {
    const { items } = this.state
    return (
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width="4">
            Warframes: {items.filter(item => item.category === 'Warframe').length}<br/><br/>
            Standard: {items.filter(item => item.category === 'Warframe' && item.prime === "FALSE").length}<br/>
            Primes: {items.filter(item => item.category === 'Warframe' && item.prime === "TRUE").length}
          </Grid.Column>
          <Grid.Column width="4">
            Weapons: {items.filter(item => item.category === 'Weapon').length}<br/><br/>
            Primaries: {items.filter(item => item.category === 'Weapon' && item.slot === 'Primary').length}<br/>
            Secondaries: {items.filter(item => item.category === 'Weapon' && item.slot === 'Secondary').length}<br/>
            Melees: {items.filter(item => item.category === 'Weapon' && item.slot === 'Melee').length}
          </Grid.Column>
          <Grid.Column width="4">
            Companions: {items.filter(item => item.category === 'Companion').length}
          </Grid.Column>
          <Grid.Column width="4">
            Vehicles: {items.filter(item => item.category === 'Vehicle').length}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default AdminDashboard
