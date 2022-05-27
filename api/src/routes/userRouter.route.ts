import { Request, Response, Router } from 'express';
import { getData, putData } from '../helper/dynamo.helper';

const userRouter = Router();

userRouter.get('/user', (req: Request, res: Response) => {
  res.send('users');
});

// post request
userRouter.post('/user/login', async (request: Request, res: Response) => {
  const { email, password } = request.body;

  if (!email && !password) {
    res.status(400).json({
      error: 'email and password are required',
    });
    return;
  }

  // get the data from dynamoDB
  const user = await getData('login', { email });

  // if there no s found, return the user
  if (!user) {
    res.status(404).json({
      error: 'user not found',
    });
    return;
  } else {
    // if the password is correct, return the user
    if (user.password === password) {
      res.json({ user: { email: user.email, user_name: user.user_name } });
    } else {
      // if the password is incorrect, return an error
      res.status(401).json({
        error: 'invalid credentials',
      });
      return;
    }
  }
});

// user router register
userRouter.post('/user/register', async (request: Request, res: Response) => {
  const { email, password, name } = request.body;

  if (!email && !password && !name) {
    res.status(400).json({
      error: 'email, password and username are required',
    });
    return;
  }

  // get the data from dynamoDB
  const user = await getData('login', { email });

  //loop through user to check if the email is already in the database
  if (user) {
    res.status(400).json({
      error: 'email already exists',
    });
    return;
  } else {
    // if the email is not in the database, create a new user

    const newUser = {
      email,
      password,
      user_name: name,
    };

    const result = await putData('login', newUser);

    if (result) {
      console.log('user created', newUser);
      res.json({
        user: { email: newUser.email, user_name: newUser.user_name },
      });
    } else {
      res.status(400).json({
        error: 'user not created',
      });
    }
  }
});

export default userRouter;
