const connection = require('..database/connection');

module.exports = {
    async create(request, response) {
        try {
            const { name, id_hospital } = request.body;

            const [id] = await connection('collaborator')
                .insert({
                    name: name,
                    id_hospital: id_hospital
                })

            return response.json({ id })
        } catch (err) {
            return response.status(500).json({ error: 'Algo deu errado!' });
        }
    }
}