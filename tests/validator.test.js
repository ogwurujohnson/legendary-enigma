import request from "supertest";
import app from "../src/app";

import { responseMessages, sampleData } from "../src/utils/helper";

describe("POST /validate-rule", () => {
  it("should return 200 OK, successful validation", () => {
      return request(app).post("/validate-rule")
        .send(sampleData.objectData)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body.message).toBe(responseMessages.SUCCESSFUL_VALIDATION(sampleData.objectData.rule.field));
          expect(res.body.status).toBe('success');
        })
  });
  it("should return 400, failed validation", () => {
    return request(app).post("/validate-rule")
      .send(sampleData.failedObjectData)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toBe(responseMessages.FAILED_VALIDATION(sampleData.failedObjectData.rule.field));
        expect(res.body.status).toBe('error');
      })
  });
  it("should return 400, wrong data type for data", () => {
    return request(app).post("/validate-rule")
      .send(sampleData.wrongObjectData)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toBe(responseMessages.DATA_TYPE_ERROR);
        expect(res.body.status).toBe('error');
      })
  });
  it("should return 400, missing rule property", () => {
    return request(app).post("/validate-rule")
      .send(sampleData.missingRuleProperty)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toBe(responseMessages.REQUIRED_CONDITION);
        expect(res.body.status).toBe('error');
      })
  });
  it("should return 400, invalid JSON", () => {
    return request(app).post("/validate-rule")
      .send({})
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toBe(responseMessages.INVALID_JSON);
        expect(res.body.status).toBe('error');
      })
  });
  it("should return 400, missing rule field", () => {
    return request(app).post("/validate-rule")
      .send(sampleData.missingRuleField)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toBe(responseMessages.REQUIRED_RULE);
        expect(res.body.status).toBe('error');
      })
  });
  it("should return 400, missing data field", () => {
    return request(app).post("/validate-rule")
      .send(sampleData.missingDataField)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toBe(responseMessages.REQUIRED_DATA);
        expect(res.body.status).toBe('error');
      })
  });
  it("should return 400, field not in data", () => {
    return request(app).post("/validate-rule")
      .send(sampleData.fieldNotInData)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toBe(responseMessages.MISSING_FIELD(sampleData.fieldNotInData.rule.field));
        expect(res.body.status).toBe('error');
      })
  });
  it("should return 400, rule not an object", () => {
    return request(app).post("/validate-rule")
      .send(sampleData.wrongRuleType)
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toBe(responseMessages.RULE_TYPE_ERROR);
        expect(res.body.status).toBe('error');
      })
  });
});