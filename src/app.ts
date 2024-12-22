import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './routes';
import globalErrorHandler from './middlewares/globalErrorhandler';
import notFound from './middlewares/notFound';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
