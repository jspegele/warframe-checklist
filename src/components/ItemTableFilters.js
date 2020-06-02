import React from 'react'
import { connect } from 'react-redux'
import { Segment, Grid, Input, Dropdown, Checkbox } from 'semantic-ui-react'

import {
  setTextFilter,
  setMaxMR,
  setHideOwned,
  setHideMastered
} from '../actions/filters'

class ItemTableFilters extends React.Component {
  state = {
    text: this.props.filters.text,
    maxMR: this.props.filters.maxMR,
    hideOwned: this.props.filters.hideOwned,
    hideMastered: this.props.filters.hideMastered
  }
  handleTextChange = e => {
    this.setState({ text: e.target.value })
    this.props.setTextFilter(e.target.value.trim())
  }
  handleMaxMRChange = (e, {value}) => {
    this.setState({ maxMR: value })
    this.props.setMaxMR(value)
  }
  handleHideOwnedChange = () => {
    this.setState({ hideOwned: !this.state.hideOwned }, () => {
      this.props.setHideOwned(this.state.hideOwned)
    })
  }
  handleHideMasteredChange = () => {
    this.setState({ hideMastered: !this.state.hideMastered }, () => {
      this.props.setHideMastered(this.state.hideMastered)
    })
  }
  render() {
    const mrOptions = [
      { key: 1, value: 1, text: 'MR 1'},
      { key: 2, value: 2, text: 'MR 2'},
      { key: 3, value: 3, text: 'MR 3'},
      { key: 4, value: 4, text: 'MR 4'},
      { key: 5, value: 5, text: 'MR 5'},
      { key: 6, value: 6, text: 'MR 6'},
      { key: 7, value: 7, text: 'MR 7'},
      { key: 8, value: 8, text: 'MR 8'},
      { key: 9, value: 9, text: 'MR 9'},
      { key: 10, value: 10, text: 'MR 10'},
      { key: 11, value: 11, text: 'MR 11'},
      { key: 12, value: 12, text: 'MR 12'},
      { key: 13, value: 13, text: 'MR 13'},
      { key: 14, value: 14, text: 'MR 14'},
      { key: 15, value: 15, text: 'MR 15'}
    ]
    return (
      <Segment>
        <Grid stackable>
          <Grid.Column width="9">
            <Input
              placeholder="Filter by slot, name, type, source"
              autoComplete="off"
              fluid
              name="text"
              value={this.state.text}
              onChange={this.handleTextChange}
            />
          </Grid.Column>
          <Grid.Column width="2">
            <Dropdown
              placeholder="Max MR"
              fluid
              clearable
              selection
              options={mrOptions}
              value={this.state.maxMR}
              onChange={this.handleMaxMRChange}
            />
          </Grid.Column>
          <Grid.Column width="2" verticalAlign="middle">
            <Checkbox
              label="Hide Owned"
              onChange={this.handleHideOwnedChange}
            />
          </Grid.Column>
          <Grid.Column width="3" verticalAlign="middle">
            <Checkbox
              label="Hide Mastered"
              onChange={this.handleHideMasteredChange}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  filters: state.filters
})

export default connect(mapStateToProps, {
  setTextFilter,
  setMaxMR,
  setHideOwned,
  setHideMastered
})(ItemTableFilters)
