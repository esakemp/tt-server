import Sequelize, { Model } from 'sequelize'
import { Measurement } from '../database/models'

type measurementResponse = Model<{
  id: Number
  measurement_name: string
  unit: string
  lowerbound: Number
  upperbound: Number
}>

type measurementPost = { measurement_name: string; unit: string; lowerbound: Number; upperbound: Number }

type measurementUpdate = { measurement_name?: string; unit?: string; lowerbound?: Number; upperbound?: Number }

const Op = Sequelize.Op

export const getMeasurements = (): Promise<measurementResponse[]> => Measurement.findAll()

export const createMeasurement = (data: measurementPost) => Measurement.create(data)

export const deleteMeasurement = (id: string) =>
  Measurement.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  })

export const updateMeasurement = (data: measurementUpdate, id: string) =>
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
