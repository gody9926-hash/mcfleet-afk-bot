const mineflayer = require('mineflayer');
const { Telegraf } = require('telegraf');

const botToken = '8015321777:AAFbGRO25iV4Vv_89BrLFfHlzUogn9-6kv0';
const telegramBot = new Telegraf(botToken);

let mcBot;

function createBot() {
  mcBot = mineflayer.createBot({
    host: 'mcfleet.net',
    port: 25565,
    username: 'GOD_GAMERZ_XD',
    version: '1.20.1',
    auth: 'offline',
  });

  mcBot.on('login', () => {
    console.log('✅ Minecraft bot logged in');
    setTimeout(() => mcBot.chat('/login GODGAMERZ9998'), 3000);
    setTimeout(() => mcBot.chat('/joinq survival-2'), 8000);
    setTimeout(() => mcBot.chat('/warp AfkZone'), 12000);
  });

  mcBot.on('chat', (username, message) => {
    if (username === mcBot.username) return;
    if (message.toLowerCase() === 'hi') {
      mcBot.chat('hlo');
    }
  });

  mcBot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 5s...');
    setTimeout(createBot, 5000);
  });

  mcBot.on('error', err => {
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
