const Match = require('./match')

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

  test() {
    console.log(this.status)

    // this.scores = await axios
    // .get(`https://statsapi.web.nhl.com${response.link}`)
    // .then(res => {
    //   const gameReview = res.data.liveData
    //   gameReview.plays.scoringPlays.forEach((play) => {
    //     obsPlay = gameReview.plays.allPlays[play]
    //     answer =
    //       answer +
    //       `${obsPlay.about.goals.home}:${obsPlay.about.goals.away} — ${
    //         obsPlay.players[0].player.fullName
    //       } (${obsPlay.players[0].seasonTotal})${
    //         obsPlay.result.description.split('assists: ')[1].length > 0
    //           ? `; Передачи: ${
    //               obsPlay.result.description.split('assists: ')[1]
    //             }`
    //           : ' '
    //       }\n`
    //   })
    // })
  }
}

module.exports = PreviousMatch