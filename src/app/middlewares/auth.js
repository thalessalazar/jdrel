import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../config/auth";

// eslint-disable-next-line arrow-body-style
export default async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log({ authHeader });
    console.log({ authConfig });

    if (!authHeader) {
        return res.status(401).json({ error: "Token was not provided" });
    }

    const [, token] = authHeader.split(" ");

    try {
        // eslint-disable-next-line no-unused-vars
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Token Invalid" });
    }
};
