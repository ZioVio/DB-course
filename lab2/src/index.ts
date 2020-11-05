import db from './db';
import UI from './view/index';
import OrderFilters from './models/filters/orderFilters';

db.connect()
  .catch((err) => {
    console.log('Failed to connect to db', err.message);
  });

UI.start();


