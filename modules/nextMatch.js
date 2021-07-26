const moment = require('moment')

const Match = require('./Match')

class NextMatch extends Match {
  constructor() {
    super('next')

    this.matchTime = null
  }

  async sumMatchInfo() {
    await super.sumMatchInfo()

    this.matchTime = moment(this.response.data.gameDate).format(
      'DD.MM.YY HH.mm'
    )

    this.answer = `${this.response.homeTeam.team.name} will play against ${
      this.response.awayTeam.team.name
    } in the ${this.response.data.venue.name}\n\u{1F4C5}Date: ${
      this.matchTime.split(' ')[0]
    }\n\u{23F0}Time: ${this.matchTime.split(' ')[1]}`
    return this.answer
  }
}

module.exports = NextMatch
