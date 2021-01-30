import measurements from './routes/measurements'

export default (app, url) => {
  app.use(url, measurements)
}