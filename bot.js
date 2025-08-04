const mineflayer = require('mineflayer');
const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_BOT_TOKEN = '8015321777:AAFbGRO25iV4Vv_89BrLFfHlzUogn9-6kv0';
const TELEGRAM_CHAT_ID = null; // Will auto-update on first command

let bot;
let telegramChatId = TELEGRAM_CHAT_ID;
const telegramBot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

function createBot() {
  bot = mineflayer.createBot({
    host: 'mcfleet.net',
    port: 25565,
    username: 'GOD_GAMERZ_XD',
    version: '1.20.1',
    auth: 'offline'
  });

  bot.once('spawn', () => {
    console.log('Bot spawned.');

    bot.chat('/login GODGAMERZ9998');

    setTimeout(() => bot.chat('/joinq survival-2'), 4000);
    setTimeout(() => bot.chat('/warp AfkZone'), 8000);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message === 'hi') bot.chat('hlo');
  });

  bot.on('end', () => {
    console.log('Bot disconnected, reconnecting in 10s...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => {
    console.log('Bot error:', err);
  });
}

// Start bot
createBot();

// Telegram Bot Commands
telegramBot.onText(/\/start/, (msg) => {
  telegramChatId = msg.chat.id;
  telegramBot.sendMessage(telegramChatId, "✅ Minecraft bot is online.");
});

telegramBot.onText(/\/status/, (msg) => {
  telegramChatId = msg.chat.id;
  if (bot && bot.player) {
    telegramBot.sendMessage(telegramChatId, `🟢 Bot is online as ${bot.username}`);
  } else {
    telegramBot.sendMessage(telegramChatId, '🔴 Bot is not connected.');
  }
});

telegramBot.onText(/\/say (.+)/, (msg, match) => {
  telegramChatId = msg.chat.id;
  const text = match[1];
  if (bot && bot.chat) {
    bot.chat(text);
    telegramBot.sendMessage(telegramChatId, `💬 Sent to Minecraft: ${text}`);
  } else {
    telegramBot.sendMessage(telegramChatId, '❌ Bot not connected.');
  }
});

telegramBot.onText(/\/stop/, (msg) => {
  telegramChatId = msg.chat.id;
  telegramBot.sendMessage(telegramChatId, '🛑 Stopping Minecraft bot.');
  if (bot) bot.quit();
});
