const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'mcfleet.net',
    port: 25565,
    username: 'GOD_GAMERZ_XD',
    version: '1.20.1',
    auth: 'offline'
  });

  bot.on('login', () => {
    console.log('Bot has logged in.');
  });

  bot.once('spawn', () => {
  console.log('Bot spawned!');
  setTimeout(() => {
    bot.chat('/login GODGAMERZ9998');
    setTimeout(() => {
      bot.chat('/joinq survival-2');
    }, 10000); // 10s wait before /joinq
  }, 10000); // 10s wait before /login
});

  bot.on('error', (err) => {
    console.log('Bot error:', err.code || err);
    if (err.code === 'ECONNRESET') {
      console.log('Retrying in 10s...');
      setTimeout(createBot, 10000);
    }
  });

  bot.on('end', () => {
    console.log('Bot disconnected, reconnecting in 10s...');
    setTimeout(createBot, 10000);
  });
}

createBot();
