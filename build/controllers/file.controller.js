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
const file_service_1 = __importDefault(require("../services/file.service"));
const { create, findOne, findAll } = new file_service_1.default();
class DriverController {
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                if (!file) {
                    return res.status(403).send({
                        success: false,
                        message: "No file provided."
                    });
                }
                const base64Data = file.buffer.toString('base64');
                const uploadedFile = yield create({
                    name: `${file.originalname}-${Date.now()}`,
                    fileData: base64Data,
                    userId: req.user._id
                });
                return res.status(201).send({
                    success: true,
                    message: "File uploaded successfully",
                    data: uploadedFile
                });
            }
            catch (error) {
                return res.status(500).send({
                    success: false,
                    message: `Error uploading file: ${error.message}`
                });
            }
        });
    }
    getFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const file = yield findOne({ _id });
                if (!file) {
                    return res.status(404).send({
                        success: false,
                        message: "File not found"
                    });
                }
                return res.status(200).send({
                    success: true,
                    message: "File fetched succesfully",
                    data: file
                });
            }
            catch (error) {
                return res.status(500).send({
                    success: false,
                    message: `Error fetching file: ${error.message}`
                });
            }
        });
    }
    getFiles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const files = yield findAll();
                return res.status(200).send({
                    success: true,
                    message: "Files fetched succesfully",
                    data: files
                });
            }
            catch (error) {
                return res.status(500).send({
                    success: false,
                    message: `Error fetching files: ${error.message}`
                });
            }
        });
    }
}
exports.default = DriverController;
