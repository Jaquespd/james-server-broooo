import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, subHours } from 'date-fns';
import Appointment from '../models/Appointment';
import House from '../models/House';

class AppointmentController {
	async index(req, res) {
		const { page = 1 } = req.query;

		const appointments = await Appointment.findAll({
			where: {
				canceled_at: null,
			},
			order: ['start_date'],
			limit: 20,
			offset: (page - 1) * 20,
			attributes: [
				'id',
				'start_date',
				'end_date',
				'past',
				'cancelable',
				'createdAt',
			],
			include: [
				{
					association: 'client',
				},
				{
					association: 'house',
				},
			],
		});
		return res.json(appointments);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			start_date: Yup.date().required(),
			end_date: Yup.date().required(),
			owner_id: Yup.number().required(),
			client_id: Yup.number().required(),
			house_id: Yup.number().required(),
			date: Yup.date().notRequired(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error: 'Valiation fails',
			});
		}

		const {
			start_date,
			end_date,
			owner_id,
			client_id,
			house_id,
			date,
		} = req.body;

		/**
		 * Owner can't create appointment for itself
		 */
		if (owner_id === client_id) {
			return res
				.status(401)
				.json({ error: 'You can not create appointments for yourself' });
		}

		/**
		 * Check if house_id is a house
		 */
		const checkIfHouseExist = await House.findOne({
			where: {
				id: house_id,
			},
		});

		if (!checkIfHouseExist) {
			return res.status(401).json({ error: 'House not exist' });
		}

		const hourStart = startOfHour(parseISO(start_date));

		/**
		 * Check for past dates
		 */
		if (isBefore(hourStart, new Date())) {
			return res.status(400).json({ error: 'Past date are not permitted' });
		}

		const appointment = await Appointment.create({
			start_date,
			end_date,
			owner_id,
			client_id,
			house_id,
		});

		return res.json(appointment);
	}

	async destroy(req, res) {
		const appointment = await Appointment.findByPk(req.params.id, {
			include: [
				{
					association: 'client',
				},
			],
		});

		console.log('appointment.client.id', appointment.client.id);
		console.log('req.userId', req.userId);

		if (appointment.client.id !== req.userId) {
			return res.status(401).json({
				error: "You don't have permission to cancel this appointment.",
			});
		}

		// removo duas horas da data agendada
		const dateWithSub = subHours(appointment.start_date, 2);
		const NOW = new Date();
		if (isBefore(dateWithSub, NOW)) {
			return res.status(401).json({
				error: 'You can only cancel appointment 2 hours in advance.',
			});
		}

		appointment.canceled_at = NOW;

		await appointment.save();

		return res.json(appointment);
	}
}

export default new AppointmentController();
