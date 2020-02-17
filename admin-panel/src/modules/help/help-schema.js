import Joi from 'joi';

const accessTokenSchema = Joi.string().required();
const emailSchema = Joi.string()
  .regex(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    'email',
  )
  .lowercase();

// eslint-disable-next-line import/prefer-default-export
export const renderHelpPageSchema = Joi.object().keys({
  currentEmail: emailSchema,
  accessToken: accessTokenSchema,
});
