import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../db';
import Order from './order';
import ProductCategory from './productCategory';
import ProductLine from './productLine';

class Product extends Model {
}

Product.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.UUIDV4,
    allowNull: true,
  },
  line: {
    type: DataTypes.UUIDV4,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'products',
  timestamps: false,
});

Product.hasOne(ProductCategory, {
  foreignKey: 'id',
  sourceKey: 'category',
  onDelete: 'CASCADE',
  hooks: true,
});

Product.hasOne(ProductLine, {
  foreignKey: 'id',
  sourceKey: 'line',
  onDelete: 'CASCADE',
  hooks: true,
});


export default Product;
