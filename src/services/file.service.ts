import { FilterQuery } from "mongoose";

import IFile from "../interfaces/file.interface";
import File from "../models/file.model";


export default class FileService {
    async create(data: any) {
        return await File.create(data);
    }

    async findOne(query: FilterQuery<IFile>) {
        return await File.findOne(query);
    }

    async findAll() {
        return await File.find();
    }
}
