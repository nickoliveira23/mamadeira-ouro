const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        try {
            const { name, birth, street, number,
                city, district, uf, zipCode, phone, id_user } = request.body;

            const [id] = await connection('donor')
                .insert({
                    name: name,
                    birth: birth,
                    street: street,
                    number: number,
                    city: city,
                    district: district,
                    uf: uf,
                    zipCode: zipCode,
                    phone: phone,
                    id_user: id_user
                })

            return response.json({ id })
        } catch (err) {
            return response.status(500).json({ error: 'Algo deu errado!' });
        }
    },

    async index(request, response) {
        try {
            const donor = await connection('donor')
                .select('*');

            return response.json(donor)
        } catch (err) {
            console.log(err)
        }
    },
}