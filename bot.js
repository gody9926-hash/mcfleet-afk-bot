// bot.js const mineflayer = require('mineflayer'); const express = require('express'); const bodyParser = require('body-parser'); const { Telegraf } = require('telegraf'); require('dotenv').config();

const app = express(); app.use(bodyParser.json());

const bot = new Telegraf(process.env.BOT_TOKEN);

let mcBot;

function createBot() { mcBot = mineflayer.createBot({ host: 'mcfleet.net', port: 25565, username: 'GOD_GAMERZ_XD', version: '1.20.1', auth: 'offline', });

mcBot.on('login', () => { console.log('Minecraft bot logged in'); setTimeout(() => mcBot.chat('/login GODGAMERZ9998'), 5000); setTimeout(() => mcBot.chat('/joinq survival-2'), 10000); setTimeout(() => mcBot.chat('/warp AfkZone'), 15000); });

mcBot.on('end', () => { console.log('Minecraft bot disconnected. Reconnecting...'); setTimeout(createBot, 10000); });

setInterval(() => { if (mcBot && mcBot.entity) { mcBot.setControlState('jump', true); setTimeout(() => mcBot.setControlState('jump', false), 500); } }, 30000);

mcBot.on('chat', (username, message) => { if (username === mcBot.username) return; if (message.toLowerCase() === 'hi') mcBot.chat('hlo'); }); }

createBot();

bot.command('status', (ctx) => { ctx.reply(mcBot ? 'Bot is running.' : 'Bot is offline.'); });

bot.command('say', (ctx) => { const msg = ctx.message.text.split(' ').slice(1).join(' '); if (mcBot) mcBot.chat(msg); ctx.reply('Sent message in Minecraft.'); });

bot.command('jump', (ctx) => { if (mcBot) { mcBot.setControlState('jump', true); setTimeout(() => mcBot.setControlState('jump', false), 500); ctx.reply('Bot jumped!'); } });

bot.command('stop', (ctx) => { if (mcBot) { mcBot.quit(); ctx.reply('Bot stopped.'); } });

app.use(bot.webhookCallback('/telegram'));

const PORT = process.env.PORT || 3000; app.listen(PORT, () => { console.log(Server running on port ${PORT}); bot.telegram.setWebhook(${process.env.WEBHOOK_URL}/telegram); });


telegram.onText(/\/stop/, (msg) => {
  bot.quit()
  telegram.sendMessage(msg.chat.id, 'Bot has been stopped.')
})
