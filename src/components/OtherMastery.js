import React from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Checkbox, Input } from 'semantic-ui-react'

import {
  startSetStarChartMastery,
  startEditIntrinsics
} from '../actions/user'

class OtherMastery extends React.Component {
  state = {
    starChartValue: this.props.starChartMastery,
    archivedUserInput: '',
    starChartCompleted: parseInt(this.props.starChartMastery) === 27501 ? true : false,
    tacticalRank: this.props.intrinsics.tactical,
    pilotingRank: this.props.intrinsics.piloting,
    gunneryRank: this.props.intrinsics.gunnery,
    engineeringRank: this.props.intrinsics.engineering,
    error: undefined
  }
  handleStarChartCompleted = () => {
    if (this.state.starChartCompleted) {
      this.setState({
        starChartCompleted: false,
        starChartValue: this.state.archivedUserInput
      }, () => this.handleSaveStarChartValue())
    } else {
      this.setState({
        starChartCompleted: true,
        starChartValue: 27501,  // Current Mastery value of all nodes and junctions
        archivedUserInput: this.state.starChartValue
      }, () => this.handleSaveStarChartValue())
    }
  }
  handleStarChartValueChange = e => {
    const value = e.target.value
    if ((!value || value.match(/^\d+$/g))) {
      this.setState({ starChartValue: value })
    }
  }
  handleSaveStarChartValue = () => {
    const value = this.state.starChartValue
    if (value >= 0 && value <= 27501) {
      this.props.startSetStarChartMastery(this.props.listId, value)
      this.setState({ error: undefined })
    } else {
      this.setState({ error: 'Value must be a number between 0 and 27501'})
    }
  }
  handleTacticalRank = e => {
    const value = e.target.value
    if (value >= 0 && value <= 10) {
      this.setTacticalRank(parseInt(value))
    }
  }
  setTacticalRank = (value = null) => {
    const { tacticalRank } = this.state
    if(!value) value = tacticalRank < 10 ? tacticalRank + 1 : tacticalRank
    this.setState({ tacticalRank: value }, () => {
      this.props.startEditIntrinsics(this.props.listId, { tactical: value })
    })
  }

  handlePilotingRank = e => {
    const value = e.target.value
    if (value >= 0 && value <= 10) {
      this.setPilotingRank(parseInt(value))
    }
  }
  setPilotingRank = (value = null) => {
    const { pilotingRank } = this.state
    if(!value) value = pilotingRank < 10 ? pilotingRank + 1 : pilotingRank
    this.setState({ pilotingRank: value }, () => {
      this.props.startEditIntrinsics(this.props.listId, { piloting: value })
    })
  }
  handleGunneryRank = e => {
    const value = e.target.value
    if (value >= 0 && value <= 10) {
      this.setGunneryRank(parseInt(value))
    }
  }
  setGunneryRank = (value = null) => {
    const { gunneryRank } = this.state
    if(!value) value = gunneryRank < 10 ? gunneryRank + 1 : gunneryRank
    this.setState({ gunneryRank: value }, () => {
      this.props.startEditIntrinsics(this.props.listId, { gunnery: value })
    })
  }
  handleEngineeringRank = e => {
    const value = e.target.value
    if (value >= 0 && value <= 10) {
      this.setEngineeringRank(parseInt(value))
    }
  }
  setEngineeringRank = (value = null) => {
    const { engineeringRank } = this.state
    if(!value) value = engineeringRank < 10 ? engineeringRank + 1 : engineeringRank
    this.setState({ engineeringRank: value }, () => {
      this.props.startEditIntrinsics(this.props.listId, { engineering: value })
    })
  }
  render() {
    const {
      error,
      starChartValue,
      starChartCompleted,
      tacticalRank,
      pilotingRank,
      gunneryRank,
      engineeringRank
    } = this.state
    return (
      <>
        <Header as="h3">Start Chart Mastery</Header>
        <Grid stackable>
          <Grid.Column width="4">
            <Input
              placeholder="Mastery Value"
              autoComplete="off"
              fluid
              name="star-chart-mastery"
              value={starChartValue}
              disabled={starChartCompleted}
              onChange={this.handleStarChartValueChange}
              action={{
                color: "blue",
                icon: "save",
                onClick: () => this.handleSaveStarChartValue()
              }}
            />
          </Grid.Column>
          <Grid.Column width="5" verticalAlign="middle">
            <Checkbox
              label="All nodes and junctions Complete"
              checked={starChartCompleted}
              onChange={this.handleStarChartCompleted}
            />
          </Grid.Column>
        </Grid>
        {this.state.error && (
          <p style={{ color: 'red', fontStyle: 'italic', paddingTop: 10 }}>{error}</p>
        )}
        <p style={{ marginTop: 20, color: 'grey' }}>
          Check if <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>all</span> nodes 
          and junctions (excluding railjack and Grendel nodes) are complete, otherwise copy 
          value from your in-game profile.
        </p>

        <Header as="h3" style={{ marginTop: 40 }}>Railjack Intrinsics</Header>
        <Grid stackable>
          <Grid.Column width="2" textAlign="center">
            <p style={{ marginBottom: 5 }}>Tactical</p>
            <Input
              placeholder="0"
              autoComplete="off"
              fluid
              name="tactical-rank"
              value={tacticalRank}
              onChange={this.handleTacticalRank}
              action={{
                color: "blue",
                icon: "plus",
                onClick: () => this.setTacticalRank()
              }}
            />
          </Grid.Column>
          <Grid.Column width="2" textAlign="center">
            <p style={{ marginBottom: 5 }}>Piloting</p>
            <Input
              placeholder="Mastery Value"
              autoComplete="off"
              fluid
              name="piloting-rank"
              value={pilotingRank}
              onChange={this.handlePilotingRank}
              action={{
                color: "blue",
                icon: "plus",
                onClick: () => this.setPilotingRank()
              }}
            />
          </Grid.Column>
          <Grid.Column width="2" textAlign="center">
            <p style={{ marginBottom: 5 }}>Gunnery</p>
            <Input
              placeholder="Mastery Value"
              autoComplete="off"
              fluid
              name="gunnery-rank"
              value={gunneryRank}
              onChange={this.handleGunneryRank}
              action={{
                color: "blue",
                icon: "plus",
                onClick: () => this.setGunneryRank()
              }}
            />
          </Grid.Column>
          <Grid.Column width="2" textAlign="center">
            <p style={{ marginBottom: 5 }}>Engineering</p>
            <Input
              placeholder="Mastery Value"
              autoComplete="off"
              fluid
              name="engineering-rank"
              value={engineeringRank}
              onChange={this.handleEngineeringRank}
              action={{
                color: "blue",
                icon: "plus",
                onClick: () => this.setEngineeringRank()
              }}
            />
          </Grid.Column>
        </Grid>
        <p style={{ marginTop: 20, color: 'grey' }}>
          Each intrinsic rank awards 1500 mastery for a total of 60000
        </p>
      </>
    )
  }
}

const mapStateToProps = state => ({
  mastery: state.user.mastery,
  starChartMastery: state.user.starChartMastery,
  intrinsics: state.user.intrinsics
})

export default connect(mapStateToProps, {
  startSetStarChartMastery,
  startEditIntrinsics
})(OtherMastery)
