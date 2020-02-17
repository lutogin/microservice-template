const path = require('path');

module.exports = {
  webpack: config => {
    const resolve = {
      alias: {
        db: path.join(__dirname, '/src/db.js'),
      },
    };

    return { ...config, resolve };
  },
};
