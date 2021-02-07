import { Model, ModelCtor } from 'sequelize/types';
import BaseFilters from '../../models/filters/baseFilters';

export default class BaseRepository {

  constructor(protected model: ModelCtor<Model<any, any>>) {
  }

  async get(filters: BaseFilters): Promise<Model<any, any>[]> {
    return this.model.findAll({
      where: filters.toWhereOptions(),
      benchmark: true,
      logging: console.log,
    });
  }

  async delete(filters: BaseFilters) {
    const result = await this.model.destroy({
      where: filters.toWhereOptions(),
    });
    return result;
  }

  async update(searchFilters: BaseFilters , updateFilters: BaseFilters) {
    const result = await this.model.update(updateFilters.filters, {
      where: searchFilters.toWhereOptions(),
      returning: true,
      benchmark: true,
      logging: console.log,
    });

    return result[1];
  }

  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      throw new Error(error.errors[0].message);
    }
  }

}
