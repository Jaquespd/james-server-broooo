import * as Yup from 'yup';
import Evaluation from '../models/Evaluation';

class EvaluationController {
	async store(req, res) {
		const schema = Yup.object().shape({
			description: Yup.string().required(),
			cleaning: Yup.number().required(),
			communication: Yup.number().required(),
			check_in: Yup.number().required(),
			precision: Yup.number().required(),
			location: Yup.number().required(),
			value: Yup.number().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'validation fails' });
		}

		const {
			description,
			cleaning,
			communication,
			check_in,
			precision,
			location,
			value,
		} = req.body;

		const { user_id, house_id } = req.params;

		// add validations...after

		const { id } = await Evaluation.create({
			description,
			cleaning,
			communication,
			check_in,
			precision,
			location,
			value,
			user_id,
			house_id,
		});

		return res.json({
			id,
			description,
			cleaning,
			communication,
			check_in,
			precision,
			location,
			value,
			user_id,
			house_id,
		});
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			description: Yup.string().required(),
			cleaning: Yup.number().required(),
			communication: Yup.number().required(),
			check_in: Yup.number().required(),
			precision: Yup.number().required(),
			location: Yup.number().required(),
			value: Yup.number().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'validation fails' });
		}

		const { id } = req.params;

		const evaluation = await Evaluation.findByPk(id);

		if (!evaluation) {
			return res.status(400).json({ error: 'Evaluation does not exists' });
		}

		const {
			description,
			cleaning,
			communication,
			check_in,
			precision,
			location,
			value,
		} = req.body;

		await evaluation.update({
			description,
			cleaning,
			communication,
			check_in,
			precision,
			location,
			value,
		});

		return res.json({});
	}

	async index(req, res) {
		const { page = 1 } = req.query;

		const response = await Evaluation.findAll({
			limit: 5,
			offset: (page - 1) * 5,
		});

		return res.json(response);
	}

	async destroy(req, res) {
		const { id } = req.params;

		const evaluation = await Evaluation.findByPk(id);

		if (!evaluation) {
			return res.status(400).json({ error: 'Evaluation does not exists' });
		}

		await evaluation.destroy();
		return res.json({});
	}
}

export default new EvaluationController();
