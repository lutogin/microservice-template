import Joi from 'joi';
import { RequestValidationError } from '../errors';

async function requestValidator(methodValidationRules, request) {
  const { data } = request;

  if (!methodValidationRules) {
    return data;
  }

  try {
    const validatedData = await Joi.validate(data, methodValidationRules);
    return validatedData;
  } catch (error) {
    if (error.isJoi && error.name === 'ValidationError') {
      throw new RequestValidationError(`Parameter Error. ${error.details[0].message}`);
    }
    throw error;
  }
}

export default requestValidator;
