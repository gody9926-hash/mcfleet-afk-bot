const mineflayer = require('mineflayer');
const { pathfinder } = require('mineflayer-pathfinder');
const autoeat = require('mineflayer-auto-eat').plugin;

function createBot() {
  const bot = mineflayer.createBot({
    host: 'mcfleet.net',
    username: 'GOD_GAMERZ_XD',
    version: '1.20.1',
    keepAlive: true,
    checkTimeoutInterval: 60 * 1000
  });

  bot.loadPlugin(pathfinder);
  bot.loadPlugin(autoeat);

  bot.once('spawn', () => {
    console.log('✅ Bot spawned');

    // Login cracked server
    bot.chat('/login GODGAMERZ9998');
    setTimeout(() => bot.chat('/joinq survival-2'), 3000);
    setTimeout(() => bot.chat('/warp AfkZone'), 6000);

    // Auto-jump loop
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 8000);
  });

  // Chat replies
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase() === 'hi') {
      bot.chat('hlo');
    }
  });

  // Error handling
  bot.on('kicked', (reason) => {
    console.log('❌ Bot kicked:', reason);
  });

  bot.on('error', (err) => {
    console.error('❌ Bot error:', err.message);
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected, reconnecting in 10s...');
    setTimeout(createBot, 10000);
  });
}

createBot();
