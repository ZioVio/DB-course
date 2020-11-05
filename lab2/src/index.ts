import db from './db';
import OrderFilters from './models/filters/orderFilters';
db.connect()
  .then(() => {
    console.log('Connected to db');
  })
  .catch((err) => {
    console.log('Failed to connect to db', err.message);
  });


console.log(new OrderFilters({
  'comment': 'any',
  'totalPriceFrom': 12,
  'totalPriceTo': 312312,
  'userId': '213',
  'id': '132'
}).getSQLConditionsAndParameters())



