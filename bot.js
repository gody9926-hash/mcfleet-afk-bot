const mineflayer = require('mineflayer');
const { pathfinder } = require('mineflayer-pathfinder');

let bot;
let reconnectDelay = 10000;

function startBot() {
  console.log("Starting bot...");

  bot = mineflayer.createBot({
    host: 'mcfleet.net',
    username: 'GOD_GAMERZ_XD',
    version: '1.20.1',
    auth: 'offline'
  });

  bot.loadPlugin(pathfinder);

  bot.once('spawn', () => {
    reconnectDelay = 10000; // Reset delay after successful connect
    console.log("Bot spawned successfully!");

    bot.chat('/login GODGAMERZ9998');

    setTimeout(() => {
      bot.chat('/joinq survival-2');
    }, 3000);

    setTimeout(() => {
      bot.chat('/warp AfkZone');
    }, 6000);

    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 300);
    }, 15000);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase() === 'hi') {
      bot.chat('hlo');
    }
  });

  bot.on('error', (err) => {
    console.error('Bot error:', err.code || err.message);

    if (err.code === 'ECONNRESET') {
      console.log('Connection reset by server. Reconnecting in 10s...');
      bot.quit();
      setTimeout(startBot, 10000);
    }
  });

  bot.on('end', () => {
    console.log(`Bot disconnected. Reconnecting in ${reconnectDelay / 1000}s...`);
    setTimeout(startBot, reconnectDelay);
    reconnectDelay = Math.min(reconnectDelay * 2, 60000); // cap delay at 60s
  });

  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled rejection:', reason);
  });

  process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    console.log('Restarting bot in 10s...');
    setTimeout(startBot, 10000);
  });
}

startBot();
