const measurements = require('./routes/measurements')

module.exports = (app, url) => {
  app.use(url, measurements)
}