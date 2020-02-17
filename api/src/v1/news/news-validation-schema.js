import Joi from 'joi';
import schemas, { idSchema } from '../common/validation-schemas';
import { methods } from './news-controller';

const { news } = schemas;

const defaultUserParamsSchema = {
  title: news.title.required(),
  shortDescription: news.shortDescription.required(),
  description: news.description.required(),
  photo: news.photo.required(),
};

const readByIdSchema = Joi.object().keys({ id: idSchema });

const createSchema = Joi.object().keys(defaultUserParamsSchema);

export default {
  [methods.create]: createSchema,
  [methods.readById]: readByIdSchema,
};
