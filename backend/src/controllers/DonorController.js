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

    async indexById(request, response) {
        try {
            const { id } = request.params;

            const donor = await connection('donor')
                .where('id_user', id)
                .select('*')
                .first();

            return response.json(donor)
        } catch (err) {
            console.log(err)
        }

    },

    async updateDonor(request, response) {
        try {
            const {
                name,
                birth,
                street,
                number,
                city,
                district,
                uf,
                zipCode,
                phone

            } = request.body;

            const { id } = request.params;

            const { id_user } = request.params;

            const donor = await connection('donor')
                .update({
                    name,
                    birth,
                    street,
                    number,
                    city,
                    district,
                    uf,
                    zipCode,
                    phone,
                })
                .where({ id })

            return response.json(donor);

        } catch (err) {
            return response.status(500).json({ error: 'Erro ao atualizar informações de perfil!' });
        }
    },

    async validate(request, response) {
        try {
            const {
                name,
                birth,
                street,
                number,
                city,
                district,
                uf,
                zipCode,
                phone

            } = request.body;

            function getAge(dateString) {
                var today = new Date();
                var birthDate = new Date(dateString);
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age;
            }

            const donorAge = getAge(birth)

            const numeros = /[0-9]/;
            const caracteresEspeciais = /[,|.|!|@|#|$|%|^|&|*|(|)|-|_]/;
            var auxNumero = 0;
            var auxEspecial = 0;


            for (var i = 0; i < name.length; i++) {
                if (numeros.test(name[i]))
                    auxNumero++;
                else if (caracteresEspeciais.test(name[i]))
                    auxEspecial++;
            }

            if (name !== "") {
                if (auxNumero == 0 && auxEspecial == 0) {
                    if (donorAge < 80 && donorAge > 17) {
                        if (street !== "") {
                            if (number.length <= 4 && number !== "") {
                                if (district !== "") {
                                    if (city !== "") {
                                        if (uf.length == 2) {
                                            if (zipCode !== "") {
                                                if (phone.length == 11) {
                                                    return response.json({ message: "Atualizado com sucesso!" });
                                                } else {
                                                    return response.status(400).json({ error: 'Número de telefone inválido!' });
                                                }
                                            } else {
                                                return response.status(400).json({ error: 'CEP inválido!' })
                                            }
                                        } else {
                                            return response.status(400).json({ error: 'UF só pode conter 2 dígitos!' })
                                        }
                                    } else {
                                        return response.status(400).json({ error: 'Informe a cidade!' });
                                    }
                                } else {
                                    return response.status(400).json({ error: 'Informe o bairro!' })
                                }
                            } else {
                                return response.status(400).json({ error: 'Número inválido!' })
                            }
                        } else {
                            return response.status(400).json({ error: 'Informe o endereço!' });
                        }
                    } else {
                        return response.status(400).json({ error: 'Idade não está de acordo com os termos de uso do aplicativo!' });
                    }
                } else {
                    return response.status(400).json({ error: 'Formato de nome inválido' });
                }
            } else {
                return response.status(400).json({ error: 'Digite um nome!' });
            }

        } catch (err) {
            return response.status(500).json({ error: 'Algo deu errado!' });
        }
    }
}