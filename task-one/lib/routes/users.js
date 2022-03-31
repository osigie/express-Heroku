"use strict";
// import express, {Request, Response, NextFunction} from"express";
// const router = express.Router();
/* GET users listing. */
// router.get("/", function (req: Request, res: Response, next: NextFunction) {
//   res.send("respond with a resource");
// });
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// /* GET home page. */
// router.get("/", function (req:Request, res:Response, next:NextFunction) {
//   res.render("index", { title: "Express" });
// });
const dataControllers_1 = require("../controllers/dataControllers");
router.param("id", dataControllers_1.checkID);
router.route("/").get(dataControllers_1.getAll).post(dataControllers_1.validation, dataControllers_1.createData);
router.route("/:id").get(dataControllers_1.getSingle).put(dataControllers_1.updateData).delete(dataControllers_1.deleteData);
exports.default = router;
// export default  router;
