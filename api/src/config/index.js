export { default as jwt } from './jwt';
export { default as winstonConfig } from './winston';

export const { PORT, DB_STRING_CONNECTION } = process.env;

export const morganConfig = process.env.NODE_ENV === 'development' ? 'dev' : () => {};