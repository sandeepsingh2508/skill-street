const request = require("supertest");
require("dotenv").config();
const port = process.env.PORT || 8080;
const app = `http://localhost:${port}`;

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTJhNjRiN2E5YzMwY2IxZjQxZjRlMyIsImlhdCI6MTcwNDExMTQ5NywiZXhwIjoxNzA2NzAzNDk3fQ.LB2VFqlMURC817hc0dScYUP9diiEPXIZjRmp7fjbzqw";

//create notes
describe("POST /api/notes/create", () => {
  it("responds with json", async () => {
    const response = await request(app)
      .post("/api/notes/create")
      .set("Accept", "application/json")
      .set("Authorization", `${accessToken}`)
      .send({
        title: "population",
        content: "high population is a big problem",
      })
      .expect("Content-Type", /json/)
      .expect(200);
    console.log("res:", response._body);
    const body = response._body;
    expect(body.success).toBe(undefined);
    expect(typeof body.error).toBe("undefined");
  });
});

//update notes
describe("PUT /api/notes/update/:notesId", () => {
    it("responds with json", async () => {
      const notesId = "6592b1f9b40d0a41184173a4";
      const response = await request(app)
        .put(`/api/notes/update/${notesId}`)
        .set("Accept", "application/json")
        .set("Authorization", `${accessToken}`)
        .send({
          content: "high population is a big problem in this world",
        })
        .expect("Content-Type", /json/)
        .expect(200);
      console.log("res:", response.body);
      const body = response.body;
      expect(body.success).toBe(undefined);
      expect(body.error).toBeUndefined();
    });
  });
 
 //get single notes
 describe("GET /api/notes/getsinglenotes/:notesId", () => {
    it("responds with json", async () => {
      const notesId = "6592b1f9b40d0a41184173a4";
      const response = await request(app)
        .get(`/api/notes/getsinglenotes/${notesId}`)
        .set("Accept", "application/json")
        .set("Authorization", `${accessToken}`)
        .expect("Content-Type", /json/)
        .expect(200);
      console.log("res:", response.body);
      const body = response.body;
      expect(body.success).toBe(undefined);
      expect(body.error).toBeUndefined();
    });
  });
  

  //delete notes
  describe("DELETE /api/notes/delete/:notesId", () => {
    it("responds with json", async () => {
      const notesId = "6592b54c8b811bcf9df1ba2a";
      const response = await request(app)
        .delete(`/api/notes/delete/${notesId}`)
        .set("Accept", "application/json")
        .set("Authorization", `${accessToken}`)
        .expect("Content-Type", /json/)
        .expect(200);
      console.log("res:", response.body);
      const body = response.body;
      expect(body.success).toBe(undefined);
      expect(body.error).toBeUndefined();
    });
  });
  
  
  
  