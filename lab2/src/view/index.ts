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
        const controllers = this.getControllers(entity);
        if (!controllers) {
          return console.log('Invalid method or entity');
        }
        switch (method.toUpperCase()) {
          case 'GET': this.onGet(controllers, parsedArgs); break;
          case 'DELETE': this.onDelete(controllers, parsedArgs); break;
          case 'UPDATE': this.onUpdate(controllers, parsedArgs._[0], parsedArgs); break;
          case 'GENERATE': this.onGenerate(controllers, parsedArgs.count); break;
          default: this.onInvalid();
        }
      }
    );
  }

  private onGet(controllers, filters) {
    controllers.onGet(filters).then(result => {
      console.log(result)
    });
  }

  private onDelete(controllers, filters) {
    controllers.onDelete(filters).then(result => {
      console.log(result)
    });
  }

  private onUpdate(controllers, id: string, filters) {
    if (!id) {
      return console.log('Should provide id to update');
    }
    controllers.onUpdate(id, filters).then(result => {
      console.log(result);
    });
  }

  private onGenerate(controllers, count: number) {
    if (!controllers.onGenerate) {
      return console.log('Cannot generate current entity');
    }
    controllers.onGenerate(count).then(result => {
      console.log(result);
    });
  }

  private onInvalid() {
    console.log('Invalid method');
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

