import { Model } from "sequelize";
import { sequelize } from '../db/index';
import Order from "./order";
import Product from "./product";

class OrdersProducts extends Model {
}

OrdersProducts.init({
}, {
  sequelize,
  modelName: 'orders_products',
});

Product.belongsToMany(Order, {
  through: OrdersProducts,
});


Order.belongsToMany(Product, {
  through: OrdersProducts,
});
