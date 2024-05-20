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
const src_1 = __importDefault(require("../src"));
const supertest_1 = __importDefault(require("supertest"));
const seed_1 = __importDefault(require("../src/data/seed"));
const db_connection_1 = __importDefault(require("../src/db-connection"));
// beforeEach(()=>{
//  return seed()
// })
// afterAll(()=>{
// 	db.connection.close()
// })
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_connection_1.default)();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, seed_1.default)();
}));
describe("/api", () => {
    test("GET /api - responds with endpoints.json", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default).get("/api").expect(200);
        expect(body.endpoints).toMatchObject({
            "GET /api": {
                description: expect.any(String),
            },
        });
    }));
    //test("", async () => {});
    // test('', async ()=> {
    // })
});
