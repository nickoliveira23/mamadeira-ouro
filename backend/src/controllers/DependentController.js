const connection = require('..database/connection');

module.exports = {
    async create(request, response) {
        try {
            const { name, birth, id_donor } = request.body;

            const [id] = await connection('dependent')
                .insert({
                    name: name,
                    birth: birth,
                    id_donor: id_donor
                })

            return response.json({ id })
        } catch (err) {
            return response.status(500).json({ error: 'Algo deu errado!' });
        }
    }
}