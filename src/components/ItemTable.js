import React from 'react'
import { connect } from 'react-redux'
import { Table, Icon, Responsive, Popup } from 'semantic-ui-react'

import {
  startAddOwned,
  startRemoveOwned,
  startAddMastered,
  startRemoveMastered
} from '../actions/user'
import ItemTableItem from './ItemTableItem'
import ConfirmationModal from './ConfirmationModal'

class ItemTable extends React.Component {
  state = {
    mastery: this.props.user.mastery,
    sortBy: 'name',
    sort: 'Asc',
    ownedModalOpen: false,
    masteredModalOpen: false
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
    this.props.startAddOwned(this.props.listId, [...this.props.user.owned], [id])
  }
  handleRemoveOwned = id => {
    this.props.startRemoveOwned(this.props.listId, [...this.props.user.owned], id)
  }
  handleAddMastered = id => {
    this.props.startAddMastered(this.props.listId, [...this.props.user.mastered], [id])
  }
  handleRemoveMastered = id => {
    this.props.startRemoveMastered(this.props.listId, [...this.props.user.mastered], id)
  }
  handleOpenOwnedModal = e => {
    this.setState({ ownedModalOpen: true })
  }
  handleCloseOwnedModal = () => {
    this.setState({ ownedModalOpen: false })
  }
  handleAddAllOwned = () => {
    const { user, visibleItems } = this.props
    this.handleCloseOwnedModal()
    
    // filter items already owned from visible array
    const itemsToAdd = visibleItems.filter(item => !user.owned.includes(item.id)).map(item => item.id)
    this.props.startAddOwned(this.props.listId,  [...this.props.user.owned], itemsToAdd)
  }
  handleOpenMasteredModal = e => {
    this.setState({ masteredModalOpen: true })
  }
  handleCloseMasteredModal = () => {
    this.setState({ masteredModalOpen: false })
  }
  handleAddAllMastered = () => {
    const { user, visibleItems } = this.props
    this.handleCloseMasteredModal()
    
    // filter items already owned from visible array
    const itemsToAdd = visibleItems.filter(item => !user.mastered.includes(item.id)).map(item => item.id)
    this.props.startAddMastered(this.props.listId,  [...this.props.user.mastered], itemsToAdd)
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
            <Table.HeaderCell textAlign="center">
              Owned
              <Popup
                content="Mark all visible items as 'owned'"
                hoverable
                position="top right"
                trigger={
                  <Icon
                    name="check square outline"
                    color="blue"
                    size="large"
                    style={{ marginLeft: '3px' }}
                    onClick={this.handleOpenOwnedModal}  
                  />
                }
              />
              <ConfirmationModal
                modalOpen={this.state.ownedModalOpen}
                message="Mark all visible items as 'owned'?"
                action={this.handleAddAllOwned}
                actionText="Mark All"
                cancel={this.handleCloseOwnedModal}
              />
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Mastered
              <Popup
                content="Mark all visible items as 'mastered'"
                hoverable
                position="top right"
                trigger={
                  <Icon
                    name="check square outline"
                    color="blue"
                    size="large"
                    style={{ marginLeft: '3px' }}
                    onClick={this.handleOpenMasteredModal}  
                  />
                }
                />
              <ConfirmationModal
                modalOpen={this.state.masteredModalOpen}
                message="Mark all visible items as 'mastered'?"
                action={this.handleAddAllMastered}
                actionText="Mark All"
                cancel={this.handleCloseMasteredModal}
              />
            </Table.HeaderCell>
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
