const TelegramBot = require('node-telegram-bot-api')
const token = require('./config/config')

const PreviousMatch = require('../modules/previousMatch')
const NextMatch = require('../modules/nextMatch')

const bot = new TelegramBot(token, {
  polling: true,
})

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
  const chatId = msg.chat.id
  let answer = ''

  if (msg.text.toString().toLowerCase().includes('prevmatch')) {
    const prevMatch = new PreviousMatch()

    answer = await prevMatch.getAnswer()
  }

  if (msg.text.toString().toLowerCase().includes('nextmatch')) {
    const nextMatch = new NextMatch()

    answer = await nextMatch.getAnswer()
  }

  bot.sendMessage(chatId, answer)
})
