import { errorResponse } from './helper';

export const validate = (req, res, next) => {
  const { body } = req;

  const dataTypes = ['array', 'object', 'string'];
  const acceptedConditions = ['eq', 'neq', 'gte', 'gt', 'contains'];
  

  if (!Object.keys(body).length) {
    return res.status(400).json(errorResponse('Invalid JSON payload passed.'));
  }
  if (!body.rule && !body.data) {
    return res.status(400).json(errorResponse('The rule and data fields are required.'));
  }
  if (!body.rule) {
    return res.status(400).json(errorResponse('rule is required.'));
  }
  if (!body.data) {
    return res.status(400).json(errorResponse('data is required.'));
  }
  if (!body.rule.field) {
    return res.status(400).json(errorResponse('field is required.'));
  }
  if (!body.rule.condition) {
    return res.status(400).json(errorResponse('condition is required.'));
  }
  if (!body.rule.condition_value) {
    return res.status(400).json(errorResponse('condition_value is required.'));
  }
  if(!acceptedConditions.includes(body.rule.condition)) {
    return res.status(400).json(errorResponse(`condition should be any of ${acceptedConditions}.`));
  }
  if (typeof body.rule !== 'object' || Array.isArray(body.rule)) {
    return res.status(400).json(errorResponse('rule should be an object.'));
  }

  const dataType = Array.isArray(body.data) ? 'array' : typeof body.data;
  if (!dataTypes.includes(dataType)) {
    return res.status(400).json(errorResponse('data should be an array | object | string.'));
  }

  return next();
}