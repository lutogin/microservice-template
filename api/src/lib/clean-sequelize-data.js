function cleanSequelizeDataObject(object) {
  if (!((object instanceof Object && !(object instanceof Date)) || object instanceof Array)) {
    return object;
  }

  const data = (object.get && object.get()) || object;

  return Object.keys(data).reduce((acc, key) => {
    if (key[0] === '_') {
      return acc;
    }

    if (
      (data[key] instanceof Object && !(data[key] instanceof Date)) ||
      data[key] instanceof Array
    ) {
      // eslint-disable-next-line no-use-before-define
      acc[key] = cleanSequelizeData(data[key]);
    } else {
      acc[key] = data[key];
    }
    return acc;
  }, {});
}

function cleanSequelizeData(data) {
  return data instanceof Array
    ? data.map(cleanSequelizeDataObject)
    : cleanSequelizeDataObject(data);
}

export default data => cleanSequelizeData(data);
