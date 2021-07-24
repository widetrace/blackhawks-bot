const Match = require('./Match')

class PreviousMatch extends Match {
  constructor () {
    super('previous')
  }

  async sumMatchInfo() {
    await super.sumMatchInfo()
    this.answer = `${this.response.homeTeam.team.name} ${
      this.response.homeTeam.score > this.response.awayTeam.score
        ? 'defeated'
        : 'lost to'
    } ${this.response.awayTeam.team.name} \n 123`
    console.log(this.response.data.link)
    return this.answer
    // return this.response.homeTeam
  }
}

module.exports = PreviousMatch