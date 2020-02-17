import Joi from 'joi';
import USER_GENDERS from '../user/user-constants/user-genders';
import PERMISSIONS from './constants/permissions';
import USER_ACCOUNT_STATUSES from '../user/user-constants/user-account-statuses';

export const idSchema = Joi.number();

// User schemas
export const emailSchema = Joi.string()
  .regex(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    'email',
  )
  .lowercase({ force: true });
export const usernameSchema = Joi.string()
  .min(1)
  .max(255);

export const passwordSchema = Joi.string()
  .lowercase()
  .regex(/^.{64}$/, 'sha256 (hex)');
export const phoneNumberSchema = Joi.string().regex(/^(\d|\+)[\d() -]{4,18}\d$/m, 'phone');
export const genderSchema = Joi.string().valid(Object.values(USER_GENDERS));
export const roleSchema = Joi.string().valid(Object.values(PERMISSIONS));
export const accountStatusSchema = Joi.string().valid(Object.values(USER_ACCOUNT_STATUSES));
export const ageSchema = Joi.number();
export const hobbiesSchema = Joi.array().items(Joi.string());

// News schemas
export const titleSchema = Joi.string();
export const shortDescriptionSchema = Joi.string();
export const descriptionSchema = Joi.string();
export const photoSchema = Joi.string();

export default {
  user: {
    firstName: usernameSchema,
    lastName: usernameSchema,
    phoneNumber: phoneNumberSchema,
    gender: genderSchema,
    age: ageSchema,
    hobbies: hobbiesSchema,
    email: emailSchema,
    role: roleSchema,
    accountStatus: accountStatusSchema,
    auth: {
      password: passwordSchema,
    },
  },
  news: {
    title: titleSchema,
    shortDescription: shortDescriptionSchema,
    description: descriptionSchema,
    photo: photoSchema,
  },
};
