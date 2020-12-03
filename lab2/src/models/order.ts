import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../db';
import Product from './product';
import User from './user';

class Order extends Model {
}

Order.init({
  id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: {
    type: DataTypes.UUIDV4,
  },
  total_price: {
    type: DataTypes.NUMBER,
  },
  comment: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: 'orders',
  timestamps: false,
});


Order.hasOne(User, {
  foreignKey: 'id',
  sourceKey: 'user_id',
  onDelete: 'CASCADE',
  hooks: true,
});

// Order.belongsToMany(Product, {
//   through: 'orders_products',
//   onDelete: 'CASCADE',
//   hooks: true,
// });

export default Order;
