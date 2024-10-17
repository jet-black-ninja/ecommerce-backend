import { Request, Response, NextFunction } from 'express';

interface Error {
  name: string;
  message: string;
  stack?: string;
  status: number;
}

function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const message =
    err.message +
    (process.env.NODE_ENV === 'development' ? `\n${err.stack}` : '');
  res.status(status).json({
    message,
  });
}
export default errorMiddleware;
