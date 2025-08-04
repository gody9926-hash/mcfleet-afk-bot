const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'mcfleet.net',
    port: 25565,
    username: 'GOD_GAMERZ_XD',
    auth: 'offline',
    version: '1.20.1'
  });

  bot.once('spawn', () => {
    console.log('Bot spawned!');
    bot.chat('/login GODGAMERZ9998');

    setTimeout(() => {
      bot.chat('/joinq survival-2');
    }, 5000);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase() === 'hi') {
      bot.chat('hlo');
    }
  });

  bot.on('end', () => {
    console.log('Bot disconnected, reconnecting in 10s...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Bot error:', err);
  });
}

createBot();
