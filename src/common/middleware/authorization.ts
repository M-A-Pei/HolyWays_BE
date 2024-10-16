import { NestMiddleware } from "@nestjs/common";
import { log } from "console";
import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export class authorization implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let payload;

        try {
            payload = jwt.verify(token, process.env.SECRET || "secret");
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        res.locals.user = payload;

        next();
    }
}