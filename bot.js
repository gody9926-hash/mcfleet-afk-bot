const mineflayer = require('mineflayer');
const TelegramBot = require('node-telegram-bot-api');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'mcfleet.net',
    port: 25565,
    username: 'GOD_GAMERZ_XD',
    version: '1.20.1'
  });

  bot.on('login', () => {
    console.log('✅ Logged in to Minecraft');
    bot.chat('/login GODGAMERZ9998');
  });

  bot.on('spawn', () => {
    setTimeout(() => {
      bot.chat('/joinq survival-2');
    }, 3000);
    setTimeout(() => {
      bot.chat('/warp AfkZone');
    }, 7000);
  });

  const telegram = new TelegramBot('8015321777:AAFbGRO25iV4Vv_89BrLFfHlzUogn9-6kv0', { polling: true });

  telegram.onText(/\/status/, (msg) => {
    telegram.sendMessage(msg.chat.id, '✅ Bot is online and connected.');
  });

  telegram.onText(/\/say (.+)/, (msg, match) => {
    const text = match[1];
    bot.chat(text);
    telegram.sendMessage(msg.chat.id, `💬 Sent to Minecraft: ${text}`);
  });

  telegram.onText(/\/stop/, (msg) => {
    telegram.sendMessage(msg.chat.id, '🛑 Stopping bot...');
    process.exit();
  });

  bot.on('chat', (username, message) => {
    if (username !== bot.username) {
      if (message.toLowerCase() === 'hi') {
        bot.chat('hlo');
      }
    }
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 5s...');
    setTimeout(startBot, 5000);
  });

  bot.on('error', (err) => {
    console.error('❌ Bot Error:', err.message);
  });
}

startBot();
