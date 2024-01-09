import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
class ErrorHandler extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}


export const errorMiddleware: ErrorRequestHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorHandler) {
    const { message = "Internal Server Error", statusCode = 500, stack } = err || {};
    res.status(statusCode).json({
      success: false,
      message,
      stack: process.env.NODE_ENV === 'Development' ? stack : {}
    });
  } else {
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }


};

export default ErrorHandler;