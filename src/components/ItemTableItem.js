import React from 'react'
import { Table, Checkbox, Responsive } from 'semantic-ui-react'

class ItemTableItem extends React.Component {
  state = {
    owned: this.props.owned,
    mastered: this.props.mastered
  }
  onOwnedChange = () => {
    this.setState({ owned: !this.state.owned }, () => {
      if (this.state.owned) {
        this.props.handleAddOwned(this.props.item.id)
      } else {
        this.props.handleRemoveOwned(this.props.item.id)
      }
    })
  }
  onMasteredChange = () => {
    this.setState({ mastered: !this.state.mastered }, () => {
      if (this.state.mastered) {
        this.props.handleAddMastered(this.props.item.id)
      } else {
        this.props.handleRemoveMastered(this.props.item.id)
      }
    })
  }
  render() {
    const { excludeCols, item } = this.props
    return (
      <Table.Row className="item-table__row">
        {!excludeCols.includes('slot') && <Table.Cell>{item.slot}</Table.Cell>}
        <Table.Cell><a href={item.link} title="View on Wiki" target="_blank" rel="noopener noreferrer">{item.name}</a></Table.Cell>
        {!excludeCols.includes('type') && <Responsive as={Table.Cell} minWidth={996}>{item.type}</Responsive>}
        <Table.Cell textAlign="right" style={{ paddingRight: 30 }}>{item.mr}</Table.Cell>
        <Table.Cell className="item-table__source">{item.source}</Table.Cell>
        <Table.Cell textAlign="center"><Checkbox onChange={this.onOwnedChange} checked={this.state.owned} /></Table.Cell>
        <Table.Cell textAlign="center"><Checkbox onChange={this.onMasteredChange} checked={this.state.mastered} /></Table.Cell>
      </Table.Row>
    )
  }
}

export default ItemTableItem
