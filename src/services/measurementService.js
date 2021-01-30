const Sequelize = require('sequelize')
const { Measurement } = require('../database/models')

const Op = Sequelize.Op

const getMeasurements = () => Measurement.findAll()

const createMeasurement = data => Measurement.create(data)

const deleteMeasurement = id =>
  Measurement.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  })

const updateMeasurement = (data, id) => {
  console.log(data)
  return Measurement.update(
    { ...data },
    {
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    }
    )
  }

module.exports = {
  getMeasurements,
  createMeasurement,
  deleteMeasurement,
  updateMeasurement,
}
