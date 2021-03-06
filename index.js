const cron = require('node-cron')
const dictionary = require('./source/dictionary.json')

class Cronodile {
  constructor(language) {
    try {
      this.meta = require(`./source/meta/${language || 'en'}.json`)
    } catch (error) {
      console.log('JSON file for meta language is not exist')
      process.exit(1)
    }
  }

  command(command) {
    this.command = command
    return this
  }

  run(time) {
    const key = time.replace(/ /g, '-')

    if (this.meta[key]) {
      const crontab = dictionary[this.meta[key]]

      cron.schedule(crontab['value'], () => {
        console.log(`[Cronodile] Command ${crontab['text']} at ${new Date().toLocaleTimeString()}`)
        this.command()
      })
    }

    return this
  }
}

module.exports = Cronodile
