import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";
import User from "../model/User";

class UserController {
    async index(req, res) {
        const {
            name,
            email,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort,
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        let where = {};
        let order = [];

        if (name) {
            where = {
                ...where,
                name: {
                    [Op.iLike]: name,
                },
            };
        }

        if (email) {
            where = {
                ...where,
                email: {
                    [Op.iLike]: email,
                },
            };
        }

        if (createdBefore) {
            where = {
                ...where,
                email: {
                    [Op.gte]: parseISO(createdBefore),
                },
            };
        }

        if (createdAfter) {
            where = {
                ...where,
                email: {
                    [Op.lte]: parseISO(createdAfter),
                },
            };
        }

        if (updatedBefore) {
            where = {
                ...where,
                email: {
                    [Op.gte]: parseISO(updatedBefore),
                },
            };
        }

        if (updatedAfter) {
            where = {
                ...where,
                email: {
                    [Op.lte]: parseISO(updatedAfter),
                },
            };
        }

        if (sort) {
            order = sort.split(",").map((item) => item.split(":"));
        }

        const data = await User.findAll({
            attributes: {
                exclude: ["password_hash", "password"],
            },
            where,
            order,
            limit,
            offset: limit * page - limit,
        });

        return res.status(201).json(data);
    }

    async show(req, res) {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            attributes: {
                exclude: ["password_hash", "password"],
            },
        });

        if (!user) {
            return res.status(404).json();
        }

        return res.json(user);
    }

    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
            passwordConfirmation: Yup.string().when(
                "password",
                (password, field) =>
                    password
                        ? field.required().oneOf([Yup.ref("password")])
                        : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate schema" });
        }

        const { id, name, email, createdAt, updatedAt } = await User.create(
            req.body
        );

        return res.status(201).json({ id, name, email, createdAt, updatedAt });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(8),
            password: Yup.string()
                .min(8)
                .when("oldPassword", (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            passwordConfirmation: Yup.string().when(
                "password",
                (password, field) =>
                    password
                        ? field.required().oneOf([Yup.ref("password")])
                        : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate schema" });
        }

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json();
        }

        const { oldPassword } = req.body;

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: "User password not match" });
        }

        const { id, name, email, createdAt, updatedAt } = await user.update(
            req.body
        );

        return res.status(201).json({ id, name, email, createdAt, updatedAt });
    }

    async destroy(req, res) {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json();
        }

        await user.destroy();

        return res.json();
    }
}

export default new UserController();
