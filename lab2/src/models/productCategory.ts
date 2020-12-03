import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../db';

class ProductCategory extends Model {
}

ProductCategory.init({
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
  modelName: 'product_categories',
  timestamps: false,
});


export default ProductCategory;
