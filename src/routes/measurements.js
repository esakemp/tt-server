const router = require('express').Router()
const {
  getMeasurements,
  createMeasurement,
  deleteMeasurement,
  updateMeasurement,
} = require('../services/measurementService')

router.get('/api/measurements', async (req, res) => {
  try {
    const data = await getMeasurements()
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.post('/api/measurements', async (req, res) => {
  try {
    console.log(req)
    const data = await createMeasurement(req.body)
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.put('/api/measurements/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = await updateMeasurement(req.body, id)
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.delete('/api/measurements/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = await deleteMeasurement(id)
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
