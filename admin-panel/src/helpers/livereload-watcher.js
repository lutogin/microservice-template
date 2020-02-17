const path = require('path');
const livereload = require('livereload'); // eslint-disable-line import/no-extraneous-dependencies

const lrserver = livereload.createServer({ delay: 500 }, () => {
  console.log('Livereload enabled');
});
lrserver.watch(path.resolve(__dirname, '../../build'));
