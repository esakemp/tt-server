import { Sequelize } from 'sequelize'

const DB_URL = process.env.DB_URL

export const sequelize = new Sequelize(
  DB_URL,
  {
    dialect: 'postgres',
    pool: {
      min: 0,
      max: 5,
    },
  }
)

export const initializeDatabaseConnection = async () => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  const waitSeconds = 60
  for (let i = 1; i <= waitSeconds; i++) {
    try {
      await sequelize.authenticate()
      break
    } catch (e) {
      if (i === waitSeconds) {
        console.log(`Could not connect to database in ${waitSeconds} seconds`)
        throw e
      }
      console.log('.')
      await sleep(1000)
    }
  }
}

module.exports = {
  initializeDatabaseConnection,
  sequelize,
}
