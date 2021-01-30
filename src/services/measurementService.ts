import Sequelize from 'sequelize'
import { Measurement } from '../database/models'

const Op = Sequelize.Op

export const getMeasurements = () => Measurement.findAll()

export const createMeasurement = data => Measurement.create(data)

export const deleteMeasurement = id =>
  Measurement.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  })

export const updateMeasurement = (data, id) =>
  Measurement.update(
    { ...data },
    {
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    }
  )


