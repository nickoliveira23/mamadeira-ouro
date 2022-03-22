const connection = require('../database/connection');

const bcrypt = require('bcrypt');

module.exports = {
    async create(request, response) {
        try {
            const { email, password, type } = request.body;

            const hash = await bcrypt.hash(password, 10);

            const [id] = await connection('user')
                .insert({
                    email: email,
                    password: hash,
                    type: type

                })
            return response.json({ id })
        } catch (err) {
            console.log(err)
        }
    },

    async index(request, response) {
        try {
            const user = await connection('user')
                .select('*');

            return response.json(user)
        } catch (err) {
            console.log(err)
        }
    },
}