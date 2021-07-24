// const axios = require('axios')

// class Match {
//   constructor(status) {
//     this.MAIN_URL = 'https://statsapi.web.nhl.com'
//     this.MATCH_LINK = `/api/v1/teams/16?expand=team.schedule.${status}`

//     this.status = status
//     this.answer = null
//   }

//   async getMatchInfo() {
//     // Check on cached answer
//     if (this.answer) {
//       console.log('Ответ уже есть')
//       return this.answer
//     }

//     try {
//       return await axios.get(this.MAIN_URL + this.MATCH_LINK).then((res) => {
//         let response =
//           res.data.teams[0][`${this.status}GameSchedule`].dates[0].games[0]
//         // this.status == 'previous'
//         //   ? response = response.previousGameSchedule.dates[0].games[0]
//         //   : response = response.nextGameSchedule.dates[0].games[0]
//         const winner =
//           response.teams.home.score > response.teams.away.score
//             ? 'defeated'
//             : 'lost to'

//         const title = `:hockey: ${response.teams.home.team.name} ${winner} ${response.teams.away.team.name} \n`

//         this.answer = title

//         return title
//       })
//     } catch (err) {
//       console.log(err)
//       return err
//     }
//   }
// }

// const prevMatch = new Match('previous')

// prevMatch.getMatchInfo().then(res => {console.log(res)})

const PreviousMatch = require('./modules/previousMatch')

const previousMatch = new PreviousMatch

previousMatch.test()