import Photo from '../models/Photo';

class PhotoController {
	async store(req, res) {
		const { originalname: name, filename: path } = req.file;

		const file = await Photo.create({
			name,
			path,
		});

		return res.json(file);
	}

	async update(req, res) {
		const { id } = req.params;
		const { house_id } = req.body;

		const photo = await Photo.findByPk(id);

		await photo.update({ house_id });

		return res.json(photo);
	}
}

export default new PhotoController();
