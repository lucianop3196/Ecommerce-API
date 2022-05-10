const validateFields = (objFields, fieldsRequired) => {
  const fields = Object.keys(objFields);
  return fieldsRequired?.reduce((previousValue, currentValue) => {
    if (!fields.includes(currentValue)) previousValue.push(currentValue);
    return previousValue;
  }, []);
};

module.exports = { validateFields };
