export const parseDotNotation = object => {
  const newObject = {};
  const keys = Object.keys(object);
  let flag = false;

  const simpleKeys = keys.filter(key => !key.match(/.\../));
  simpleKeys.forEach(key => {
    newObject[key] = object[key];
  });

  const complexKeys = keys.filter(key => key.match(/.\../));
  const complexFields = complexKeys.reduce((acc, complexKey) => {
    const [key1, ...restKeys] = complexKey.split(/\./);
    const key2 = restKeys.join('.');
    acc[key1] = acc[key1] || {};
    acc[key1][key2] = object[complexKey];
    if (key2.match(/.\../)) {
      flag = true;
    }
    return acc;
  }, {});
  const complexFieldsKeys = Object.keys(complexFields);

  complexFieldsKeys.forEach(key => {
    newObject[key] = complexFields[key];
  });

  const parsedObject = flag
    ? Object.keys(newObject).reduce((acc, key) => {
        if (newObject[key] instanceof Object && !(newObject[key] instanceof Date)) {
          acc[key] = parseDotNotation(newObject[key]);
        }
        return acc;
      }, newObject)
    : newObject;

  return parsedObject;
};

export const parseDotNotationArray = array => array.map(parseDotNotation);
