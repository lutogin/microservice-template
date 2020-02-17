import Joi from 'joi';
import schemas, { idSchema } from '../common/validation-schemas';
import { methods } from './user-controller';

const { user } = schemas;

const email = user.email.required();
const password = user.auth.password.required();

const defaultUserParamsSchema = {
  firstName: user.firstName.empty(''),
  lastName: user.lastName.empty(''),
  phoneNumber: user.phoneNumber.empty(''),
  gender: user.gender.empty(''),
  age: user.age.empty(''),
  hobbies: user.hobbies,
};

const reginstrationUserSchema = Joi.object().keys({
  email: email.required(),
  password: password.required(),
});

const loginManagerSchema = Joi.object().keys({
  email: email.required(),
  password: password.required(),
});

const getByIdSchema = Joi.object().keys({
  id: idSchema,
});

const updateCurrentSchema = Joi.object()
  .keys(defaultUserParamsSchema)
  .keys({ id: idSchema });

const createSchema = Joi.object()
  .keys(defaultUserParamsSchema)
  .keys({
    email: email.required(),
    password: password.required(),
    role: user.role,
  });

const updateSchema = Joi.object()
  .keys(defaultUserParamsSchema)
  .keys({
    id: idSchema.required(),
    email: email.optional().empty(''),
    password: password.optional().empty(''),
    role: user.role.empty(''),
    accountStatus: user.accountStatus.empty(''),
  });

const deleteSchema = Joi.object().keys({
  id: idSchema.required(),
});

export default {
  [methods.registration]: reginstrationUserSchema,
  [methods.login]: loginManagerSchema,
  [methods.readById]: getByIdSchema,
  [methods.updateCurrent]: updateCurrentSchema,
  [methods.create]: createSchema,
  [methods.updateById]: updateSchema,
  [methods.deleteById]: deleteSchema,
};
