import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User';

class UserController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string()
				.email()
				.required(),
			password: Yup.string()
				.required()
				.min(6),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const userExists = await User.findOne({ where: { email: req.body.email } });
		if (userExists) {
			return res.status(400).json({ error: 'User already exists.' });
		}
		const { id, name, email } = await User.create(req.body);
		return res.json({ id, name, email });
	}

	async index(req, res) {
		const { q: userName, page = 1 } = req.query;

		const response = userName
			? await User.findAll({
					where: {
						name: {
							[Op.iLike]: `%${userName}%`,
						},
					},
					attributes: ['id', 'name', 'email', 'createdAt'],
					include: [
						{
							association: 'avatar',
						},
					],
			  })
			: await User.findAll({
					attributes: ['id', 'name', 'email', 'createdAt'],
					limit: 5,
					offset: (page - 1) * 5,
					include: [
						{
							association: 'avatar',
						},
					],
			  });

		return res.json(response);
	}

	async show(req, res) {
		const { id } = req.params;

		const user = await User.findByPk(id, {
			attributes: ['id', 'name', 'email', 'createdAt'],
			include: [
				{
					association: 'avatar',
				},
			],
		});

		if (!user) {
			return res.status(400).json({ error: 'User does not exists' });
		}

		return res.json(user);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string().email(),
			oldPassword: Yup.string().min(6),
			password: Yup.string()
				.min(6)
				.when('oldPassword', (oldPassword, field) =>
					oldPassword ? field.required() : field
				),
			confirmPassword: Yup.string().when('password', (password, field) =>
				password ? field.required().oneOf([Yup.ref('password')]) : field
			),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const { name, email, oldPassword } = req.body;
		const { id } = req.params;

		const user = await User.findByPk(id);
		if (user.email !== email) {
			const userExists = await User.findOne({
				where: { email },
			});
			if (userExists) {
				return res.status(400).json({ error: 'User already exists.' });
			}
		}
		// só faço isso se ele informou a senha antiga, isto é, quer alterar a senha
		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			return res.status(401).json({ error: 'Password does not match.' });
		}

		await user.update(req.body);

		return res.json({ id, name, email });
	}

	async destroy(req, res) {
		const { id } = req.params;

		const user = await User.findByPk(id);

		if (!user) {
			return res.status(400).json({ error: 'User does not exists' });
		}

		await user.destroy();
		return res.json({});
	}
}

export default new UserController();
