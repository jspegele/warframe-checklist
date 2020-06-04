import React from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Segment, Header, Icon } from 'semantic-ui-react'

import {
  selectItems,
  sortItems,
  filterItemsByCategory
} from '../selectors/items'
import {
  setWeaponSort,
  setWarframeSort,
  setCompanionSort,
  setVehicleSort
} from '../actions/filters'
import AppHeader from './AppHeader'
import UserOverview from './UserOverview'
import ItemTableFilters from './ItemTableFilters'
import ItemTable from './ItemTable'
import TabLoader from './TabLoader'
import Footer from './Footer'

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
    const { items, visibleItems, filters } = this.props
    const weaponSort = filters.weaponSort
    const warframeSort = filters.warframeSort
    const companionSort = filters.companionSort
    const vehicleSort = filters.vehicleSort

    const panes = [
      { menuItem: 'Weapons', render: () => (
        <Tab.Pane className="item">
          {items.length === 0 ? (
            <TabLoader />
          ) : (
            visibleItems.length > 0 ? (
              <ItemTable
                category={'Weapons'}
                sortBy={weaponSort}
                handleSortChange={this.handleSortChange}
                visibleItems={sortItems(filterItemsByCategory(visibleItems, 'Weapon'), weaponSort)}
              />
            ) : (
              <Segment placeholder>
                <Header size="medium" color="grey" icon>
                  <Icon name="search" />
                  No Weapons Found
                </Header>
              </Segment>
            )
          )}
        </Tab.Pane>
      )},
      { menuItem: 'Warframes', render: () => (
        <Tab.Pane>
          {items.length === 0 ? (
            <TabLoader />
          ) : (
            filterItemsByCategory(visibleItems, 'Warframe').length > 0 ? (
              <ItemTable
                category={'Warframes'}
                sortBy={warframeSort}
                handleSortChange={this.handleSortChange}
                visibleItems={sortItems(filterItemsByCategory(visibleItems, 'Warframe'), warframeSort)}
                excludeCols={['slot', 'type']}
              />
            ) : (
              <Segment placeholder>
                <Header size="medium" color="grey" icon>
                  <Icon name="search" />
                  No Warframes Found
                </Header>
              </Segment>
            )
          )}
        </Tab.Pane>
      )},
      { menuItem: 'Companions', render: () => (
        <Tab.Pane>
          {items.length === 0 ? (
            <TabLoader />
          ) : (
            filterItemsByCategory(visibleItems, 'Companion').length > 0 ? (
              <ItemTable
                category={'Companions'}
                sortBy={companionSort}
                handleSortChange={this.handleSortChange}
                visibleItems={sortItems(filterItemsByCategory(visibleItems, 'Companion'), companionSort)}
              />
            ) : (
              <Segment placeholder>
                <Header size="medium" color="grey" icon>
                  <Icon name="search" />
                  No Companions Found
                </Header>
              </Segment>
            )
          )}
        </Tab.Pane>
      )},
      { menuItem: 'Vehicles', render: () => (
        <Tab.Pane>
          {items.length === 0 ? (
            <TabLoader />
          ) : (
            filterItemsByCategory(visibleItems, 'Vehicle').length > 0 ? (
              <ItemTable
                category={'Vehicles'}
                sortBy={vehicleSort}
                handleSortChange={this.handleSortChange}
                visibleItems={sortItems(filterItemsByCategory(visibleItems, 'Vehicle'), vehicleSort)}
                excludeCols={['type']}
              />
            ) : (
              <Segment placeholder>
                <Header size="medium" color="grey" icon>
                  <Icon name="search" />
                  No Vehicles Found
                </Header>
              </Segment>
            )
          )}
        </Tab.Pane>
      )},
      { menuItem: 'Other', render: () => <Tab.Pane style={{ padding: 40 }}>Ability to add Star Chart and Railjack Mastery coming soon.</Tab.Pane> }
    ]

    return (
      <>
        <Container style={{ marginTop: 40, marginBottom: 40 }}>
          <AppHeader />
          <UserOverview />
          <ItemTableFilters />
          <Tab panes={panes} />
          <Footer />
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => ({
  items: state.items,
  visibleItems: selectItems(state.items, state.filters, state.user),
  filters: state.filters
})

export default connect(mapStateToProps, {
  setWeaponSort,
  setWarframeSort,
  setCompanionSort,
  setVehicleSort
})(Dashboard)
