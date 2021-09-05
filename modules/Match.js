const axios = require('axios');

class Match {
  constructor() {
    this.MAIN_URL = 'https://statsapi.web.nhl.com';
    this.MATCH_LINK = '/api/v1/teams/16?expand=team.schedule.';

    this.response = {
      data: null,
      homeTeam: null,
      awayTeam: null,
      score: [],
    };
  }

  fetchInfo(status) {
    try {
      axios.get(this.MAIN_URL + this.MATCH_LINK + status).then(async (res) => {
        const response = res.data.teams[0][`${status}GameSchedule`].dates[0].games[0];
        this.response.data = response;
        this.response.homeTeam = response.teams.home;
        this.response.awayTeam = response.teams.away;
        if (status === 'previous') {
          await this.fetchScore;
        }
        return response;
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  fetchScore() {
    try {
      axios.get(this.MAIN_URL + this.response.data.link).then((res) => {
        const gameReview = res.data.liveData.plays;

        gameReview.scoringPlays.forEach((play) => {
          const obsPlay = gameReview.allPlays[play];
          const scoreStat = `🚨 ${obsPlay.about.goals.home}:${obsPlay.about.goals.away}`;
          const goalScorer = ` — ${obsPlay.players[0].player.fullName} (${obsPlay.players[0].seasonTotal});`;
          // const assists =
          this.response.score.push(scoreStat + goalScorer);
        });
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
module.exports = Match;
