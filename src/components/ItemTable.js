import React from 'react'
import { connect } from 'react-redux'
import { Table, Icon, Responsive } from 'semantic-ui-react'

import {
  startAddOwned,
  startRemoveOwned,
  startAddMastered,
  startRemoveMastered
} from '../actions/user'
import ItemTableItem from './ItemTableItem'

class ItemTable extends React.Component {
  state = {
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
    this.props.startAddOwned(this.props.listId, [...this.props.user.owned], id)
  }
  handleRemoveOwned = id => {
    this.props.startRemoveOwned(this.props.listId, [...this.props.user.owned], id)
  }
  handleAddMastered = id => {
    this.props.startAddMastered(this.props.listId, [...this.props.user.mastered], id)
  }
  handleRemoveMastered = id => {
    this.props.startRemoveMastered(this.props.listId, [...this.props.user.mastered], id)
  }
  
  render() {
    const { visibleItems = [], sortBy = 'nameAsc', excludeCols = [], user } = this.props
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
            visibleItems.map(item => {
              let key = item.id
              const owned = user.owned.includes(item.id)
              const mastered = user.mastered.includes(item.id)
              if (owned) key += 'o'
              if (mastered) key += 'm'
              return (
                <ItemTableItem
                  key={key}
                  excludeCols={excludeCols}
                  item={item}
                  owned={owned}
                  mastered={mastered}
                  handleAddOwned={this.handleAddOwned}
                  handleRemoveOwned={this.handleRemoveOwned}
                  handleAddMastered={this.handleAddMastered}
                  handleRemoveMastered={this.handleRemoveMastered}
                />
              )
            })
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
  startAddOwned,
  startRemoveOwned,
  startAddMastered,
  startRemoveMastered
})(ItemTable)
