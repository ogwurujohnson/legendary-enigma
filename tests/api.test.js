import request from "supertest";
import app from "../src/app";

describe("GET /", () => {
    it("should return 200 OK", () => {
        return request(app).get("/")
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toBe('My Rule-Validation API');
            expect(res.body.status).toBe('success');
            expect(res.body.data.name).toBe('Johnson Ogwuru');
          })
    });
});

describe("GET /random-url", () => {
  it("should return 404", (done) => {
      request(app).get("/reset")
          .expect(404, done);
  });
});