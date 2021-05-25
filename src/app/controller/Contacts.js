import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";
import Customer from "../model/Customer";
import Contact from "../model/Contact";

class ContactController {
    async index(req, res, next) {
        const {
            name,
            email,
            status,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort,
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        let where = { customer_id: req.params.customerId };
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

        if (status) {
            where = {
                ...where,
                email: {
                    [Op.in]: status
                        .split(",")
                        .map((item) => item.toUpperCase()),
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

        const data = await Contact.findAll({
            where,
            include: [
                {
                    model: Customer,
                    attributes: ["id"],
                    required: true,
                },
            ],
            order,
            limit,
            offset: limit * page - limit,
        });
        return res.json(data);
    }

    async show(req, res) {
        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id,
            },
            attributes: {
                exclude: ["customer_id", "customerId"],
            },
        });

        if (!contact) {
            return res.status(404).json();
        }

        return res.json(contact);
    }

    async create(req, res, next) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            status: Yup.string().uppercase(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate schema" });
        }

        const contact = await Contact.create({
            customer_id: req.params.customerId,
            ...req.body,
        });

        return res.status(201).json(contact);
    }

    async update(req, res, next) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            status: Yup.string().uppercase(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate schema" });
        }

        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id,
            },
            attributes: {
                exclude: ["customer_id", "customerId"],
            },
        });

        if (!contact) {
            return res.status(404).json();
        }

        await contact.update(req.body);

        return res.json(contact);
    }

    async destroy(req, res, next) {
        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id,
            },
        });

        if (!contact) {
            return res.status(404).json();
        }

        await contact.destroy();

        return res.json();
    }
}

export default new ContactController();
