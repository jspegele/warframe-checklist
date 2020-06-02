import React from 'react'
import { connect } from 'react-redux'
import { Container, Tab } from 'semantic-ui-react'

import { sortItems, filterItemsByCategory } from '../selectors/items'
import {
  setTextFilter,
  setWeaponSort,
  setWarframeSort,
  setCompanionSort,
  setVehicleSort
} from '../actions/filters'
import Header from './Header'
import ItemTable from './ItemTable'
import TabLoader from './TabLoader'

class Dashboard extends React.Component {
  state = {
    weaponSortBy: 'name',
    weaponSort: 'Asc',
    warframeSortBy: 'name',
    warframeSort: 'Asc',
    companionSortBy: 'name',
    companionSort: 'Asc',
    vehicleSortBy: 'name',
    vehicleSort: 'Asc'
  }
  handleSortChange = (category, column, sort) => {
    if (category === 'Weapons') {
      this.setState({ weaponSortBy: column, weaponSort: sort }, () => {
        this.props.setWeaponSort(this.state.weaponSortBy + this.state.weaponSort)
      })
    } else if (category === 'Warframes') {
      this.setState({ warframeSortBy: column, warframeSort: sort }, () => {
        this.props.setWarframeSort(this.state.warframeSortBy + this.state.warframeSort)
      })
    } else if (category === 'Companions') {
      this.setState({ companionSortBy: column, companionSort: sort }, () => {
        this.props.setCompanionSort(this.state.companionSortBy + this.state.companionSort)
      })
    } else if (category === 'Vehicles') {
      this.setState({ vehicleSortBy: column, vehicleSort: sort }, () => {
        this.props.setVehicleSort(this.state.vehicleSortBy + this.state.vehicleSort)
      })
    } 
  }
  render() {
    const { items, filters } = this.props
    const weaponSort = filters.weaponSort
    const warframeSort = filters.warframeSort
    const companionSort = filters.companionSort
    const vehicleSort = filters.vehicleSort

    const panes = [
      { menuItem: 'Weapons', render: () => (
        <Tab.Pane>
          {items.length > 0 ? (
            <ItemTable
              category={'Weapons'}
              sortBy={weaponSort}
              handleSortChange={this.handleSortChange}
              items={sortItems(filterItemsByCategory(items, 'Weapon'), weaponSort)}
            />
          ) : (
            <TabLoader />
          )}
        </Tab.Pane>
      )},
      { menuItem: 'Warframes', render: () => (
        <Tab.Pane>
          {items.length > 0 ? (
            <ItemTable
              category={'Warframes'}
              sortBy={warframeSort}
              handleSortChange={this.handleSortChange}
              items={sortItems(filterItemsByCategory(items, 'Warframe'), warframeSort)}
              excludeCols={['slot', 'type']}
            />
          ) : (
            <TabLoader />
          )}
        </Tab.Pane>
      )},
      { menuItem: 'Companions', render: () => (
        <Tab.Pane>
          {items.length > 0 ? (
            <ItemTable
              category={'Companions'}
              sortBy={companionSort}
              handleSortChange={this.handleSortChange}
              items={sortItems(filterItemsByCategory(items, 'Companion'), companionSort)}
            />
          ) : (
            <TabLoader />
          )}
        </Tab.Pane>
      )},
      { menuItem: 'Vehicles', render: () => (
        <Tab.Pane>
          {items.length > 0 ? (
            <ItemTable
              category={'Vehicles'}
              sortBy={vehicleSort}
              handleSortChange={this.handleSortChange}
              items={sortItems(filterItemsByCategory(items, 'Vehicle'), vehicleSort)}
              excludeCols={['type']}
            />
          ) : (
            <TabLoader />
          )}
        </Tab.Pane>
      )},
      { menuItem: 'Other', render: () => <Tab.Pane>other mastery stuff</Tab.Pane> }
    ]

    return (
      <>
        <Container style={{ marginTop: 40, marginBottom: 40 }}>
          <Header />
          <Tab panes={panes} />
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => ({
  items: state.items,
  filters: state.filters
})

const mapDispatchToProps = dispatch => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  setWeaponSort: (sort) => dispatch(setWeaponSort(sort)),
  setWarframeSort: (sort) => dispatch(setWarframeSort(sort)),
  setCompanionSort: (sort) => dispatch(setCompanionSort(sort)),
  setVehicleSort: (sort) => dispatch(setVehicleSort(sort))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
