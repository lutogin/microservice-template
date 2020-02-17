import Sequelize from 'sequelize';
import logger from './lib/logger';
import { BELONGS_TO_MANY } from './v1/common/database/association-types';

class Database {
  constructor() {
    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_URL,
        dialect: 'postgres',
        define: {
          timestamps: false,
        },
        logging: false,
      },
    );

    this.sequelize = sequelize;
    this.models = {};
  }

  Sequelize = Sequelize;

  connect() {
    this.sequelize
      .authenticate()
      .then(() =>
        logger.info(
          `✅ Connection has been established successfully to the database: ${process.env.DB_NAME}`,
        ),
      )
      .catch(err => logger.info('Unable to connect to the database:', err));
  }

  use(databaseName, schema, options) {
    const model = this.sequelize.define(databaseName, schema, options);

    this.models[databaseName] = model;
    model.sync({});
    return model;
  }

  async makeAssociations(associations) {
    if (associations && associations instanceof Array) {
      for (const [sourceModel, associationType, targetModel, allOptions] of associations) {
        const { as, ...options } = allOptions;

        try {
          switch (associationType) {
            case BELONGS_TO_MANY:
              sourceModel[associationType](targetModel, { as, ...options });
              break;
            default:
              sourceModel[associationType](targetModel, { as, ...options });
              await targetModel.belongsTo(sourceModel, options);
              break;
          }
        } catch (error) {
          logger.error(`Can not make associations. Error message: ${error.message}
          ${sourceModel.name}:${sourceModel.name}
          ${associationType}
          ${targetModel.name}:${targetModel.name}`);
          logger.error(options);
        }
      }

      Object.values(this.models).forEach(model => model.sync({}));
    } else {
      throw new Error(`Invalid Association: ${associations}`);
    }
  }

  close() {
    return this.sequelize.close();
  }
}

export default new Database();
