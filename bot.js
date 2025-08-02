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

// Auto-login and join survival
bot.once('spawn', () => {
  console.log('✅ Bot spawned in Minecraft!');
  bot.chat('/login GODGAMERZ9998');
  setTimeout(() => bot.chat('/joinq survival-2'), 5000);
  setTimeout(() => bot.chat('/warp AfkZone'), 8000);
});

// Reconnect on disconnect
bot.on('end', () => {
  console.log('🔁 Bot disconnected. Reconnecting in 5s...');
  setTimeout(() => process.exit(), 5000);
});

// Minecraft chat auto-reply
bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  if (message.toLowerCase() === 'hi') {
    bot.chat('hlo');
  }
});

// === Telegram Bot Integration ===
const telegramBot = new TelegramBot('8015321777:AAFbGRO25iV4Vv_89BrLFfHlzUogn9-6kv0', { polling: true });

telegramBot.onText(/\/status/, msg => {
  telegramBot.sendMessage(msg.chat.id, '🤖 Minecraft bot is online.');
});

telegramBot.onText(/\/say (.+)/, (msg, match) => {
  const text = match[1];
  bot.chat(text);
  telegramBot.sendMessage(msg.chat.id, `✅ Sent: ${text}`);
});

telegramBot.onText(/\/stop/, msg => {
  telegramBot.sendMessage(msg.chat.id, '🛑 Shutting down bot...');
  bot.quit();
  process.exit();
});

telegramBot.onText(/\/warp/, msg => {
  bot.chat('/warp AfkZone');
  telegramBot.sendMessage(msg.chat.id, '📦 Teleported to /warp AfkZone.');
});    bot.loadPlugin(pathfinder);
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
