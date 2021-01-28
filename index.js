function equator(condition, conditionValue, fieldValue) {
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
  return fieldValue;
}

function objectHandler(condition, conditionValue, data, fieldRef) {
  if(!data[fieldRef[0]]) {
    return 'Ref not found'
  }

  if (fieldRef.length === 1) {
    const res = equator(condition, conditionValue, data[fieldRef[0]]);
    console.log(res)
  }

  if (fieldRef.length === 2) {
    if (data[fieldRef[0]][fieldRef[1]]) {
      const res = equator(condition, conditionValue, data[fieldRef[0]][fieldRef[1]]);
      console.log(res)
    } else {
      return 'Second level Ref not found'
    }
  }
}

function arrayHandler(condition, conditionValue, data, fieldRef) {
  if (data.length <= 0) {
    // move this to validation middleware
    return 'Empty Array'
  }

  const fieldValue = data[fieldRef[0]];
  if (!fieldValue) {
    return 'field value is missing from data'
  }

  const res = equator(condition, conditionValue, data, fieldValue);
  console.log(res);
}

function ruleValidator(payload) {
  // data and rule are required, validation to be handled by validation middleware scripts
  const { data } = payload;
  const { rule: { field, condition, condition_value } } = payload;
  const fieldRef = field.split('.');

  
  const dataType = Array.isArray(data)? 'array' : typeof data;

  if (fieldRef.length > 2) {
    return 'More than 2 levels of nesting'
  }

  if (dataType === 'string') {
    const fieldValue = data[fieldRef[0]];
    const res = equator(condition, condition_value, fieldValue);
    console.log(res)
  }

  if (dataType === 'object') {
    objectHandler(condition, condition_value, data, fieldRef);
  }

  if (dataType === 'array') {
    arrayHandler(condition, condition_value, data, fieldRef)
  } 
}

const payload = {
  "rule": {
    "field": "missions",
    "condition": "neq",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": 31
  }
}

const stringPayload = {
  "rule": {
    "field": "0",
    "condition": "eq",
    "condition_value": "a"
  },
  "data": "damien-marley"
}

const payload2 = {
  "rule": {
    "field": "missions.carry",
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": {
      "carry": 45
    }
  }
}

const arrayPayload = {
  "rule": {
    "field": "3",
    "condition": "contains",
    "condition_value": "Tycho"
  },
  "data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
}


// ruleValidator(payload);
// ruleValidator(payload2);
// ruleValidator(stringPayload)
ruleValidator(arrayPayload);