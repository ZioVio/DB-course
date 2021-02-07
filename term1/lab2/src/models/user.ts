import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../db';

class User extends Model {
}

User.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    unique: true,
  }
}, {
  sequelize,
  modelName: 'users',
  timestamps: false,
});

export default User;
