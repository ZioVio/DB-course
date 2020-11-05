import { IUserFilters } from './../models/filters/userFilters';
import readLine from 'readline';
import minimist from 'minimist';

import userControllers from '../controllers/user';
import orderControllers from '../controllers/order';
import productControllers from '../controllers/product';
import productLineControllers from '../controllers/productLines';
import productCategoriesControllers from '../controllers/productCategories';

class UI {

  private entityNames: string[] = [
    'users', 'products', 'orders', 'product_lines',
    'product_categories',
  ]

  public start() {
    const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.on('line', (input: string) => {
        const [method, entity, ...filters] = input.split(' ');
        if (!method || !this.checkEntity(entity)) {
          return console.log('Invalid method or entity');
        }
        const parsedArgs = minimist(filters);
        switch (method.toUpperCase()) {
          case 'GET': this.onGet(entity, parsedArgs);
        }
      }
    );
  }

  private onGet(entity, filters) {
    const controllers = this.getControllers(entity);
    if (!controllers) {
      return console.log('Invalid method or entity');
    }
    controllers.onGet(filters).then(result => {
      console.log(result)
    });
  }

  private checkEntity(e: string): boolean {
    return this.entityNames.includes(e);
  }

  private getControllers(entityName: string) {
    switch (entityName) {
      case 'users': return userControllers;
      case 'orders': return orderControllers;
      case 'products': return productControllers;
      case 'product_lines': return productLineControllers;
      case 'product_categories': return productCategoriesControllers;
      default: return null;
    }
  }
}

export default new UI();


// {
//   get: (...args: string[]) => {
//     const entity = this.getEntityName(args);
//     if (!entity) {
//       return console.log('No such entity');
//     }
//     const filters = minimist(args);
//
//   },
//   update: (target: string) => {
//     console.log('UPDATE', target);
//   },
//   delete: (target: string) => {
//     console.log('DELETE', target);
//   }
// }
