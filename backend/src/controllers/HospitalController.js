const connection = require('..database/connection');

module.exports = {
    async create(request, response) {
        try {
            const { company, cnpj, street, number,
                city, district, uf, zipCode, phone, id_donor } = request.body;

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
                })

            return response.json({ id })
        } catch (err) {
            return response.status(500).json({ error: 'Algo deu errado!' });
        }
    }
}