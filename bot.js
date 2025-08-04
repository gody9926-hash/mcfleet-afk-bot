// bot.js for Render (Minecraft 1.20.1) const mineflayer = require('mineflayer');

function createBot() { const bot = mineflayer.createBot({ host: 'mcfleet.net', port: 25565, // default port; change if custom username: 'GOD_GAMERZ_XD', version: '1.20.1', keepAlive: true, checkTimeoutInterval: 60 * 1000 });

bot.once('spawn', () => { console.log('Bot spawned'); bot.chat('/login GODGAMERZ9998'); setTimeout(() => bot.chat('/joinq survival-2'), 5000); });

bot.on('chat', (username, message) => { if (username === bot.username) return;

if (message.toLowerCase() === 'hi') {
  bot.chat('hlo');
}

});

bot.on('error', (err) => { console.log('Bot error:', err.code || err); });

bot.on('end', () => { console.log('Bot disconnected, reconnecting in 10s...'); setTimeout(createBot, 10000); }); }

createBot();

