import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../db';

class ProductLine extends Model {
}

ProductLine.init({
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
  image_url: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: 'product_lines',
  timestamps: false,
});


export default ProductLine;
