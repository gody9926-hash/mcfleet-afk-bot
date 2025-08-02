// bot.js without Telegram integration const mineflayer = require('mineflayer')

function createBot() { const bot = mineflayer.createBot({ host: 'mcfleet.net', port: 25565, username: 'GOD_GAMERZ_XD', version: '1.20.1', auth: 'offline', })

bot.once('spawn', () => { bot.chat('/login GODGAMERZ9998') setTimeout(() => bot.chat('/joinq survival-2'), 5000) setTimeout(() => bot.chat('/warp AfkZone'), 10000)

// Anti-AFK jump
setInterval(() => {
  if (bot.entity && bot.entity.velocity) {
    bot.setControlState('jump', true)
    setTimeout(() => bot.setControlState('jump', false), 500)
  }
}, 10000)

console.log('[Bot] Spawned and running.')

})

bot.on('chat', (username, message) => { if (username === bot.username) return if (message.toLowerCase() === 'hi') bot.chat('hlo') })

bot.on('error', (err) => { console.error('Bot error:', err) })

bot.on('end', () => { console.log('Bot disconnected, reconnecting in 10s...') setTimeout(createBot, 10000) }) }

createBot()

