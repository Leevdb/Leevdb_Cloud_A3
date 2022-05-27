// test server based stuff
// this is where you can test the server base end points and make sure they are working

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// the better idea is to write the test FIRST and then write the code to make sure it works
// this is called TDD (Test Driven Development)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// @ts-ignore
import supertest from "supertest";
import app from "../../src/server";

const request = supertest(app);

// describe what area we are testing
describe("server tests", () => {
  // describe the sub area we are testing
  describe("Good Tests! 200 response", () => {
    // describe the test we are going to run
    it("should return a 200 response", async () => {
      const response = await request.get("/");
      expect(response.status).toBe(200);
    });
  });

  // describe ANOTHER sub area we are testing
  describe("Bad Tests! 40x response", () => {
    // describe the test we are going to run
    it("should return a 404 response", async () => {
      const response = await request.get("/not-found");
      expect(response.status).toBe(404);
    });
  });
});
