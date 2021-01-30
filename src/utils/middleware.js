import { errorResponse, responseMessages } from './helper';

export const validate = (req, res, next) => {
  const { body } = req;

  const dataTypes = ['array', 'object', 'string'];
  const acceptedConditions = ['eq', 'neq', 'gte', 'gt', 'contains'];
  

  if (!Object.keys(body).length) {
    return res.status(400).json(errorResponse(responseMessages.INVALID_JSON));
  }
  if (!body.rule && !body.data) {
    return res.status(400).json(errorResponse(responseMessages.REQUIRED_RULE_DATA));
  }
  if (!body.rule) {
    return res.status(400).json(errorResponse(responseMessages.REQUIRED_RULE));
  }
  if (!body.data) {
    return res.status(400).json(errorResponse(responseMessages.REQUIRED_DATA));
  }
  if ((Object.keys(body.rule).length !== 0) && !body.rule.field) {
    return res.status(400).json(errorResponse(responseMessages.REQUIRED_FIELD));
  }
  if ((Object.keys(body.rule).length !== 0) && !body.rule.condition) {
    return res.status(400).json(errorResponse(responseMessages.REQUIRED_CONDITION));
  }
  if ((Object.keys(body.rule).length !== 0) && !body.rule.condition_value) {
    return res.status(400).json(errorResponse(responseMessages.REQUIRED_CON_VALUE));
  }
  if((Object.keys(body.rule).length !== 0) && !acceptedConditions.includes(body.rule.condition)) {
    return res.status(400).json(errorResponse(responseMessages.ACCEPTED_CONDITION));
  }
  if (typeof body.rule !== 'object' || Array.isArray(body.rule)) {
    return res.status(400).json(errorResponse(responseMessages.RULE_TYPE_ERROR));
  }

  const dataType = Array.isArray(body.data) ? 'array' : typeof body.data;
  if (!dataTypes.includes(dataType)) {
    return res.status(400).json(errorResponse(responseMessages.DATA_TYPE_ERROR));
  }

  return next();
}