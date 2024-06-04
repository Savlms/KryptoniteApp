import express from 'express';

import UserController from '../controllers/user.controller';
import authenticate from '../middlewares/authentication.middleware';

const {
    getUser,
    getUsers
} = new UserController();
const router = express.Router();


//get a user
router.get("/:id", authenticate, getUser);

//get all users
router.get("/", authenticate, getUsers);

export default router;