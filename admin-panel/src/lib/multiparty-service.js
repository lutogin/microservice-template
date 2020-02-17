const multiparty = require('multiparty');

class MultipartyService {
  parse(request) {
    const form = new multiparty.Form();
    return new Promise((resolve, reject) => {
      form.on('error', error => reject(error.stack));
      form.on('part', resolve);
      form.parse(request);
    });
  }
}

module.exports = new MultipartyService();
