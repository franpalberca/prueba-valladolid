import {Router} from 'express';
import { createUser, deleteUserById, getUserByEmailParams } from '../controllers/user.controller';
import { createFootballer, getAllFootballers, getFootballerById } from '../controllers/footballer.controller';
import { createAnswer, deleteAnswerById, getAnswerByFootballerId } from '../controllers/answer.controller';

export const requestRouter = Router()

requestRouter.post('/', createUser)
requestRouter.get('/email/:email', getUserByEmailParams)
requestRouter.delete('/email/:email', deleteUserById)
requestRouter.post('/footballer', createFootballer)
requestRouter.get('/footballer', getAllFootballers)
requestRouter.get('/footballer/:id', getFootballerById)
requestRouter.delete('/footballer/:footballerId', deleteUserById)
requestRouter.post('/footballer/answer/:footballerId', createAnswer)
requestRouter.get('/footballer/answer/2/:footballerId', getAnswerByFootballerId)
requestRouter.delete('/footballer/answer/2/:answerId', deleteAnswerById)