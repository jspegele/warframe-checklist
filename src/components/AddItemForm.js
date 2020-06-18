import React from 'react'
import { Grid, Header, Form, Label, Button, Input, Dropdown } from 'semantic-ui-react'

import database from '../firebase/firebase'
import ConfirmationModal from './ConfirmationModal'

const categoryValues = [
  {key: 'companion', text: 'Companion', value: 'Companion'},
  {key: 'warframe', text: 'Warframe', value: 'Warframe'},
  {key: 'weapon', text: 'Weapon', value:  'Weapon'},
  {key: 'vehicle', text: 'Vehicle', value: 'Vehicle'}
]
const slotValues = [
  {key: 'amp', text: 'Amp', value: 'Amp'},
  {key: 'arch-gun', text: 'Arch-Gun', value: 'Arch-Gun'},
  {key: 'arch-melee', text: 'Arch-Melee', value: 'Arch-Melee'},
  {key: 'archwing', text: 'Archwing', value: 'Archwing'},
  {key: 'kavat', text: 'Kavat', value: 'Kavat'},
  {key: 'k-drive', text: 'K-Drive', value: 'K-Drive'},
  {key: 'kubrow', text: 'Kubrow', value: 'Kubrow'},
  {key: 'melee', text: 'Melee', value: 'Melee'},
  {key: 'moa', text: 'Moa', value: 'Moa'},
  {key: 'operator', text: 'Operator', value: 'Operator'},
  {key: 'primary', text: 'Primary', value: 'Primary'},
  {key: 'robotic', text: 'Robotic', value: 'Robotic'},
  {key: 'secondary', text: 'Secondary', value: 'Secondary'},
  {key: 'sentinel', text: 'Sentinel', value: 'Sentinel'},
]
const typeValues = [
  {key: 'arm-cannon', text: 'Arm-Cannon', value: 'Arm-Cannon'},
  {key: 'blade-and-whip', text: 'Blade and Whip', value: 'Blade and Whip'},
  {key: 'bow', text: 'Bow', value: 'Bow'},
  {key: 'claws', text: 'Claws', value: 'Claws'},
  {key: 'crossbow', text: 'Crossbow', value: 'Crossbow'},
  {key: 'dagger', text: 'Dagger', value: 'Dagger'},
  {key: 'dual-daggers', text: 'Dual Daggers', value: 'Dual Daggers'},
  {key: 'dual-pistols', text: 'Dual Pistols', value: 'Dual Pistols'},
  {key: 'dual-shotguns', text: 'Dual Shotguns', value: 'Dual Shotguns'},
  {key: 'dual-swords', text: 'Dual Swords', value: 'Dual Swords'},
  {key: 'fist', text: 'Fist', value: 'Fist'},
  {key: 'glaive', text: 'Glaive', value: 'Glaive'},
  {key: 'gunblade', text: 'Gunblade', value: 'Gunblade'},
  {key: 'hammer', text: 'Hammer', value: 'Hammer'},
  {key: 'heavy-blade', text: 'Heavy Blade', value: 'Heavy Blade'},
  {key: 'kitgun', text: 'Kitgun', value: 'Kitgun'},
  {key: 'launcher', text: 'Launcher', value: 'Launcher'},
  {key: 'machete', text: 'Machete', value: 'Machete'},
  {key: 'nikana', text: 'Nikana', value: 'Nikana'},
  {key: 'nunchaku', text: 'Nunchaku', value: 'Nunchaku'},
  {key: 'pistol', text: 'Pistol', value: 'Pistol'},
  {key: 'polearm', text: 'Polearm', value: 'Polearm'},
  {key: 'rapier', text: 'Rapier', value: 'Rapier'},
  {key: 'rifle', text: 'Rifle', value: 'Rifle'},
  {key: 'scythe', text: 'Scythe', value: 'Scythe'},
  {key: 'shotgun', text: 'Shotgun', value: 'Shotgun'},
  {key: 'shotgun-sidearm', text: 'Shotgun Sidearm', value: 'Shotgun Sidearm'},
  {key: 'sniper-rifle', text: 'Sniper Rifle', value: 'Sniper Rifle'},
  {key: 'sparring', text: 'Sparring', value: 'Sparring'},
  {key: 'speargun', text: 'Speargun', value: 'Speargun'},
  {key: 'staff', text: 'Staff', value: 'Staff'},
  {key: 'sword', text: 'Sword', value: 'Sword'},
  {key: 'sword-and-shield', text: 'Sword and Shield', value: 'Sword and Shield'},
  {key: 'thrown', text: 'Thrown', value: 'Thrown'},
  {key: 'tonfa', text: 'Tonfa', value: 'Tonfa'},
  {key: 'two-handed-nikana', text: 'Two-Handed Nikana', value: 'Two-Handed Nikana'},
  {key: 'warfan', text: 'Warfan', value: 'Warfan'},
  {key: 'whip', text: 'Whip', value: 'Whip'},
  {key: 'zaw', text: 'Zaw', value: 'Zaw'}
]
const trueFalseValues = [
  {key: false, text: 'No', value: false, selected: true},
  {key: true, text: 'Yes', value: true}
]
const mrValues = [
  {key: '0', text: 'MR0', value: '0'},
  {key: '1', text: 'MR1', value: '1'},
  {key: '2', text: 'MR2', value: '2'},
  {key: '3', text: 'MR3', value: '3'},
  {key: '4', text: 'MR4', value: '4'},
  {key: '5', text: 'MR5', value: '5'},
  {key: '6', text: 'MR6', value: '6'},
  {key: '7', text: 'MR7', value: '7'},
  {key: '8', text: 'MR8', value: '8'},
  {key: '9', text: 'MR9', value: '9'},
  {key: '10', text: 'MR10', value: '10'},
  {key: '11', text: 'MR11', value: '11'},
  {key: '12', text: 'MR12', value: '12'},
  {key: '13', text: 'MR13', value: '13'},
  {key: '14', text: 'MR14', value: '14'},
  {key: '15', text: 'MR15', value: '15'}
]
const masteryValues = [
  {key: 3000, text: '3000', value: '3000'},
  {key: 4000, text: '4000', value: '4000'},
  {key: 6000, text: '6000', value: '6000'}
]
const sourceValues = [
  {key: 'trading', text: 'Available via trading', value: 'Available via trading'},
  {key: 'baro', text: "Baro Ki'Teer", value: "Baro Ki'Teer"},
  {key: 'bio-lab', text: 'Clan - Bio Lab', value: 'Clan - Bio Lab'},
  {key: 'chem-lab', text: 'Clan - Chemical Lab', value: 'Clan - Chemical Lab'},
  {key: 'energy-lab', text: 'Clan - Energy Lab', value: 'Clan - Energy Lab'},
  {key: 'tenno-lab', text: 'Clan - Tenno Lab', value: 'Clan - Tenno Lab'},
  {key: 'egg-incubation', text: 'Egg Incubation', value: 'Egg Incubation'},
  {key: 'dna-incubation', text: 'Kavat DNA Incubation', value: 'Kavat DNA Incubation'},
  {key: 'kuva-lich', text: 'Kuva Lich', value: 'Kuva Lich'},
  {key: 'login', text: 'Login Reward (Random)', value: 'Login Reward (Random)'},
  {key: 'market', text: 'Market', value: 'Market'},
  {key: 'relics', text: 'Relics', value: 'Relics'},
  {key: 'arbiters', text: 'Syndicate - Arbiters of Hexis', value: 'Syndicate - Arbiters of Hexis'},
  {key: 'simaris', text: 'Syndicate - Cephalon Simaris', value: 'Syndicate - Cephalon Simaris'},
  {key: 'suda', text: 'Syndicate - Cephalon Suda', value: 'Syndicate - Cephalon Suda'},
  {key: 'loka', text: 'Syndicate - New Loka', value: 'Syndicate - New Loka'},
  {key: 'ostron', text: 'Syndicate - Ostrons', value: 'Syndicate - Ostrons'},
  {key: 'perrin', text: 'Syndicate - Perrin Sequence', value: 'Syndicate - Perrin Sequence'},
  {key: 'veil', text: 'Syndicate - Red Veil', value: 'Syndicate - Red Veil'},
  {key: 'solaris-united', text: 'Syndicate - Solaris United', value: 'Syndicate - Solaris United'},
  {key: 'meridian', text: 'Syndicate - Steel Meridian', value: 'Syndicate - Steel Meridian'},
  {key: 'quills', text: 'Syndicate - The Quills', value: 'Syndicate - The Quills'},
  {key: 'ventkids', text: 'Syndicate - Ventkids', value: 'Syndicate - Ventkids'},
  {key: 'vox-solaris', text: 'Syndicate - Vox Solaris', value: 'Syndicate - Vox Solaris'}
]

const defaultState = {
  name: '',
  category: '',
  slot: '',
  type: '',
  prime: false,
  vaulted: false,
  link: 'https://warframe.fandom.com/wiki/',
  mr: 0,
  mastery: 0,
  commonSource: '',
  customSource: '',
  error: undefined
}

class AddItemForm extends React.Component {
  state = {
    ...defaultState,
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
  handleFormSubmit = e => {
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
      database.ref('items').push(newItem).then(() => {
        alert("New Item Added to Firebase")
        this.handleClearForm()
      })
    }
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
    } if (!commonSource && !customSource) {
      this.setState({ error: "Select a common source or enter a custom source" })
      return false
    } else {
      return true
    }
  }
  handleClearFormModalOpen = () => this.setState({ clearFormModal: true })
  handleClearFormModalClose = () => this.setState({ clearFormModal: false })
  handleClearForm = () => {
    this.setState({
      ...defaultState,
      clearFormModal: false
    })
  }
  render() {
    const {
      name,
      category,
      slot,
      type,
      prime,
      vaulted,
      link,
      mr,
      mastery,
      commonSource,
      customSource,
      clearFormModal,
      error
    } = this.state
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Header as="h3">Add a new item to Firebase</Header>
        {error && (
          <Label
            basic
            color='red'
            pointing='below'
            style={{ width: '100%', textAlign: 'center', fontSize: '14px' }}
          >{error}</Label>
        )}
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
    )
  }
}

export default AddItemForm
