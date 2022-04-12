const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        try {
            const { name, id_user } = request.body;

            const [id] = await connection('collaborator')
                .insert({
                    name: name,
                    id_user: id_user
                })

            return response.json({ id })
        } catch (err) {
            return response.status(500).json({ error: 'Algo deu errado!' });
        }
    },

    async index(request, response) {
        try {
            const collaborator = await connection('collaborator')
                .select('*');

            return response.json(collaborator)
        } catch (err) {
            console.log(err)
        }
    },
}