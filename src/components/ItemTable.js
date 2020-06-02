import React from 'react'
import { connect } from 'react-redux'
import { Table, Icon } from 'semantic-ui-react'

import { localStorageId } from '../index'
import {
  setTextFilter,
  setWeaponSort,
  setWarframeSort,
  setCompanionSort,
  setVehicleSort
} from '../actions/filters'
import ItemTableItem from './ItemTableItem'

class ItemTable extends React.Component {
  state = {
    owned: localStorage.getItem(localStorageId) ? (
      JSON.parse(localStorage.getItem(localStorageId)).owned
    ) : [],
    mastered: localStorage.getItem(localStorageId) ? (
      JSON.parse(localStorage.getItem(localStorageId)).mastered
    ) : [],
    sortBy: 'name',
    sort: 'Asc'
  }
  onSortChange = (sortBy) => {
    let sort = ''
    if (this.state.sortBy === sortBy) {
      sort = this.state.sort === 'Asc' ? 'Desc' : 'Asc'
    } else {
      sort = 'Asc'
    }
    this.setState({ sortBy, sort }, () => {
      this.props.handleSortChange(this.props.category, sortBy, sort)
    })
  }
  updateLocalStorage = () => {
    localStorage.setItem(localStorageId, JSON.stringify({
      owned: this.state.owned,
      mastered: this.state.mastered
    }))
  }
  handleAddOwned = id => {
    const owned = this.state.owned.concat(id)
    this.setState({ owned }, () => {
      this.updateLocalStorage()
    })
  }
  handleRemoveOwned = id => {
    const owned = this.state.owned
      .slice(0, this.state.owned.indexOf(id))
      .concat(this.state.owned.slice(this.state.owned.indexOf(id) + 1))
    this.setState({ owned }, () => {
      this.updateLocalStorage()
    })
  }
  handleAddMastered = id => {
    const mastered = this.state.mastered.concat(id)
    this.setState({ mastered }, () => {
      this.updateLocalStorage()
    })
  }
  handleRemoveMastered = id => {
    const mastered = this.state.mastered
      .slice(0, this.state.mastered.indexOf(id))
      .concat(this.state.mastered.slice(this.state.mastered.indexOf(id) + 1))
    this.setState({ mastered }, () => {
      this.updateLocalStorage()
    })
  }
  render() {
    const { items = [], sortBy = 'nameAsc', excludeCols = [] } = this.props
    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            {!excludeCols.includes('slot') && (
              <Table.HeaderCell className="sortable" onClick={() => this.onSortChange('slot')}>
                Slot
                {sortBy === 'slotAsc' ? (
                    <Icon name='caret up' />
                  ) : (
                    sortBy === 'slotDesc' ? (
                      <Icon name='caret down' />
                    ) : (
                      <Icon />
                    )
                  )}
              </Table.HeaderCell>
            )}
            <Table.HeaderCell className="sortable" onClick={() => this.onSortChange('name')}>
              Name
              {sortBy === 'nameAsc' ? (
                  <Icon name='caret up' />
                ) : (
                  sortBy === 'nameDesc' ? (
                    <Icon name='caret down' />
                  ) : (
                    <Icon />
                  )
                )}
            </Table.HeaderCell>
            {!excludeCols.includes('type') && (
              <Table.HeaderCell className="sortable" onClick={() => this.onSortChange('type')}>
                Type
                {sortBy === 'typeAsc' ? (
                    <Icon name='caret up' />
                  ) : (
                    sortBy === 'typeDesc' ? (
                      <Icon name='caret down' />
                    ) : (
                      <Icon />
                    )
                  )}
              </Table.HeaderCell>
            )}
            <Table.HeaderCell className="sortable" onClick={() => this.onSortChange('mr')} textAlign="right">
              MR
              {sortBy === 'mrAsc' ? (
                  <Icon name='caret up' />
                ) : (
                  sortBy === 'mrDesc' ? (
                    <Icon name='caret down' />
                  ) : (
                    <Icon />
                  )
                )}
            </Table.HeaderCell>
            <Table.HeaderCell className="sortable" onClick={() => this.onSortChange('source')}>
              Source
              {sortBy === 'sourceAsc' ? (
                  <Icon name='caret up' />
                ) : (
                  sortBy === 'descending' ? (
                    <Icon name='caret down' />
                  ) : (
                    <Icon />
                  )
                )}
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Owned</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Mastered</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            items.map(item => (
              <ItemTableItem
                key={item.id}
                excludeCols={excludeCols}
                item={item}
                owned={this.state.owned.includes(item.id)}
                mastered={this.state.mastered.includes(item.id)}
                handleAddOwned={this.handleAddOwned}
                handleRemoveOwned={this.handleRemoveOwned}
                handleAddMastered={this.handleAddMastered}
                handleRemoveMastered={this.handleRemoveMastered}
              />
            ))
          }
        </Table.Body>
      </Table>
    )
  }
}

const mapStateToProps = state => ({
  filters: state.filters
})

const mapDispatchToProps = dispatch => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  setWeaponSort: (sort) => dispatch(setWeaponSort(sort)),
  setWarframeSort: (sort) => dispatch(setWarframeSort(sort)),
  setCompanionSort: (sort) => dispatch(setCompanionSort(sort)),
  setVehicleSort: (sort) => dispatch(setVehicleSort(sort))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemTable)
