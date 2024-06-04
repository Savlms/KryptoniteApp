import { Request, Response } from "express";

import File from "../services/file.service";
import AuthRequest from "../interfaces/auth.interface";

const {
    create,
    findOne,
    findAll
} = new File();


export default class DriverController {

    async uploadFile(req: Request, res: Response) {
        try {
            const file = req.file;
            if (!file) {
                return res.status(403).send({
                    success: false,
                    message: "No file provided."
                });
            }

            const base64Data = file.buffer.toString('base64');
            const uploadedFile = await create({
                name: `${file.originalname}-${Date.now()}`,
                fileData: base64Data,
                userId: (req as AuthRequest).user._id
            })

            return res.status(201).send({
                success: true,
                message: "File uploaded successfully",
                data: uploadedFile
            });

        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: `Error uploading file: ${error.message}`
            });
        }
    }

    async getFile(req: Request, res: Response) {
        try {
            const _id = req.params.id;

            const file = await findOne({ _id });
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

        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: `Error fetching file: ${error.message}`
            });
        }
    }

    async getFiles(req: Request, res: Response) {
        try {
            const _id = req.params.id;

            const files = await findAll();

            return res.status(200).send({
                success: true,
                message: "Files fetched succesfully",
                data: files
            });

        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: `Error fetching files: ${error.message}`
            });
        }
    }
}