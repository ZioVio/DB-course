import db, { sequelize } from './db';
import UI from './view/index';


sequelize.sync().then(() => {
  console.log('connected to db');
}).catch(err => {
  console.log('failed to connect', err);
});

UI.start();


