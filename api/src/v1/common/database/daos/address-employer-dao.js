import BaseDao from '../../../../lib/base-dao-sequelize';
import { AddressEmployer } from '../models-connectors';

class AddressEmployerDao extends BaseDao {}

export default new AddressEmployerDao(AddressEmployer);
