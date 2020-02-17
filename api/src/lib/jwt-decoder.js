import jwt from 'jsonwebtoken';
import configJwt from '../config/jwt';
import { AuthorizationError } from './errors';

const { JWT_SECRET: secret } = configJwt;

const jwtDecoder = token => {
  const promise = new Promise((resolve, reject) =>
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        reject(new AuthorizationError('Invalid token.'));
      } else {
        resolve(decoded);
      }
    }),
  );
  return promise;
};

export default jwtDecoder;
