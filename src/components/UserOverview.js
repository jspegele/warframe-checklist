import React from 'react'
import { connect } from 'react-redux'
import { Segment, List, Label } from 'semantic-ui-react'

import masteryRanks from '../data/mastery-ranks'

class UserOverview extends React.Component {
  indexOfCurrentMR = mastery => {
    const ranksAchieved = masteryRanks.filter(rank => mastery >= rank.mastery)
    return ranksAchieved.length - 1
  }
  formatNumber = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  render() {
    const { mastery = 0 } = this.props.user
    const index = this.indexOfCurrentMR(mastery)
    const rank = masteryRanks[index].rank
    const toNextMR = masteryRanks[index+1].mastery - mastery
    const numWeapons = Math.max(Math.round((parseInt(toNextMR) / 3000) * 10) / 10).toFixed(1)

    return (
      <Segment>
        <List horizontal relaxed>
          <List.Item as='div'>
            <Label color="violet" style={{ marginRight: 12 }}>Mastery</Label>
            {this.formatNumber(mastery)}
          </List.Item>
          <List.Item as='div'>
            <Label color="violet" style={{ marginRight: 12 }}>Expected Rank</Label>
            MR
            {rank}
          </List.Item>
          <List.Item as='div'>
            <Label color="violet" style={{ marginRight: 12 }}>Mastery to Next Rank</Label>
            {this.formatNumber(toNextMR)}
            <span style={{ marginLeft: 8, fontStyle: 'italic' }}>
              (~{numWeapons} weapons)
            </span>
          </List.Item>
        </List>
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(UserOverview)
