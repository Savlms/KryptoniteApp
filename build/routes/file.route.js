"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_controller_1 = __importDefault(require("../controllers/file.controller"));
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const multer_configs_1 = __importDefault(require("../configs/multer.configs"));
const { uploadFile, getFile, getFiles } = new file_controller_1.default();
const router = express_1.default.Router();
//Routes for Supergirl's access without authentication
//get a file
router.get("/supergirl/:id", getFile);
//get all files
router.get("/supergirl", getFiles);
//Regular routes with authentication
//upload file
router.post("/", multer_configs_1.default.single('file'), authentication_middleware_1.authenticateForFiles, uploadFile);
//get a file
router.get("/:id", authentication_middleware_1.authenticateForFiles, getFile);
//get all files
router.get("/", authentication_middleware_1.authenticateForFiles, getFiles);
exports.default = router;
