import React from 'react'
import { Header, Grid } from 'semantic-ui-react'

export default (props) => {
  const { items } = props
  return (
    <>
    <Header as="h2">App Overview</Header>
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
    </>
  )
}
