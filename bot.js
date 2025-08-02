const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'mcfleet.net',
    port: 25565,
    username: 'GOD_GAMERZ_XD',
    version: '1.20.1',
  });

  bot.on('error', (err) => {
    console.error('Bot error:', err);
  });

  bot.on('end', () => {
    console.log('Bot disconnected, reconnecting in 10s...');
    setTimeout(createBot, 10000);
  });

  bot.once('spawn', () => {
    console.log('Bot spawned');

    bot.chat('/login GODGAMERZ9998');
    setTimeout(() => {
      bot.chat('/joinq survival-2');
    }, 3000);
    setTimeout(() => {
      bot.chat('/warp AfkZone');
    }, 7000);

    // Auto-jump to prevent AFK
    setInterval(() => {
      if (bot.entity && bot.entity.velocity) {
        bot.setControlState('jump', true);
        setTimeout(() => {
          bot.setControlState('jump', false);
        }, 500);
      }
    }, 10000);
  });

  // Auto reply to chat
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase() === 'hi') {
      bot.chat('hlo');
    }
  });
}

createBot();
