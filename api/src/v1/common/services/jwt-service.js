import crypto from 'crypto';
import { pick } from 'ramda';
import jwt from 'jsonwebtoken';
import configJwt from '../../../config/jwt';
import { AuthorizationError } from '../../../lib/errors';
import PERMISSIONS from '../constants/permissions';
import userDao from '../../user/user-daos/user-dao';

const { JWT_SECRET } = configJwt;

class JwtService {
  constructor() {
    this.PERMISSIONS = PERMISSIONS;
    this.hashIncludedFieldsForDBQuery = ['auth', 'accountStatus', 'role'];
    this.hashIncludedFieldsForOmit = ['auth', 'accountStatus', 'role'];
    this.verifedTokens = {};
    this.shouldCheckIds = {};

    this.runCleaner();
  }

  generateJwt = (account, role) => {
    console.log(account);
    const payload = {
      hash: this.getUserHash(account),
      id: account.id,
      role,
      accountStatus: account.accountStatus,
    };
    return jwt.sign(payload, JWT_SECRET);
  };

  decoder = token =>
    new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
          reject(new AuthorizationError('Invalid token, please repeat authentication.'));
        } else {
          this.validateTokenData(token, decoded)
            .then(result => {
              if (result) {
                resolve(decoded);
              }

              reject(new AuthorizationError('Invalid token, please repeat authentication.'));
            })
            .catch(reject);
        }
      });
    });

  validateTokenData = async (token, tokenData) => {
    if (
      this.verifedTokens[token] !== undefined &&
      this.shouldCheckIds[tokenData.id] !== tokenData.role
    ) {
      return this.verifedTokens[token];
    }

    const user = await userDao.getWithAuth(
      { id: tokenData.id },
      { attributes: this.hashIncludedFieldsForDBQuery },
    );

    if (!user) {
      throw new AuthorizationError('Invalid token, please repeat authentication.');
    }
    const hash = this.getUserHash(user);

    if (tokenData.hash === hash) {
      this.verifedTokens[token] = true;
      return true;
    }

    this.verifedTokens[token] = false;
    return false;
  };

  invalidateUserTokens = user => {
    this.shouldCheckIds[user.id] = user.role;
  };

  getUserHash = data =>
    crypto
      .createHash('md5')
      .update(JSON.stringify(pick(this.hashIncludedFieldsForOmit, data)))
      .digest('hex');

  runCleaner = () => {
    setInterval(() => {
      this.verifedTokens = {};
      this.shouldCheckIds = {};
    }, 5 * 60 * 1000);
  };
}

export default new JwtService();
