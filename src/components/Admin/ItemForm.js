import React from 'react'
import { Grid, Header, Form, Label, Button, Input, Dropdown, Message } from 'semantic-ui-react'

import {
  categoryValues,
  slotValues,
  typeValues,
  trueFalseValues,
  mrValues,
  masteryValues,
  sourceValues
} from './admin-form-data'
import ConfirmationModal from '../ConfirmationModal'

class ItemForm extends React.Component {
  state = {
    ...this.props.item,
    clearFormModal: false
  }
  handleName = e => this.setState({
    name: e.target.value,
    link: 'https://warframe.fandom.com/wiki/' + e.target.value.replace(' ', '_')
  })
  handleCategory = (e, { value }) => this.setState({ category: value })
  handleSlot = (e, { value }) => this.setState({ slot: value })
  handleType = (e, { value }) => this.setState({ type: value })
  handlePrime = (e, { value }) => this.setState({ prime: value })
  handleVaulted = (e, { value }) => this.setState({ vaulted: value })
  handleLink = e => this.setState({ link: e.target.value })
  handleMR = (e, { value }) => this.setState({ mr: value })
  handleMastery = (e, { value }) => this.setState({ mastery: value })
  handleCommonSource = (e, { value }) => this.setState({ commonSource: value })
  handleCustomSource = e => this.setState({ customSource: e.target.value })
  handleClearFormModalOpen = () => this.setState({ clearFormModal: true })
  handleClearFormModalClose = () => this.setState({ clearFormModal: false })
  handleClearForm = () => {
    this.setState({
      ...this.props.item,
      clearFormModal: false
    })
  }
  isFormValid = () => {
    const {
      name,
      category,
      slot,
      type,
      link,
      mr,
      mastery,
      commonSource,
      customSource
    } = this.state
    if (!name || !category || !link || !mr || !mastery) {
      this.setState({ error: "Complete all required fields" })
      return false
    } if (category === 'Weapon' && (!slot || !type)) {
      this.setState({ error: "Slot and Type are required fields for Weapons" })
      return false
    } if (category === 'Companion' && (!slot)) {
      this.setState({ error: "Slot is required for Companions" })
      return false
    } if (!commonSource && !customSource) {
      this.setState({ error: "Select a common source or enter a custom source" })
      return false
    } else {
      return true
    }
  }
  onSubmit = e => {
    e.preventDefault()

    const newItem = 	{
      "category": this.state.category,
      "slot": this.state.slot,
      "type": this.state.type,
      "prime": this.state.prime,
      "vaulted": this.state.vaulted,
      "mr": this.state.mr,
      "mastery": this.state.mastery,
      "name": this.state.name,
      "source": this.state.customSource ? this.state.customSource : this.state.commonSource,
      "link": this.state.link
    }

    if (this.isFormValid()) {
      this.props.onSubmit(newItem)
      this.handleClearForm()
    }
  }
  render() {
    const {
      name, category, slot, type, prime, vaulted, link, mr,
      mastery, commonSource, customSource, clearFormModal, error
    } = this.state

    return (
      <>
        <Header as="h3">Add a new item to Firebase</Header>
        {error && (
          <Message
            error
            header={error}
          />
        )}
        <Form onSubmit={this.onSubmit}>
          <Grid>
            <Grid.Row>
              <Grid.Column width="10">
                <Form.Field
                  control={Input}
                  required
                  label='Item Name'
                  value={name}
                  onChange={this.handleName}
                />
              </Grid.Column>
              <Grid.Column width="6">
                <Form.Field
                  control={Dropdown}
                  required
                  label='Category'
                  placeholder='Choose...'
                  fluid
                  selection
                  options={categoryValues}
                  value={category}
                  onChange={this.handleCategory}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width="6">
                <Form.Field
                  control={Dropdown}
                  required={category === 'Weapon'}
                  label='Slot'
                  placeholder='Choose...'
                  fluid
                  selection
                  options={slotValues}
                  value={slot}
                  onChange={this.handleSlot}
                />
              </Grid.Column>
              <Grid.Column width="6">
                <Form.Field
                  control={Dropdown}
                  required={category === 'Weapon'}
                  label='Type'
                  placeholder='Choose...'
                  fluid
                  selection
                  options={typeValues}
                  value={type}
                  onChange={this.handleType}
                />
              </Grid.Column>
              <Grid.Column width="2">
                <Form.Field
                  control={Dropdown}
                  required
                  label='Prime'
                  placeholder='Choose...'
                  fluid
                  selection
                  options={trueFalseValues}
                  value={prime}
                  onChange={this.handlePrime}
                />
              </Grid.Column>
              <Grid.Column width="2">
                <Form.Field
                  control={Dropdown}
                  required
                  label='Vaulted'
                  placeholder='Choose...'
                  fluid
                  selection
                  options={trueFalseValues}
                  value={vaulted}
                  onChange={this.handleVaulted}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width="10">
                <Form.Field
                  control={Input}
                  required
                  label='Wiki Link'
                  value={link}
                  onChange={this.handleLink}
                />
                {(this.state.link !== 'https://warframe.fandom.com/wiki/' && this.state.link !== '') && (
                  <div style={{ marginTop: "-8px", marginLeft: "2px" }}>
                    Validate Link: <a href={this.state.link} target="_blank" rel="noopener noreferrer">{this.state.link}</a>
                  </div>
                )}
              </Grid.Column>
              <Grid.Column width="3">
                <Form.Field
                  control={Dropdown}
                  required
                  label='MR'
                  placeholder='Choose...'
                  fluid
                  selection
                  options={mrValues}
                  value={mr}
                  onChange={this.handleMR}
                />
              </Grid.Column>
              <Grid.Column width="3">
                <Form.Field
                  control={Dropdown}
                  required
                  label='Mastery'
                  placeholder='Choose...'
                  fluid
                  selection
                  options={masteryValues}
                  value={mastery}
                  onChange={this.handleMastery}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width="7">
                <Form.Field
                  control={Dropdown}
                  required={!customSource}
                  label='Common Sources'
                  placeholder='Choose...'
                  fluid
                  selection
                  options={sourceValues}
                  value={commonSource}
                  onChange={this.handleCommonSource}
                />
              </Grid.Column>
              <Grid.Column width="1" textAlign="center" verticalAlign="bottom">
                <Label color="violet" style={{ marginBottom: '8px' }}>OR</Label>
              </Grid.Column>
              <Grid.Column width="8">
                <Form.Field
                  control={Input}
                  label='Custom Source'
                  placeholder='Enter custom source'
                  value={customSource}
                  onChange={this.handleCustomSource}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Group>
                  <Form.Button primary>Submit</Form.Button>
                  <Button negative basic type="button" onClick={this.handleClearFormModalOpen}>Clear</Button>
                  <ConfirmationModal
                    modalOpen={clearFormModal}
                    message="Clear Form?"
                    action={this.handleClearForm}
                    actionText="Clear"
                    cancel={this.handleClearFormModalClose}
                  />
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </>
    )
  }
}

ItemForm.defaultProps = {
  item: {
    name: '',
    category: '',
    slot: '',
    type: '',
    prime: false,
    vaulted: false,
    link: 'https://warframe.fandom.com/wiki/',
    mr: 0,
    mastery: 3000,
    commonSource: '',
    customSource: '',
    error: undefined
  }
}

export default ItemForm
