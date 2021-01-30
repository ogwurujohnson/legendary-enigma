export const responseHandler = ({ message, status, data }) => {
  return {
    message,
    status,
    data,
  }
}

export const errorResponse = (message) => {
  return responseHandler({
    message,
    status: 'error',
    data: null
  })
}

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

const objectHandler = (condition, conditionValue, data, fieldRef, field) => {
  // check if data exists
  if(!data[fieldRef[0]]) {
    const resData = {
      message: `field ${field} is missing from data.`,
      status: 'error',
      data: null
    }

    const response = responseHandler(resData);
    return response;
  }

  if (fieldRef.length === 1) {
    const res = equator(condition, conditionValue, data[fieldRef[0]]);
    const resData = {
      message: res ? `field ${field} successfully validated.` : `field ${field} failed validation.`,
      status: res ? 'success' : 'error',
      data: {
        validation: {
          error: !res,
          field,
          field_value: data[fieldRef[0]],
          condition,
          condition_value: conditionValue
        }
      }
    }

    const response = responseHandler(resData);
    return response;
  }

  if (fieldRef.length === 2) {
    if (data[fieldRef[0]][fieldRef[1]]) {
      const res = equator(condition, conditionValue, data[fieldRef[0]][fieldRef[1]]);
      const resData = {
        message: res ? `field ${field} successfully validated.` : `field ${field} failed validation.`,
        status: res ? 'success' : 'error',
        data: {
          validation: {
            error: !res,
            field,
            field_value: data[fieldRef[0]][fieldRef[1]],
            condition,
            condition_value: conditionValue
          }
        }
      }
  
      const response = responseHandler(resData);
      return response;
    } else {
      // check if data exists
      const resData = {
        message: `field ${field} is missing from data.`,
        status: 'error',
        data: null
      }
  
      const response = responseHandler(resData);
      return response;
    }
  }
}

const arrayHandler = (condition, conditionValue, data, fieldRef, field) => {
  if (data.length <= 0) {
    // move this to validation middleware
    return 'Empty Array'
  }

  const fieldValue = data[fieldRef[0]];
  if (!fieldValue) {
    const resData = {
      message: `field ${field} is missing from data.`,
      status: 'error',
      data: null
    }

    const response = responseHandler(resData);
    return response;
  }

  const res = equator(condition, conditionValue, fieldValue);
  const resData = {
    message: res ? `field ${field} successfully validated.` : `field ${field} failed validation.`,
    status: res ? 'success' : 'error',
    data: {
      validation: {
        error: !res,
        field,
        field_value: fieldValue,
        condition,
        condition_value: conditionValue
      }
    }
  }

  const response = responseHandler(resData);
  return response;
}

export const ruleValidator = (payload) => {
  const { data, rule: { field, condition, condition_value } } = payload;
  const fieldRef = field.split('.');

  const dataType = Array.isArray(data) ? 'array' : typeof data;

  if (fieldRef.length > 2) {
    const resData = {
      message: `more than 2 layers in field.`,
      status: 'error',
      data: null
    }

    const response = responseHandler(resData);
    return response;
  }

  if (dataType === 'string') {
    const fieldValue = data[fieldRef[0]];
    // check if data exists
    if (!fieldValue) {
      const resData = {
        message: `field ${field} is missing from data.`,
        status: 'error',
        data: null
      }
  
      const response = responseHandler(resData);
      return response;
    }

    const res = equator(condition, condition_value, fieldValue);
    const resData = {
      message: res ? `field ${field} successfully validated.` : `field ${field} failed validation.`,
      status: res ? 'success' : 'error',
      data: {
        validation: {
          error: !res,
          field,
          field_value: fieldValue,
          condition,
          condition_value
        }
      }
    }

    const response = responseHandler(resData);
    return response;
  }

  if (dataType === 'object') {
    const res = objectHandler(condition, condition_value, data, fieldRef, field);
    return res;
  }

  if (dataType === 'array') {
    const res = arrayHandler(condition, condition_value, data, fieldRef, field);
    return res;
  }
}