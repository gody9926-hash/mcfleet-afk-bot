const mineflayer = require('mineflayer');
const { pathfinder } = require('mineflayer-pathfinder');
const TelegramBot = require('node-telegram-bot-api');

const telegramToken = '8015321777:AAFbGRO25iV4Vv_89BrLFfHlzUogn9-6kv0';
const chatId = '@mcfleet_afk_bot'; // Or use your own ID if you're testing

let bot;
let reconnectTimeout;

function createBot() {
  bot = mineflayer.createBot({
    host: 'mcfleet.net',
    port: 25565,
    username: 'GOD_GAMERZ_XD',
    version: '1.20.1',
    auth: 'offline',
  });

  bot.on('login', () => {
    console.log('✅ Logged in!');
    bot.chat('/login GODGAMERZ9998');
    setTimeout(() => bot.chat('/joinq survival-2'), 3000);
    setTimeout(() => bot.chat('/warp AfkZone'), 6000);
  });

  bot.on('spawn', () => {
    console.log('🚀 Bot spawned!');

    setInterval(() => {
      if (bot.entity && bot.entity.onGround) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 200);
      }
    }, 5000);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase() === 'hi') bot.chat('hlo');
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 5s...');
    clearTimeout(reconnectTimeout);
    reconnectTimeout = setTimeout(createBot, 5000);
  });

  bot.on('error', err => {
    console.log('❌ Error:', err.message);
  });

  // Load plugins
  try {
    bot.loadPlugin(pathfinder);
  } catch (e) {
    console.log('❌ Pathfinder plugin error:', e.message);
  }
}

// Telegram Integration
const telegram = new TelegramBot(telegramToken, { polling: true });

telegram.onText(/\/status/, (msg) => {
  telegram.sendMessage(msg.chat.id, '🤖 Bot is running and connected.');
});

telegram.onText(/\/say (.+)/, (msg, match) => {
  const message = match[1];
  if (bot && bot.chat) {
    bot.chat(message);
    telegram.sendMessage(msg.chat.id, `✅ Sent to Minecraft: ${message}`);
  }
});

telegram.onText(/\/jump/, (msg) => {
  if (bot && bot.entity) {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 300);
    telegram.sendMessage(msg.chat.id, '⏫ Jumped!');
  }
});

telegram.onText(/\/stop/, (msg) => {
  if (bot) {
    bot.quit('Stopped by Telegram');
    telegram.sendMessage(msg.chat.id, '⛔ Bot stopped.');
  }
});

createBot();
