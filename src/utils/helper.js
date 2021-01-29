const equator = (condition, conditionValue, fieldValue) => {
  switch(condition) {
    case 'eq':
      return fieldValue === conditionValue
    case 'neq':
      return fieldValue !== conditionValue
    case 'gt':
      return fieldValue > conditionValue
    case 'gte':
      return fieldValue >= conditionValue
    case 'contains': //use includes here, work for both arrays and strings
      return fieldValue.includes(conditionValue)
  }
}

const objectHandler = (condition, conditionValue, data, fieldRef) => {
  if(!data[fieldRef[0]]) {
    return 'Ref not found'
  }

  if (fieldRef.length === 1) {
    const res = equator(condition, conditionValue, data[fieldRef[0]]);
    return res;
  }

  if (fieldRef.length === 2) {
    if (data[fieldRef[0]][fieldRef[1]]) {
      const res = equator(condition, conditionValue, data[fieldRef[0]][fieldRef[1]]);
      return res;
    } else {
      return 'Second level Ref not found'
    }
  }
}

const arrayHandler = (condition, conditionValue, data, fieldRef) => {
  if (data.length <= 0) {
    // move this to validation middleware
    return 'Empty Array'
  }

  const fieldValue = data[fieldRef[0]];
  if (!fieldValue) {
    return 'field value is missing from data'
  }

  const res = equator(condition, conditionValue, fieldValue);
  return res;
}

export const ruleValidator = (payload) => {
  const { data, rule: { field, condition, condition_value } } = payload;
  const fieldRef = field.split('.');

  const dataType = Array.isArray(data) ? 'array' : typeof data;

  if (fieldRef.length > 2) {
    return {
      message: 'More than 2 levels of nesting'
    }
  }

  if (dataType === 'string') {
    const fieldValue = data[fieldRef[0]];
    const res = equator(condition, condition_value, fieldValue);
    return {
      res
    }
  }

  if (dataType === 'object') {
    const res = objectHandler(condition, condition_value, data, fieldRef);
    return {
      res
    }
  }

  if (dataType === 'array') {
    const res = arrayHandler(condition, condition_value, data, fieldRef);
    return {
      res
    }
  }
}