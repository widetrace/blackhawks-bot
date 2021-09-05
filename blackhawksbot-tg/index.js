const TelegramBot = require('node-telegram-bot-api');
const token = require('./config/config');

const Match = require('../modules/Match');
const Formatter = require('../modules/Formatter');
const Processor = require('../modules/Processor');

const match = new Match();
const formatter = new Formatter();
const processor = new Processor();

const bot = new TelegramBot(token, {
  polling: true,
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  let answer = '';

  if (msg.text.toString().toLowerCase().includes('prevmatch')) {
    answer = await processor.sumInfo(match, formatter, 'previous');
  }

  if (msg.text.toString().toLowerCase().includes('nextmatch')) {
    answer = await processor.sumInfo(match, formatter, 'next');
  }

  if (!answer) {
    bot.sendMessage(chatId, 'repeat');
  }

  bot.sendMessage(chatId, answer);
});
