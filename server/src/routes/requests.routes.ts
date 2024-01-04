import {Router} from 'express';
import { protectedRequest, publicRequest } from '../controllers/requests.controller';
import { checkJwtMiddleware } from '../middlewares/checkJwt.middleware';
import { createUser, deleteUserById, getUserByEmailParams } from '../controllers/user.controller';

export const requestRouter = Router()

requestRouter.get("/public", publicRequest)
requestRouter.get("/protected", checkJwtMiddleware, protectedRequest)
requestRouter.post('/public', createUser)
requestRouter.get('/public/:email', getUserByEmailParams)
requestRouter.delete('/public/:email', deleteUserById)