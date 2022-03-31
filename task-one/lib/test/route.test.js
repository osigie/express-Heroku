"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const helper_1 = require("./helper");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, helper_1.deleteFile)();
}));
describe('GET API TESTS', () => {
    test('gets no todo if database.json file does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/datas");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            status: "succes",
            data: {
                dB: [],
            },
        });
    }));
    test('gets todos if there are todos in database.json file', () => __awaiter(void 0, void 0, void 0, function* () {
        const sampleTodo = { title: 'test', content: 'my very first todo' };
        yield (0, supertest_1.default)(app_1.default).post("/api/datas").send(sampleTodo);
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/datas");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            status: "succes",
            data: {
                dB: sampleTodo,
            },
        });
    }));
});
// describe("PUT /datas", function () {
//   test("Respond with right status code", async () => {
//     await request(app).put("/api/datas/1").expect(201);
//   });
// });
// describe("Delete /datas", function () {
//   test("Respond with right status code", async () => {
//     await request(app).delete("/api/datas/1").expect(201);
//   });
// });
// describe("GET /datas", function () {
//   test("Respond with right status code for all data", async () => {
//     await request(app).get("/api/datas").expect(200);
//   });
//   test("Respond with right status code for single data", async () => {
//     await request(app).get("/api/datas/1").expect(200);
//   });
// });
// .send({
//   organization: "node ninja",
//   createdAt: "2022-03-30T00:31:03.849Z",
//   updatedAt: "2022-03-30T00:32:28.856Z",
//   products: ["developers", "pizza"],
//   marketValue: "90%",
//   address: "sangotedo",
//   ceo: "cn",
//   country: "Taiwan",
//   id: 1,
//   noOfEmployees: 2,
//   employees: ["james bond"],
// })
// describe("POST /users",  function () {
//   it("responds with json", function (done) {
//     request(app)
//       .post("/api/datas")
//       .send({
//         organization: "node ninja",
//         createdAt: "2022-03-30T00:31:03.849Z",
//         updatedAt: "2022-03-30T00:32:28.856Z",
//         products: ["developers", "pizza"],
//         marketValue: "90%",
//         address: "sangotedo",
//         ceo: "cn",
//         country: "Taiwan",
//         id: 1,
//         noOfEmployees: 2,
//         employees: ["james bond"],
//       })
//       .expect(201);
//   });
// });
// describe("GET /user", function () {
//   it("responds with json", function (done) {
//     request(app)
//       .get("/api/datas")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200, done);
//   });
//   it("responds with json for single data", function (done) {
//     request(app)
//       .get("/api/datas/3")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200, done);
//   });
// });
