import {Router} from 'express';
import { protectedRequest, publicRequest } from '../controllers/requests.controller';
import { checkJwtMiddleware } from '../middlewares/checkJwt.middleware';
import { createUser, deleteUserById, getUserByEmailParams } from '../controllers/user.controller';
import { createFootballer, getAllFootballers, getFootballerById } from '../controllers/footballer.controller';

export const requestRouter = Router()

requestRouter.get("/public", publicRequest)
requestRouter.get("/protected", checkJwtMiddleware, protectedRequest)
requestRouter.post('/public', createUser)
requestRouter.get('/public/email/:email', getUserByEmailParams)
requestRouter.delete('/public/email/:email', deleteUserById)
requestRouter.post('/public/footballer', createFootballer)
requestRouter.get('/public/footballer', getAllFootballers)
requestRouter.get('/public/footballer/:id', getFootballerById)
requestRouter.delete('/public/footballer/:footballerId', deleteUserById)