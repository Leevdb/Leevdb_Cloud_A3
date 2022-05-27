import express, { Request, Response } from 'express';
import { notFoundErrorHandler } from './middleware/errorHandler.middleware';
import heroRouter from './routes/heroRouter.route';
import itemRouter from './routes/itemRouter.route';
import userRouter from './routes/userRouter.route';
import buildRouter from './routes/buildRouter.route';

require('dotenv').config();

var cors = require('cors');
// app is the express app. This is what runs the server and has all the configuration for the api
// we build this 'app' and then finally we run it from the index.ts file
const app = express();

app.use(cors());

// health check endpoint
app.get('/', async (req: Request, res: Response) => {
  res.send(
    `Hi I am a health check message I am alive and well. I am running on port ${
      process.env.PORT || 3000
    }`
  );
});

// send responses back in json format
app.use(express.json());

// middleware to only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(express.urlencoded({ extended: true }));

//disable header x-powered-by
app.disable('x-powered-by');

// get a token (if you are going to use this)
app.post('/token', (req: Request, res: Response) => {
  // this is how we get things from the request body
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    // res.json is the same as res.send, sends back a response (by default the status code is always 200 OK)
    res.json({
      token: 'I_AM_A_TOKEN',
    });
  } else {
    // this one is setting the status code to 401 and then sends back a response
    res.status(401).json({
      error: 'invalid credentials',
    });
  }
});

// add routes
app.use('/', heroRouter);
app.use('/', itemRouter);
app.use('/', userRouter);
app.use('/', buildRouter);

// this will handle 404 errors, or if you want to create other error handlers put them here like this.
// make sure you put these after the routes!
app.use(notFoundErrorHandler);

// export this app so other things can use it (like index.ts and jests)
export default app;
