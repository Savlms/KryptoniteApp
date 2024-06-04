import express from 'express';

import FileController from '../controllers/file.controller';
import { authenticateForFiles } from '../middlewares/authentication.middleware';
import upload from '../configs/multer.configs';

const {
    uploadFile,
    getFile,
    getFiles
} = new FileController();
const router = express.Router();


//Routes for Supergirl's access without authentication
//get a file
router.get("/supergirl/:id", getFile);

//get all files
router.get("/supergirl", getFiles);

//Regular routes with authentication
//upload file
router.post("/", upload.single('file'), authenticateForFiles, uploadFile);

//get a file
router.get("/:id", authenticateForFiles, getFile);

//get all files
router.get("/", authenticateForFiles, getFiles);

export default router;