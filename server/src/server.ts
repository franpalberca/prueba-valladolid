import express, {Express} from 'express';
import cors from 'cors'
import morgan from 'morgan'
import { requestRouter } from './routes/requests.routes';
import errorHandler from './middlewares/error.middleware';

const app: Express = express();

app.use(cors())
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Middleware for parsing form data

app.use('/api', requestRouter);
app.use(errorHandler)

export default app;