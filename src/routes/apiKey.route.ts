import express from 'express';

import ApiKeyController from '../controllers/apiKey.controller';
import authenticate from '../middlewares/authentication.middleware';

const {
    generateApiKey,
    invalidateApiKey
} = new ApiKeyController();
const router = express.Router();


//generate apiKey
router.post("/", authenticate, generateApiKey);

//invalidate apiKey
router.patch("/", authenticate, invalidateApiKey);

export default router;