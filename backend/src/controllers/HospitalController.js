const connection = require('../database/connection');
const axios = require('axios');

module.exports = {
    async create(request, response) {
        try {
            const { company, cnpj, street, number,
                city, district, uf, zipCode, phone, place_id, id_donor, id_collaborator } = request.body;

            const [id] = await connection('hospital')
                .insert({
                    company: company,
                    cnpj: cnpj,
                    street: street,
                    number: number,
                    city: city,
                    district: district,
                    uf: uf,
                    zipCode: zipCode,
                    phone: phone,
                    place_id: place_id,
                    id_donor: id_donor,
                    id_collaborator: id_collaborator
                })

            return response.json({ id })
        } catch (err) {
            console.log(err)
            return response.status(500).json({ error: 'Algo deu errado!' });
        }
    },

    async listHospital(request, response) {
        try {
            const { id } = request.params;

            const { latitude, longitude } = request.headers

            const key = process.env.GOOGLE_API_KEY

            const { data } = await axios.get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=hospital&location=${latitude},${longitude}&radius=1500&type=hospital&key=${key}`
            )

            const arrayHospital = []

            for (let i = 0; i < data.results.length; ++i) {
                arrayHospital[i] = data.results[i].place_id
            }

            const hospitals = await connection('hospital')
                .select('*')
                .whereIn("place_id", arrayHospital)

            return response.json(hospitals)

        } catch (err) {
            return response.status(500).json({ error: 'Algo deu errado!' });
        }
    }
}