import { NotFoundError, RequestValidationError } from './errors';
import db from '../db';
import textCaseHandler from './text-case-handler';
import cleanSequelizeData from './clean-sequelize-data';

const { sequelize, Sequelize } = db;

class BaseDaoSequelize {
  constructor(model) {
    if (!model) {
      throw new Error('Missing model for Sequelize Base DAO');
    }
    this.model = model;
    this.Model = model;
  }

  sequelize = sequelize;

  Sequelize = Sequelize;

  Op = Sequelize.Op;

  toCamelCase = textCaseHandler.toCamelCase.bind(textCaseHandler);

  toUnderscoreCase = textCaseHandler.toUnderscoreCase.bind(textCaseHandler);

  cleanSequelizeData = cleanSequelizeData;

  async create(fields, options) {
    const underscoredFields = this.toUnderscoreCase(fields);

    try {
      const data = await Promise.resolve(this.model.create(underscoredFields, options));
      return this.toCamelCase(this.cleanSequelizeData(data));
    } catch (error) {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        throw new RequestValidationError(
          'Incorrect id of depended model, dependent model with this id does not exist.',
          { detail: error.original.detail },
        );
      }
      throw error;
    }
  }

  async createIfNotExist(fields, options) {
    const object = await this.getOne(fields, options);
    if (object) {
      return object;
    }
    return this.create(fields, options);
  }

  async getAll(options) {
    const result = await this.model.findAll({ ...options });
    return this.toCamelCase(this.cleanSequelizeData(result));
  }

  async getActive(where = {}, options) {
    const mapedWhere = this.toUnderscoreCase(where);
    mapedWhere.active = true;
    const result = await this.model.findAll({ where: mapedWhere, ...options });
    return this.toCamelCase(this.cleanSequelizeData(result));
  }

  async getById(id, options) {
    const item = await this.model.findOne({ where: { id } }, { ...options });
    if (!item) {
      throw new NotFoundError("Item doesn't exist.");
    }
    return this.toCamelCase(this.cleanSequelizeData(item));
  }

  async get({ query, ...where } = {}, options) {
    const mapedWhere = this.toUnderscoreCase(where);

    const result = await this.model.findAll({ where: mapedWhere, ...options });

    return this.toCamelCase(this.cleanSequelizeData(result));
  }

  async getOne(where, options) {
    const mapedWhere = this.toUnderscoreCase(where);
    const result = await this.model.findOne({ where: mapedWhere, ...options });

    return this.toCamelCase(this.cleanSequelizeData(result));
  }

  // TODO: check behavior
  async updateById(id, data, options) {
    const mapedData = this.toUnderscoreCase(data);
    const [item] = await this.model.update(mapedData, { where: { id }, ...options });
    return item || 0;
  }

  // TODO: check behavior
  async update(where, data, options) {
    const mapedWhere = this.toUnderscoreCase(where);
    const mapedData = this.toUnderscoreCase(data);
    const result = await this.model.update(mapedData, { where: mapedWhere, ...options });
    if (!result) {
      throw new NotFoundError("Item doesn't exist.");
    }
    return result;
  }

  async delete(where, options) {
    const mapedWhere = this.toUnderscoreCase(where);
    return this.model.destroy({ where: mapedWhere, ...options });
  }

  async getCount(where, options) {
    const mapedWhere = this.toUnderscoreCase(where);
    return this.model.count({ where: mapedWhere, ...options });
  }

  async transaction(action) {
    return new Promise((resolve, reject) =>
      this.sequelize
        .transaction(action)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        }),
    );
  }
}

export default BaseDaoSequelize;
