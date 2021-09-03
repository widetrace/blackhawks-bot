const { default: axios } = require('axios');
const Match = require('./Match');

class PreviousMatch extends Match {
  constructor() {
    super('previous');
    this.SCORES_LINK = null;
    this.MATCH_SCORE = null;
  }

  async sumMatchInfo() {
    await super.sumMatchInfo();
    this.SCORES_LINK = this.response.data.link;
    this.MATCH_SCORE = await this.getMatchScores();
  }

  async getAnswer() {
    await this.sumMatchInfo();

    return `🏒 ${this.response.homeTeam.team.name} ${
      this.response.homeTeam.score > this.response.awayTeam.score
        ? 'defeated'
        : 'lost to'
    } ${this.response.awayTeam.team.name}\n\n🔔 Scores: ${
      this.response.homeTeam.score
    }:${this.response.awayTeam.score}\n\n ${this.MATCH_SCORE}`;
  }

  async getMatchScores() {
    try {
      return axios.get(this.MAIN_URL + this.SCORES_LINK).then((res) => {
        const gameReview = res.data.liveData;
        let answer = '';

        gameReview.plays.scoringPlays.forEach((play) => {
          const obsPlay = gameReview.plays.allPlays[play];
          answer += `🚨 ${obsPlay.about.goals.home}:${
            obsPlay.about.goals.away
          } — ${obsPlay.players[0].player.fullName} (${
            obsPlay.players[0].seasonTotal
          })${
            obsPlay.result.description.split('assists: ')[1].length > 0
              ? `; Передачи: ${
                obsPlay.result.description.split('assists: ')[1]
              }`
              : ' '
          }\n`;
        });

        return answer;
      });
    } catch (err) {
      console.log(err);
      return new Error(err);
    }
  }
}

module.exports = PreviousMatch;
