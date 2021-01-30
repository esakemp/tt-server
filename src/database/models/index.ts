import Sequelize from 'sequelize'
import { sequelize } from '../connection'

export const Measurement = sequelize.define(
  'measurement',
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    measurement_name: { type: Sequelize.STRING },
    unit: { type: Sequelize.STRING },
    lowerbound: { type: Sequelize.INTEGER },
    upperbound: { type: Sequelize.INTEGER },
    createdAt: { type: Sequelize.DATE },
    updatedAt: { type: Sequelize.DATE },
  },
  {
    underscored: true,
  }
)
