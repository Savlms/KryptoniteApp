import { Request, Response } from 'express';

import authRoute from "./auth.route";
import userRoute from "./user.route";
import apiKeyRoute from "./apiKey.route";
import fileRoute from "./file.route";
import { BASEPATH } from '../configs/constants.config';


export default (app: any) => {
    app.use(`${BASEPATH}/auth`, authRoute);
    app.use(`${BASEPATH}/user`, userRoute);
    app.use(`${BASEPATH}/api-key`, apiKeyRoute);
    app.use(`${BASEPATH}/file`, fileRoute);
    app.use(`${BASEPATH}/`, (_req: Request, res: Response) => {
        res.send("Welcome to Krptonite API");
    });
    app.use("/", (_req: Request, res: Response) => {
        res.redirect(`${BASEPATH}`);
    });
};