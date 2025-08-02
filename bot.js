const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'mcfleet.net',
  port: 25565,
  username: 'GOD_GAMERZ_XD',
  version: '1.21.4',
  auth: 'offline'
});

bot.once('spawn', () => {
  console.log('Bot has spawned!');
});
