const mineflayer = require('mineflayer')
const TelegramBot = require('node-telegram-bot-api')

const bot = mineflayer.createBot({
  host: 'mcfleet.net',
  username: 'GOD_GAMERZ_XD',
  version: '1.21.4',
  auth: 'offline',
})

const telegram = new TelegramBot('8015321777:AAFbGRO25iV4Vv_89BrLFfHlzUogn9-6kv0', { polling: true })

bot.on('login', () => {
  console.log('Minecraft bot logged in')
  setTimeout(() => bot.chat('/login GODGAMERZ9998'), 3000)
  setTimeout(() => bot.chat('/joinq survival-2'), 7000)
  setTimeout(() => bot.chat('/warp AfkZone'), 11000)
  setInterval(() => bot.setControlState('jump', true), 1000)
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  if (message.toLowerCase() === 'hi') bot.chat('hlo')
})

telegram.onText(/\/status/, (msg) => {
  telegram.sendMessage(msg.chat.id, 'Bot is online.')
})

telegram.onText(/\/say (.+)/, (msg, match) => {
  bot.chat(match[1])
})

telegram.onText(/\/jump/, (msg) => {
  bot.setControlState('jump', true)
})

telegram.onText(/\/stop/, (msg) => {
  bot.quit()
  telegram.sendMessage(msg.chat.id, 'Bot has been stopped.')
})
