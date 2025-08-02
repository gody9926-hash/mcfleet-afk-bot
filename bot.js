const mineflayer = require('mineflayer');
const { pathfinder } = require('mineflayer-pathfinder');
const autoeat = require('mineflayer-auto-eat').plugin;

function createBot() {
  let bot = mineflayer.createBot({
    host: 'mcfleet.net',
    port: 25565,
    username: 'GOD_GAMERZ_XD',
    version: '1.20.1',
    keepAlive: true,
    checkTimeoutInterval: 60 * 1000,
    hideErrors: true
  });

  bot.loadPlugin(pathfinder);
  bot.loadPlugin(autoeat);

  bot.once('spawn', () => {
    console.log('✅ Bot spawned');
    bot.chat('/login GODGAMERZ9998');
    setTimeout(() => bot.chat('/joinq survival-2'), 3000);
    setTimeout(() => bot.chat('/warp AfkZone'), 6000);

    // Auto jump
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 8000);
  });

  // Auto-reply
  bot.on('chat', (username, message) => {
    if (username !== bot.username && message.toLowerCase() === 'hi') {
      bot.chat('hlo');
    }
  });

  // Minimal error logging
  bot.on('error', (err) => {
    if (err.code === 'ECONNRESET') {
      console.warn('⚠️ ECONNRESET - handled silently.');
    } else {
      console.error('❌ Bot error:', err);
    }
  });

  bot.on('kicked', (reason) => {
    console.warn('🚫 Kicked from server:', reason);
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected, reconnecting in 10s...');
    setTimeout(() => {
      createBot();
    }, 10000);
  });
}

createBot();
