import React from 'react'
import { connect } from 'react-redux'
import { Table, Icon, Responsive } from 'semantic-ui-react'

import { saveDataToLocalStorage } from '../localStorage/localStorage'
import { setUserMastery, setUserOwned, setUserMastered } from '../actions/user'
import ItemTableItem from './ItemTableItem'

class ItemTable extends React.Component {
  state = {
    owned: this.props.user.owned,
    mastered: this.props.user.mastered,
    mastery: this.props.user.mastery,
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
  handleAddOwned = id => {
    const owned = this.state.owned.concat(id)
    this.setState({ owned }, () => {
      this.saveUserData()
    })
  }
  handleRemoveOwned = id => {
    const owned = this.state.owned
      .slice(0, this.state.owned.indexOf(id))
      .concat(this.state.owned.slice(this.state.owned.indexOf(id) + 1))
    this.setState({ owned }, () => {
      this.saveUserData()
    })
  }
  handleAddMastered = id => {
    this.handleAddMastery(id)
    const mastered = this.state.mastered.concat(id)
    this.setState({ mastered }, () => {
      this.saveUserData()
    })
  }
  handleAddMastery = id => {
    const masteryToAdd = parseInt(this.props.items.find(item => item.id === id).mastery)
    const mastery = this.state.mastery + masteryToAdd
    this.setState({ mastery }, () => {
      this.props.setUserMastery(mastery)
    })
  }
  handleRemoveMastered = id => {
    this.handleSubtractMastery(id)
    const mastered = this.state.mastered
      .slice(0, this.state.mastered.indexOf(id))
      .concat(this.state.mastered.slice(this.state.mastered.indexOf(id) + 1))
    this.setState({ mastered }, () => {
      this.saveUserData()
    })
  }
  handleSubtractMastery = id => {
    const masteryToSubtract = parseInt(this.props.items.find(item => item.id === id).mastery)
    const mastery = this.state.mastery > masteryToSubtract ? (this.state.mastery - masteryToSubtract) : 0
    this.setState({ mastery }, () => {
      this.props.setUserMastery(mastery)
    })
  }
  saveUserData = () => {
    this.props.setUserOwned(this.state.owned)
    this.props.setUserMastered(this.state.mastered)
    saveDataToLocalStorage({
      owned: this.state.owned,
      mastered: this.state.mastered,
      mastery: this.state.mastery,
      user: {
        hideOwned: this.props.filters.hideOwned,
        hideMastered: this.props.filters.hideMastered
      }
    })
  }
  render() {
    const { visibleItems = [], sortBy = 'nameAsc', excludeCols = [] } = this.props
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
              <Responsive as={Table.HeaderCell} minWidth={996} className="sortable" onClick={() => this.onSortChange('type')}>
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
              </Responsive>
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
            visibleItems.map(item => (
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
  items: state.items,
  filters: state.filters,
  user: state.user
})

export default connect(mapStateToProps, {
  setUserMastery,
  setUserOwned,
  setUserMastered
})(ItemTable)
