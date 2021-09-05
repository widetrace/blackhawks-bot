const moment = require('moment');

class Formatter {
  constructor() {
    this.match = null;
    this.homeTeamName = '';
    this.awayTeamName = '';
  }

  format(status, match) {
    this.match = match;
    this.homeTeamName = this.match.homeTeam.team.name;
    this.awayTeamName = this.match.awayTeam.team.name;

    if (status === 'previous' && this.match.score) {
      return this.previous();
    }

    if (status === 'next') {
      return this.next();
    }

    return false;
  }

  previous() {
    return `🏒 ${this.homeTeamName} ${this.match.homeTeam.score > this.match.awayTeam.score ? 'defeated' : 'lost to'} ${this.awayTeamName} \n
    🔔 Scores:\n ${this.createScoreLine()}\n
    Stars: ${this.createStarLine()}`;
  }

  next() {
    const matchDate = moment(this.match.data.gameDate).format('DD.MM.YY HH.mm').split(' ');

    return `🏒 ${this.homeTeamName} will play against ${this.awayTeamName} in the ${this.match.data.venue.name};\n
    📅 Date: ${matchDate[0]};\n
    ⏰ Time: ${matchDate[1]}`;
  }

  createScoreLine() {
    let answer = '';
    this.match.score.forEach((play) => {
      answer += `🚨 ${play.stat} — ${play.scorer}(${play.scorerGoalsTotal}); Assists: ${play.assistants}\n`;
    });
    return answer;
  }

  createStarLine() {
    let answer = '';
    const starEmoji = '⭐';
    this.match.stars.forEach((star, index) => {
      answer += `${starEmoji.repeat(index + 1)} ${star.fullName}; `;
    });
    return answer;
  }
}

module.exports = Formatter;
