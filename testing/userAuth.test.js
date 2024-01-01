const request = require("supertest");
require("dotenv").config();
const port = process.env.PORT || 8080;
const app = `http://localhost:${port}`;

// describe("POST /api/user/signup", () => {
//   it("Return success message and accessToken", async () => {
//     const response = await request(app)
//       .post("/api/user/signup")
//       .send({
//         name: "Sandeep",
//         email: "sandeep1115@gmail.com",
//         password: "password",
//         phone: "9521873450",
//       })
//       .expect(200);
//     console.log("res", response._body);
//     const body = response._body;
//     expect(body.success).toBe(undefined);
//     expect(typeof body.info).toBe("undefined");
//   });
// });

// describe("POST /api/user/login", () => {
//     it("Return success message and accessToken", async () => {
//       const response = await request(app)
//         .post("/api/user/login")
//         .send({
//           email: "sandeep1115@gmail.com",
//           password: "password",
//         })
//         .expect(200);
//       console.log("res", response._body);
//       const body = response._body;
//       expect(body.success).toBe(undefined);
//       expect(typeof body.info).toBe("undefined");
//     });
//   });
  
