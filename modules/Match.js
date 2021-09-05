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
      stars: [],
    };
  }

  fetchInfo(status) {
    try {
      return axios.get(this.MAIN_URL + this.MATCH_LINK + status)
        .then(async (res) => {
          const response = res.data.teams[0][`${status}GameSchedule`].dates[0].games[0];
          this.response.data = response;
          this.response.homeTeam = response.teams.home;
          this.response.awayTeam = response.teams.away;
          if (status === 'previous') {
            await this.fetchScore();
          }
          return this.response;
        });
    } catch (err) {
      throw new Error(err);
    }
  }

  fetchScore() {
    if (!this.response.data.link) {
      return new Error('No data link');
    }

    try {
      return axios.get(this.MAIN_URL + this.response.data.link).then((res) => {
        const gameReview = res.data.liveData.plays;

        const { firstStar, secondStar, thirdStar } = res.data.liveData.decisions;

        this.response.stars = [firstStar, secondStar, thirdStar];

        gameReview.scoringPlays.forEach((play) => {
          const obsPlay = gameReview.allPlays[play];
          const scorePlay = {
            stat: `${obsPlay.about.goals.home}:${obsPlay.about.goals.away}`,
            scorer: obsPlay.players[0].player.fullName,
            scorerGoalsTotal: obsPlay.players[0].seasonTotal,
            assistants: obsPlay.result.description.split('assists: ')[1] || '',
          };
          this.response.score.push(scorePlay);
        });
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
module.exports = Match;
