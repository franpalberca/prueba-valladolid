import {Router} from 'express';
import { protectedRequest, publicRequest } from '../controllers/requests.controller';
import { checkJwtMiddleware } from '../middlewares/checkJwt.middleware';
import { createUser } from '../controllers/user.controller';

export const requestRouter = Router()

requestRouter.get("/public", publicRequest)
requestRouter.get("/protected", checkJwtMiddleware, protectedRequest)
requestRouter.post('/public', createUser)