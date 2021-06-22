import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";
import Cep from "../model/Cep";
import ApiViaCep from "../services/viacep";
import FormatCep from "../services/fomat";

class CepController {
    async index(req, res) {
        const {
            cep,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort,
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 100;

        let where = {};
        let order = [];

        if (cep) {
            where = {
                ...where,
                cep: {
                    [Op.eq]: cep,
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

        const data = await Cep.findAll({
            where,
            order,
            limit,
            offset: limit * page - limit,
        });

        return res.status(201).json(data);
    }

    async show(req, res) {
        const { cep } = req.params;

        const data = await Cep.findOne({
            where: {
                cep: {
                    [Op.eq]: cep,
                },
            },
        });

        if (!data) {
            const cepResult = await ApiViaCep.get(`${cep}/json`);
            console.log(cepResult);

            if (cepResult.data.erro) {
                return res.status(400).json({ error: "Cep invalid" });
            }

            console.log(FormatCep(cepResult.data));

            const newCep = await Cep.create(FormatCep(cepResult.data));

            return res.status(201).json({
                CEP: newCep,
                new: true,
            });
        }

        return res.json({
            CEP: data,
            new: false,
        });
    }

    async create(req, res) {
        const schema = Yup.object().shape({
            cep: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate schema" });
        }

        const { cep } = req.body;
        console.log(cep);

        const hasCep = await Cep.findOne({
            where: {
                cep: {
                    [Op.eq]: cep,
                },
            },
        });

        if (hasCep) {
            return res.status(409).json("Cep already registred");
        }

        const cepResult = await ApiViaCep.get(`${cep}/json`);

        if (cepResult.data.erro) {
            return res.status(400).json({ error: "Cep invalid" });
        }

        const newCep = await Cep.create(FormatCep(cepResult.data));

        return res.status(201).json(newCep);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            cep: Yup.string(),
            publicplace: Yup.string(),
            complement: Yup.string(),
            neighborhood: Yup.string(),
            location: Yup.string(),
            uf: Yup.string(),
            ibge: Yup.string(),
            gia: Yup.string(),
            ddd: Yup.string(),
            siafi: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate schema" });
        }

        const cep = await Cep.findOne({
            where: {
                cep: {
                    [Op.eq]: req.params.cep,
                },
            },
        });

        if (!cep) {
            return res.status(404).json("Cep not found");
        }

        const newCep = await Cep.update(req.body);

        return res.status(201).json(newCep);
    }

    async destroy(req, res) {
        const cep = await Cep.findOne({
            where: {
                cep: {
                    [Op.eq]: req.params.cep,
                },
            },
        });

        if (!cep) {
            return res.status(404).json();
        }

        await cep.destroy();

        return res.json();
    }

    async count(req, res) {
        const total = await Cep.count();
        return res.status(200).json({ total });
    }
}

export default new CepController();
