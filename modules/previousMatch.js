const { default: axios } = require('axios')
const Match = require('./Match')

class PreviousMatch extends Match {
  constructor() {
    super('previous')
    this.SCORES_LINK = null
    this.MATCH_SCORE = null
  }

  async sumMatchInfo() {
    await super.sumMatchInfo()
    this.SCORES_LINK = this.response.data.link

    const scores = await this.getMatchScores()

    const homeTeamData = this.response.homeTeam
    const awayTeamData = this.response.awayTeam

    this.answer = `🏒 ${homeTeamData.team.name} ${
      homeTeamData.score > awayTeamData.score ? 'defeated' : 'lost to'
    } ${awayTeamData.team.name} \n\n`
    this.answer =
      this.answer + `🔔 Scores: ${homeTeamData.score}:${awayTeamData.score}\n\n`
    this.answer = this.answer + scores

    return this.answer
  }

  async getMatchScores() {
    try {
      return axios.get(this.MAIN_URL + this.SCORES_LINK).then((res) => {
        const gameReview = res.data.liveData
        let answer = ''

        gameReview.plays.scoringPlays.forEach((play) => {
          const obsPlay = gameReview.plays.allPlays[play]
          answer =
            answer +
            `🚨 ${obsPlay.about.goals.home}:${obsPlay.about.goals.away} — ${
              obsPlay.players[0].player.fullName
            } (${obsPlay.players[0].seasonTotal})${
              obsPlay.result.description.split('assists: ')[1].length > 0
                ? `; Передачи: ${
                    obsPlay.result.description.split('assists: ')[1]
                  }`
                : ' '
            }\n`
        })

        return answer
      })
    } catch (err) {
      console.log(err)
      return new Error(err)
    }
  }
}

module.exports = PreviousMatch
