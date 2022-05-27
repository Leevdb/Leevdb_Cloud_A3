import { NextFunction, Response, Request } from 'express';

// add your routes here and instead of express sending back a http page error, it will send back a json object
export const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validBaseUrl = [
    '/api/v1/heroes',
    '/api/v1/items',
    '/api/v1/user',
    '/heroes',
    '/items',
    '/user',
    '/build',
  ];
  const baseUrl = req.originalUrl.split('?')[0];
  if (!validBaseUrl.includes(baseUrl)) {
    res.status(404).send({
      error:
        'Not found... check that the end point is in the in the error handler middleware you dumbass...',
    });
  } else {
    next();
  }
};
