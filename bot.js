const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const TelegramBot = require('node-telegram-bot-api');
const { Vec3 } = require('vec3');

// === CONFIG ===
const MC_SERVER = 'mcfleet.net';
const MC_USERNAME = 'GOD_GAMERZ_XD';
const MC_PASSWORD = 'GODGAMERZ9998';
const TELEGRAM_TOKEN = '8015321777:AAFbGRO25iV4Vv_89BrLFfHlzUogn9-6kv0';
const TELEGRAM_CHAT_ID = null; // optional lock to specific chat

// === START BOT ===
let bot;
function startBot() {
  bot = mineflayer.createBot({
    host: MC_SERVER,
    username: MC_USERNAME,
    version: '1.20.1',
    auth: 'offline',
  });

  bot.loadPlugin(pathfinder);

  bot.on('login', () => {
    console.log('✅ Logged in!');
    bot.chat(`/login ${MC_PASSWORD}`);
    setTimeout(() => bot.chat('/joinq survival-2'), 3000);
    setTimeout(() => bot.chat('/warp AfkZone'), 7000);
  });

  bot.on('spawn', () => {
    console.log('🎮 Spawned in world.');
    setInterval(() => bot.setControlState('jump', true), 2000);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase() === 'hi') bot.chat('hlo');
  });

  bot.on('end', () => {
    console.log('❌ Bot disconnected. Reconnecting...');
    setTimeout(startBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('❗ Bot error:', err.message);
  });
}

startBot();

// === TELEGRAM BOT ===
const tgBot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

tgBot.onText(/\/status/, (msg) => {
  if (TELEGRAM_CHAT_ID && msg.chat.id !== TELEGRAM_CHAT_ID) return;
  tgBot.sendMessage(msg.chat.id, `🤖 Bot status: ${bot ? 'Running' : 'Offline'}`);
});

tgBot.onText(/\/say (.+)/, (msg, match) => {
  const text = match[1];
  if (bot) bot.chat(text);
  tgBot.sendMessage(msg.chat.id, `💬 Sent in chat: ${text}`);
});

tgBot.onText(/\/jump/, (msg) => {
  if (bot) {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 1000);
    tgBot.sendMessage(msg.chat.id, '🦘 Jumped!');
  }
});

tgBot.onText(/\/stop/, (msg) => {
  if (bot) {
    bot.quit();
    tgBot.sendMessage(msg.chat.id, '🛑 Bot stopped.');
  }
});
