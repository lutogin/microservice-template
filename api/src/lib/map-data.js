export const filterFieldsObject = (object, fields) =>
  fields.reduce((acc, field) => {
    acc[field] = object[field];
    return acc;
  }, {});

export const filterFieldsArray = (data, fields) =>
  data.map(object => filterFieldsObject(object, fields));

export const filterFields = (object, fields) =>
  object instanceof Array ? filterFieldsArray(object, fields) : filterFieldsObject(object, fields);

export const mapOnlyObject = (object, options) =>
  Object.keys(options).reduce((acc, key) => {
    acc[options[key]] = object[key];
    return acc;
  }, {});

export const mapOnlyArray = (data, options) => data.map(object => mapOnlyObject(object, options));

export const remapObject = (object, options) => {
  const wrongKeys = Object.keys(options);
  const oldFields = filterFieldsObject(
    object,
    Object.keys(object).filter(key => wrongKeys.indexOf(key) === -1),
  );
  return { ...oldFields, ...mapOnlyObject(object, options) };
};

export const remapArray = (data, options) => data.map(object => remapObject(object, options));
