const moment = require('moment')

const Match = require('./Match')

class NextMatch extends Match {
  constructor() {
    super('next')

    this.matchTime = null
  }

  async sumMatchInfo() {
    await super.sumMatchInfo()

    this.matchTime = moment(this.response.data.gameDate).format('DD.MM.YY HH.mm')
    console.log(this.matchTime)

    this.answer = ``
  }
}

module.exports = NextMatch