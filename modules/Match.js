const axios = require('axios')

class Match {
  constructor(status) {
    this.MAIN_URL = 'https://statsapi.web.nhl.com'
    this.MATCH_LINK = `/api/v1/teams/16?expand=team.schedule.${status}`
    // this.SCORES_LINK = null -- in previous match only

    this.status = status

    this.response = {
      data: null,
      homeTeam: null,
      awayTeam: null,
    }

    this.answer = null
    this.scores = null
  }

  async sumMatchInfo() {
    await this.getMatchInfo()
  }

  getMatchInfo() {
    try {
      return axios.get(this.MAIN_URL + this.MATCH_LINK).then((res) => {
        let response =
          res.data.teams[0][`${this.status}GameSchedule`].dates[0].games[0]
        this.response.data = response
        this.response.homeTeam = response.teams.home
        this.response.awayTeam = response.teams.away
        return true
      })
    } catch (err) {
      console.log(err)
      return err
    }
  }

  getMainInfo() {}
}

module.exports = Match
