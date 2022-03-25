const connection = require('../database/connection');
const userEmail = require('../validators/userCredentials');
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

    async validateEmail(request, response) {
        try {
            const { email } = request.body;

            const user = await connection('user')
                .where({ email: email })
                .select('*')
                .first();

            if (user) {
                return response.status(400).json({ error: 'E-mail já cadastrado!' });
            } else {
                if (email == '') {
                    return response.status(400).json({ error: 'Preencha o e-mail!' });
                } else {
                    return response.json({ email: email })
                }
            }
        } catch (err) {
            console.log(err);
            return response.status(500).json({ error: 'Algo deu errado!' });
        }

    },
    async validatePassword(request, response) {
        try {
            const password = request.body;

            const passwordString = JSON.stringify(password.password).replace(/"/g, '');

            return response.json({ password: passwordString })

        } catch (err) {
            console.log(err);
            return response.status(500).json({ error: 'Algo deu errado!' });
        }
    },
}