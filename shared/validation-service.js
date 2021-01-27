const ValidationService = {
  validate(schema, data) {
    return _validate(schema, data);
  },
  validateProperty(input, schema, data) {
    const errors = _validate(schema, data);
    const error = errors ? errors[input["name"]] : null;
    return error;
  },
};

const _validate = (schema, data) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (!error) return null;
  let errors = {};
  for (let item of error.details) errors[item.path[0]] = item.message;
  return errors;
};

export default ValidationService;
