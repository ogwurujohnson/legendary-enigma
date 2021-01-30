import { errorResponse, basicResponse, responseMessages, equator} from './utils/helper';

const objectHandler = (condition, conditionValue, data, fieldRef, field) => {
  // check if data exists
  if(!data[fieldRef[0]]) {
    const response = errorResponse(responseMessages.MISSING_FIELD(field));
    return response;
  }

  if (fieldRef.length === 1) {
    const res = equator(condition, conditionValue, data[fieldRef[0]]);
    return basicResponse({
      message: res ? responseMessages.SUCCESSFUL_VALIDATION(field) : responseMessages.FAILED_VALIDATION(field),
      status: res ? 'success' : 'error',
      rule: { field, condition, condition_value: conditionValue },
      fieldValue: data[fieldRef[0]],
    });
  }

  if (fieldRef.length === 2) {
    if (data[fieldRef[0]][fieldRef[1]]) {
      const res = equator(condition, conditionValue, data[fieldRef[0]][fieldRef[1]]);
      return basicResponse({
        message: res ? responseMessages.SUCCESSFUL_VALIDATION(field) : responseMessages.FAILED_VALIDATION(field),
        status: res ? 'success' : 'error',
        rule: { field, condition, condition_value: conditionValue },
        fieldValue: data[fieldRef[0]][fieldRef[1]],
      });
    } else {
      // if data doesn't exist
      const response = errorResponse(responseMessages.MISSING_FIELD(field));
      return response;
    }
  }
}

const arrayHandler = (condition, conditionValue, data, fieldRef, field) => {
  const fieldValue = data[fieldRef[0]];
  if (!fieldValue) {
    const response = errorResponse(responseMessages.MISSING_FIELD(field));
    return response;
  }

  const res = equator(condition, conditionValue, fieldValue);
  return basicResponse({
    message: res ? responseMessages.SUCCESSFUL_VALIDATION(field) : responseMessages.FAILED_VALIDATION(field),
    status: res ? 'success' : 'error',
    rule: { field, condition, condition_value: conditionValue },
    fieldValue,
  });
}

export const ruleValidator = (payload) => {
  const { data, rule: { field, condition, condition_value } } = payload;
  const fieldRef = field.split('.');

  const dataType = Array.isArray(data) ? 'array' : typeof data;

  if (fieldRef.length > 2) {
    const response = errorResponse(responseMessages.MORE_THAN_TWO_LAYERS);
    return response;
  }

  if (dataType === 'string') {
    const fieldValue = data[fieldRef[0]];
    // check if data exists
    if (!fieldValue) {
      const response = errorResponse(responseMessages.MISSING_FIELD(field));
      return response;
    }

    const res = equator(condition, condition_value, fieldValue);
    return basicResponse({
      message: res ? responseMessages.SUCCESSFUL_VALIDATION(field) : responseMessages.FAILED_VALIDATION(field),
      status: res ? 'success' : 'error',
      rule: { field, condition, condition_value },
      fieldValue,
    });
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