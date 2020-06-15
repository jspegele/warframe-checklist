import React from 'react'
import { connect } from 'react-redux'
import { Segment, List, Label } from 'semantic-ui-react'

import masteryRanks from '../data/mastery-ranks'

class UserOverview extends React.Component {
  calculateMastery = () => {
    const { starChartMastery, mastered, intrinsics } = this.props.user
    
    // total mastery from items
    let itemsMastery = 0
    this.props.items.forEach(item => {
      if (mastered.includes(item.id)) {
        itemsMastery += parseInt(item.mastery)
      }
    })

    // total mastery from intrinsics
    let intrinsicsMastery = 0
    for (let [, value] of Object.entries(intrinsics)) {
      intrinsicsMastery += (value * 1500)  // 1500 mastery for each rank
    }

    return parseInt(starChartMastery) + itemsMastery + intrinsicsMastery
  }
  getMasteryRankInfo = mastery => {
    const ranksAchieved = masteryRanks.filter(rank => mastery >= rank.mastery)
    const index = ranksAchieved.length - 1
    const rank = masteryRanks[index].rank
    const toNextMR = masteryRanks[index+1].mastery - mastery
    const numWeapons = Math.max(Math.round((parseInt(toNextMR) / 3000) * 10) / 10).toFixed(1)
    return { rank, toNextMR, numWeapons }
  }
  formatNumber = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  render() {
    const mastery = this.calculateMastery()
    const rankInfo = this.getMasteryRankInfo(mastery)

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
            {rankInfo.rank}
          </List.Item>
          <List.Item as='div'>
            <Label color="violet" style={{ marginRight: 12 }}>Mastery to Next Rank</Label>
            {this.formatNumber(rankInfo.toNextMR)}
            <span style={{ marginLeft: 8, fontStyle: 'italic' }}>
              (~{rankInfo.numWeapons} weapons)
            </span>
          </List.Item>
        </List>
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  items: state.items,
  user: state.user
})

export default connect(mapStateToProps)(UserOverview)
