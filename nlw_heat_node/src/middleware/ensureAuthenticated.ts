import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

declare var process: {
  env: {
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    JWT_SECRET: string;
  };
};

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid",
    });
  }

  // Bearer 730dd331430d14e6cfb23523e8f8da05

  // [0] Bearer
  // [1] 730dd331430d14e6cfb23523e8f8da05

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayLoad;

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).json({ errorCode: "token.expired" });
  }
}
