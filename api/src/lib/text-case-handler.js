class TextCaseHandler {
  stringToUnderscoreCase = string =>
    string
      .replace(/([A-Z])/g, m => `_${m.toLowerCase()}`)
      .replace(/((\d+))/, '_$1_')
      .replace(/(_$)/, '');

  objectToUnderscoreCase = object => {
    const keys = Object.keys(object);
    const newKeys = keys.map(this.stringToUnderscoreCase);
    const result = keys.reduce((acc, key, index) => {
      acc[newKeys[index]] = object[key];
      return acc;
    }, {});
    return result;
  };

  toUnderscoreCase = data => {
    if (!data) {
      return data;
    }
    if (typeof data === 'string' || data instanceof String) {
      return this.stringToUnderscoreCase(data);
    }
    if (data instanceof Array) {
      return data.map(this.objectToUnderscoreCase);
    }
    return this.objectToUnderscoreCase(data);
  };

  objectToCamelCase = object =>
    Object.keys(object).reduce((acc, key) => {
      const newKey = key
        .split('_')
        .filter(part => part)
        .map(part => part.replace(/^./, part[0].toUpperCase()))
        .join('')
        .replace(/^./, key[0].toLowerCase());

      if (object[key] instanceof Object && !(object[key] instanceof Date)) {
        acc[newKey] = this.toCamelCase(object[key]);
        return acc;
      }
      acc[newKey] = object[key];
      return acc;
    }, {});

  toCamelCase = data =>
    data &&
    (data instanceof Array ? data.map(this.objectToCamelCase) : this.objectToCamelCase(data));
}

export default new TextCaseHandler();
