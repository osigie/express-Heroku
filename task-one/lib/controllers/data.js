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
exports.validation = exports.checkID = exports.deleteData = exports.updateData = exports.createData = exports.getSingle = exports.getAll = void 0;
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const pathOfData = "Database/dataBase.json";
let isExit = fs_1.default.existsSync(pathOfData);
if (!isExit) {
    function createFileImmediately() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield promises_1.default.writeFile(pathOfData, JSON.stringify([]));
            }
            catch (err) {
                console.error("Error occured while reading directory!", err);
            }
        });
    }
    createFileImmediately();
}
// if (!isExit) {
//   fs.writeFileSync(pathOfData, JSON.stringify([]));
// }
let dB = JSON.parse(fs_1.default.readFileSync(pathOfData, "utf8"));
const getAll = (req, res) => {
    res.status(200).json({
        status: "succes",
        result: dB.length,
        data: {
            dB,
        },
    });
};
exports.getAll = getAll;
const getSingle = (req, res) => {
    const id = Number(req.params.id);
    const singleDb = dB.find((el) => el.id === id);
    res.status(200).json({
        status: "succes",
        data: {
            singleData: singleDb,
        },
    });
};
exports.getSingle = getSingle;
const createData = (req, res) => {
    let id;
    if (dB.length == 0) {
        id = 1;
    }
    else {
        id = dB[dB.length - 1].id + 1;
    }
    const newObj = Object.assign(req.body, { createdAt: new Date().toISOString() }, { updatedAt: new Date().toISOString() }, { id: id });
    dB.push(newObj);
    fs_1.default.writeFile(pathOfData, JSON.stringify(dB, null, 3), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                new: newObj,
            },
        });
    });
};
exports.createData = createData;
const updateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const index = dB.findIndex((p) => p.id === id);
    let sample = Object.assign(Object.assign(Object.assign({}, dB[index]), req.body), { createdAt: dB[index].createdAt, id, updatedAt: new Date().toISOString() });
    dB[index] = sample;
    fs_1.default.writeFile(pathOfData, JSON.stringify(dB, null, 3), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                updated: sample,
            },
        });
    });
});
exports.updateData = updateData;
const deleteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    dB = dB.filter((el) => el.id !== id);
    fs_1.default.writeFile(pathOfData, JSON.stringify(dB, null, 3), (err) => {
        res.status(201).json({
            status: "success",
            msg: "succesfully removed",
        });
    });
});
exports.deleteData = deleteData;
//Creating Middleware for wrong ID
const checkID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!dB.some((el) => el.id === id)) {
        return res.status(404).json({
            status: "failed",
            msg: "invalid ID",
        });
    }
    next();
});
exports.checkID = checkID;
//middleware for validation
const validation = (req, res, next) => {
    if (typeof req.body.organization !== "string" ||
        !Array.isArray(req.body.products) ||
        typeof req.body.address !== "string" ||
        typeof req.body.marketValue !== "string" ||
        typeof req.body.ceo !== "string" ||
        typeof req.body.country !== "string" ||
        typeof req.body.noOfEmployees !== "number" ||
        !Array.isArray(req.body.employees) ||
        typeof req.body.createdAt !== "string" ||
        typeof req.body.updatedAt !== "string" ||
        typeof req.body.id !== "number") {
        return res.status(404).json({
            status: "failed",
            msg: "Please input valid details",
        });
    }
    next();
};
exports.validation = validation;
