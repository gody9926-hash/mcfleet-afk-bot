const mineflayer = require('mineflayer');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

// === CONFIGURATION ===
const TELEGRAM_BOT_TOKEN = '8015321777:AAFbGRO25iV4Vv_89BrLFfHlzUogn9-6kv0';
const MC_USERNAME = 'GOD_GAMERZ_XD';
const MC_SERVER = 'mcfleet.net';
const MC_PORT = 25565;
const MC_VERSION = '1.20.1';
const MC_PASSWORD = 'GODGAMERZ9998';

// === CREATE TELEGRAM BOT ===
const telegramBot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// === CREATE MINECRAFT BOT FUNCTION ===
let bot;
function createBot() {
  bot = mineflayer.createBot({
    host: MC_SERVER,
    port: MC_PORT,
    username: MC_USERNAME,
    version: MC_VERSION,
  });

  bot.on('login', () => {
    console.log('✅ Minecraft bot logged in!');
    bot.chat(`/login ${MC_PASSWORD}`);
    setTimeout(() => bot.chat('/joinq survival-2'), 3000);
    setTimeout(() => bot.chat('/warp AfkZone'), 5000);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase() === 'hi') {
      bot.chat('hlo');
    }
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 5s...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => console.log('❌ Bot error:', err));
}

// === TELEGRAM COMMANDS ===
telegramBot.onText(/\/status/, msg => {
  telegramBot.sendMessage(msg.chat.id, bot ? '✅ Bot is running.' : '❌ Bot is not connected.');
});

telegramBot.onText(/\/say (.+)/, (msg, match) => {
  const text = match[1];
  if (bot) {
    bot.chat(text);
    telegramBot.sendMessage(msg.chat.id, `📣 Sent to Minecraft: ${text}`);
  } else {
    telegramBot.sendMessage(msg.chat.id, '❌ Bot is not connected.');
  }
});

telegramBot.onText(/\/stop/, msg => {
  if (bot) {
    bot.quit();
    bot = null;
    telegramBot.sendMessage(msg.chat.id, '🛑 Bot stopped.');
  } else {
    telegramBot.sendMessage(msg.chat.id, '❌ Bot is already stopped.');
  }
});

// === START BOT ===
createBot();
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
