const mineflayer = require('mineflayer');
const { pathfinder } = require('mineflayer-pathfinder');
const TelegramBot = require('node-telegram-bot-api');

const bot = mineflayer.createBot({
  host: 'mcfleet.net',
  port: 25565,
  username: 'GOD_GAMERZ_XD',
  version: '1.20.1',
});

bot.loadPlugin(pathfinder);

bot.on('login', () => {
  console.log('✅ Minecraft Bot logged in!');
  bot.chat('/login GODGAMERZ9998');
});

bot.once('spawn', () => {
  bot.chat('/joinq survival-2');
  setTimeout(() => {
    bot.chat('/warp AfkZone');
  }, 5000);
});

// Telegram Bot
const tgBot = new TelegramBot('8015321777:AAFbGRO25iV4Vv_89BrLFfHlzUogn9-6kv0', { polling: true });

tgBot.onText(/\/status/, (msg) => {
  tgBot.sendMessage(msg.chat.id, '🟢 Bot is running.');
});

tgBot.onText(/\/say (.+)/, (msg, match) => {
  const text = match[1];
  bot.chat(text);
  tgBot.sendMessage(msg.chat.id, `💬 Sent to Minecraft: ${text}`);
});

tgBot.onText(/\/stop/, (msg) => {
  tgBot.sendMessage(msg.chat.id, '🛑 Stopping bot...');
  process.exit();
});

// Auto reconnect
bot.on('end', () => {
  console.log('🔁 Bot disconnected. Reconnecting in 5s...');
  setTimeout(() => {
    require('./bot.js');
  }, 5000);
});  mcBot.on('error', err => {
    console.error('❌ Bot error:', err);
  });
}

// Telegram Bot Commands
telegramBot.command('status', ctx => {
  ctx.reply(mcBot && mcBot.player ? `✅ Online as ${mcBot.username}` : '❌ Bot is offline.');
});

telegramBot.command('say', ctx => {
  const msg = ctx.message.text.split(' ').slice(1).join(' ');
  if (mcBot && mcBot.chat) {
    mcBot.chat(msg);
    ctx.reply(`💬 Sent: ${msg}`);
  } else {
    ctx.reply('❌ Bot is not connected.');
  }
});

telegramBot.command('stop', ctx => {
  if (mcBot) {
    mcBot.quit();
    ctx.reply('🛑 Bot stopped.');
  }
});

createBot();
telegramBot.launch().then(() => {
  console.log('🚀 Telegram bot launched');
});const telegram = new TelegramBot(telegramToken, { polling: true });

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
