import { prismaClient } from "db/client";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized User" });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (decoded && typeof decoded !== "string") {
      const { userId } = decoded;
      const user = await prismaClient.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (!user) {
        res.status(401).json({ message: "Unauthorized User" });
        return;
      }
      req.userId = userId;
      return next();
    }
    res.status(401).json({ message: "Unauthorized User" });
    return;
  } catch (e) {
    console.log("error occured", e);
    return res.status(401).json({ message: "Unauthorized User" });
  }
};

export default authentication;
