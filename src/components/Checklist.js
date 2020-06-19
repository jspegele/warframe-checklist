import React from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Segment, Header, Icon } from 'semantic-ui-react'

import database from '../firebase/firebase'
import {
  selectItems,
  sortItems,
  filterItemsByCategory
} from '../selectors/items'
import {
  setWeaponSort,
  setWarframeSort,
  setCompanionSort,
  setVehicleSort,
  setHideOwned,
  setHideMastered
} from '../actions/filters'
import {
  setUserOwned,
  setUserMastered,
  setStarChartMastery,
  editIntrinsics
} from '../actions/user'
import UserOverview from './UserOverview'
import ItemTableFilters from './ItemTableFilters'
import ItemTable from './ItemTable'
import TabLoader from './TabLoader'
import OtherMastery from './OtherMastery'

class Checklist extends React.Component {
  state = {
    listId: this.props.match.params.listId,
    weaponSortBy: 'name',
    weaponSort: 'Asc',
    warframeSortBy: 'name',
    warframeSort: 'Asc',
    companionSortBy: 'name',
    companionSort: 'Asc',
    vehicleSortBy: 'name',
    vehicleSort: 'Asc'
  }
  componentDidMount() {
    // get user saved info from firebase and send to store
    database.ref(`checklists/${this.state.listId}`).once('value').then(snap => {
      const data = snap.val()
      if (data) {
        if (data.owned) this.props.setUserOwned(data.owned)
        if (data.mastered) this.props.setUserMastered(data.mastered)
        if (data.starChartMastery) this.props.setStarChartMastery(data.starChartMastery)
        if (data.intrinsics) this.props.editIntrinsics(data.intrinsics)
        if (data.preferences) {
          this.props.setHideOwned(data.preferences.hideOwned)
          this.props.setHideMastered(data.preferences.hideMastered)
        }
      }
    })
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
  handleSaveChecklist = updates => {
    database.ref(`checklists/${this.state.listId}/`).update(updates).then(() => {
      this.props.setUserOwned(updates.owned)
      this.props.setUserMastered(updates.mastered)
    })
  }
  render() {
    const { items, visibleItems, filters } = this.props
    const listId = this.props.match.params.listId
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
                visibleItems={sortItems(filterItemsByCategory(visibleItems, 'Weapon'), weaponSort)}
                handleSortChange={this.handleSortChange}
                handleSaveChecklist={this.handleSaveChecklist}
                listId={listId}
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
                visibleItems={sortItems(filterItemsByCategory(visibleItems, 'Warframe'), warframeSort)}
                excludeCols={['slot', 'type']}
                handleSortChange={this.handleSortChange}
                handleSaveChecklist={this.handleSaveChecklist}
                listId={listId}
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
                visibleItems={sortItems(filterItemsByCategory(visibleItems, 'Companion'), companionSort)}
                handleSortChange={this.handleSortChange}
                handleSaveChecklist={this.handleSaveChecklist}
                listId={listId}
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
                visibleItems={sortItems(filterItemsByCategory(visibleItems, 'Vehicle'), vehicleSort)}
                excludeCols={['type']}
                handleSortChange={this.handleSortChange}
                handleSaveChecklist={this.handleSaveChecklist}
                listId={listId}
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
      { menuItem: 'Other', render: () => (
        <Tab.Pane>
          <OtherMastery listId={listId} />
        </Tab.Pane>
      )}
    ]

    return (
      <>
        <Container style={{ marginTop: 40, marginBottom: 40 }}>
          <Segment><Icon name="exclamation" color="red" /> Be sure to bookmark this page so you can return to your checklist.</Segment>
          <UserOverview />
          <ItemTableFilters listId={listId} />
          <Tab panes={panes} />
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
  setVehicleSort,
  setHideOwned,
  setHideMastered,
  setUserOwned,
  setUserMastered,
  setStarChartMastery,
  editIntrinsics
})(Checklist)
