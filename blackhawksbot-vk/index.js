const Vk = require('node-vk-bot-api');
const Markup = require('node-vk-bot-api/lib/markup');

const token = require('./config');

const Match = require('../modules/Match');
const Formatter = require('../modules/Formatter');
const Processor = require('../modules/Processor');

const match = new Match();
const formatter = new Formatter();
const processor = new Processor();

const bot = new Vk(token);

const matchKeyboard = Markup.keyboard([
  [Markup.button('Следующий матч'), Markup.button('Предыдущий матч')],
]).oneTime();

bot.command('/матч', (ctx) => {
  try {
    ctx.reply('Выберите нужный вам матч в меню', null, matchKeyboard);
  } catch (error) {
    console.log(error);
  }
});

bot.command('Следующий матч', async (ctx) => {
  const answer = await processor.sumInfo(match, formatter, 'next');

  ctx.reply(answer, null, matchKeyboard);
});

bot.command('Предыдущий матч', async (ctx) => {
  const answer = await processor.sumInfo(match, formatter, 'previous');

  ctx.reply(answer, null, matchKeyboard);
});

// bot.on(ctx => {
//   console.log(ctx.message)
// })

bot.startPolling(() => {
  console.log('poll start');
});

process.on('unhandledRejection', (error) => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error);
});
