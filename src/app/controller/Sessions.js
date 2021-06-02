import * as Yup from "yup";
import jwt from "jsonwebtoken";
import User from "../model/User";
import authConfig from "../config/auth";

class SessionController {
    async create(req, res) {
        const { email, password } = req.body;

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate schema" });
        }

        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: "Password not match" });
        }

        const { id, name } = user;
        const jwtToken = jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        });

        return res.status(200).json({
            user: {
                id,
                name,
                email,
            },
            token: jwtToken,
        });
    }
}

export default new SessionController();
