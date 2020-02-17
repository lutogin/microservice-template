import logger from '@logger';

const errors = [
  {
    pattern: /^Parameter Error. "email" with value ".+?" fails to match the email pattern$/,
    message: 'Invalid email address',
  },
  {
    pattern: /^Incorrect authentication data$/,
    message: 'Wrong credentials',
  },
];

class ErrorHandler {
  getTextMessage = ({ message }) => {
    const [matchedError] = errors.filter(({ pattern }) =>
      pattern.test(message),
    );
    if (matchedError) {
      return matchedError.message;
    }

    logger.warn(`Unknown error: ${message}`);

    return message;
  };
}
export default new ErrorHandler();
