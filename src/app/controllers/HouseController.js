import * as Yup from 'yup';
import { Op } from 'sequelize';
import House from '../models/House';

class HouseController {
	async store(req, res) {
		const schema = Yup.object().shape({
			title: Yup.string().required(),
			description: Yup.string().required(),
			street: Yup.string().required(),
			number: Yup.number().required(),
			complement: Yup.string().notRequired(),
			state: Yup.string().required(),
			city: Yup.string().required(),
			zip_code: Yup.string().notRequired(),
			geolocation: Yup.string().required(),
			price: Yup.string().required(),
			n_guests: Yup.number().required(),
			n_bedrooms: Yup.number().required(),
			n_bathrooms: Yup.number().required(),
			convenience: Yup.string().required(),
			owner_id: Yup.number().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'validation fails' });
		}

		const {
			title,
			description,
			street,
			number,
			complement,
			state,
			city,
			zip_code,
			geolocation,
			price,
			n_guests,
			n_bedrooms,
			n_bathrooms,
			convenience,
			owner_id,
		} = req.body;

		const { id } = await House.create({
			title,
			description,
			street,
			number,
			complement,
			state,
			city,
			zip_code,
			geolocation,
			price,
			n_guests,
			n_bedrooms,
			n_bathrooms,
			convenience,
			owner_id,
		});

		return res.json({
			id,
			title,
			description,
			street,
			number,
			complement,
			state,
			city,
			zip_code,
			geolocation,
			price,
			n_guests,
			n_bedrooms,
			n_bathrooms,
			convenience,
		});
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			title: Yup.string().required(),
			description: Yup.string().required(),
			street: Yup.string().required(),
			number: Yup.number().required(),
			complement: Yup.string().notRequired(),
			state: Yup.string().required(),
			city: Yup.string().required(),
			zip_code: Yup.string().notRequired(),
			geolocation: Yup.string().required(),
			price: Yup.string().required(),
			n_guests: Yup.number().required(),
			n_bedrooms: Yup.number().required(),
			n_bathrooms: Yup.number().required(),
			convenience: Yup.string().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'validation fails' });
		}

		const { id } = req.params;

		const house = await House.findByPk(id);

		if (!house) {
			return res.status(400).json({ error: 'House does not exists' });
		}

		const {
			title,
			description,
			street,
			number,
			complement,
			state,
			city,
			zip_code,
			geolocation,
			price,
			n_guests,
			n_bedrooms,
			n_bathrooms,
			convenience,
		} = req.body;

		await house.update({
			title,
			description,
			street,
			number,
			complement,
			state,
			city,
			zip_code,
			geolocation,
			price,
			n_guests,
			n_bedrooms,
			n_bathrooms,
			convenience,
		});

		return res.json({});
	}

	async index(req, res) {
		const { q: houseTitle, page = 1 } = req.query;

		const response = houseTitle
			? await House.findAll({
					where: {
						title: {
							[Op.iLike]: `%${houseTitle}%`,
						},
					},
					include: [
						{
							association: 'photos',
						},
						{
							association: 'owner',
						},
						{
							association: 'evaluations',
						},
					],
			  })
			: await House.findAll({
					limit: 5,
					offset: (page - 1) * 5,
					include: [
						{
							association: 'photos',
						},
						{
							association: 'owner',
						},
						{
							association: 'evaluations',
						},
					],
			  });

		return res.json(response);
	}

	async show(req, res) {
		const { id } = req.params;

		const house = await House.findByPk(id, {
			include: [
				{
					association: 'photos',
				},
				{
					association: 'owner',
				},
				{
					association: 'evaluations',
				},
			],
		});

		if (!house) {
			return res.status(400).json({ error: 'House does not exists' });
		}

		return res.json(house);
	}

	async destroy(req, res) {
		const { id } = req.params;

		const house = await House.findByPk(id);

		if (!house) {
			return res.status(400).json({ error: 'House does not exists' });
		}

		await house.destroy();
		return res.json({});
	}
}

export default new HouseController();
