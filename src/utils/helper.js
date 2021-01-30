export const sampleData = {
  stringData: {
    "rule": {
      "field": "0",
      "condition": "eq",
      "condition_value": "a"
    },
    "data": "damien-marley"
  },
  fieldNotInData: {
    "rule": {
      "field": "13",
      "condition": "eq",
      "condition_value": "a"
    },
    "data": "damien-marley"
  },
  arrayData: {
    "rule": {
      "field": "3",
      "condition": "contains",
      "condition_value": "Tycho"
    },
    "data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
  },
  objectData: {
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
  },
  failedObjectData: {
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
        "carry": 22
      }
    }
  },
  wrongObjectData: {
    "rule": {
      "field": "missions.carry",
      "condition": "gte",
      "condition_value": 30
    },
    "data": 9
  },
  wrongRuleType: {
    "rule": [],
    "data": "damien-marley"
  },
  missingRuleProperty: {
    "rule": {
      "field": "0",
      "condition_value": "a"
    },
    "data": "damien-marley"
  },
  missingRuleField : {
    "data": "damien-marley"
  },
  missingDataField: {
    "rule": {
      "field": "0",
      "condition": "eq",
      "condition_value": "a"
    },
  },
}

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

export const basicResponse = ({ message, status, rule, fieldValue }) => {
  return responseHandler({
    message,
    status,
    data: {
      validation: {
        error: status === 'error',
        field: rule.field,
        field_value: fieldValue,
        condition: rule.condition,
        condition_value: rule.condition_value
      }
    }
  })
}

export const responseMessages = {
  INVALID_JSON: 'Invalid JSON payload passed.',
  REQUIRED_RULE_DATA: 'The rule and data fields are required.',
  REQUIRED_RULE: 'rule is required.',
  REQUIRED_DATA: 'data is required.',
  REQUIRED_FIELD: 'field is required.',
  REQUIRED_CONDITION: 'condition is required.',
  REQUIRED_CON_VALUE: 'condition_value is required.',
  ACCEPTED_CONDITION: 'condition should be any of, eq | neq | gte | gt | contains .',
  RULE_TYPE_ERROR: 'rule should be an object.',
  DATA_TYPE_ERROR: 'data should be an array | object | string.',
  EMPTY_DATA_ARRAY: 'data should not be empty.',
  MORE_THAN_TWO_LAYERS: 'more than 2 layers in field.',
  MISSING_FIELD: (field) => `field ${field} is missing from data.`,
  SUCCESSFUL_VALIDATION: (field) => `field ${field} successfully validated.`,
  FAILED_VALIDATION: (field) => `field ${field} failed validation.`,
}

export const equator = (condition, conditionValue, fieldValue) => {
  switch(condition) {
    case 'eq':
      return fieldValue === conditionValue
    case 'neq':
      return fieldValue !== conditionValue
    case 'gt':
      return fieldValue > conditionValue
    case 'gte':
      return fieldValue >= conditionValue
    case 'contains':
      return fieldValue.includes(conditionValue)
  }
}

