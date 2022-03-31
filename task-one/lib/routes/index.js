"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});
// import {getAll,getSingle, createData, updateData, deleteData, checkID, validation} from"../controllers/data"
// router.param("id", checkID);
// router.route("/").get(getAll).post(validation, createData)
// router.route("/:id").get(getSingle).put(validation, updateData).delete(deleteData)
exports.default = router;
