//Importando arquivo de conexão com o banco de dados
const connection = require('../database/connection');

//Importando axios para que possamos fazer chamada de uma API externa nesse arquivo
const axios = require('axios');
const { json } = require('express/lib/response');

//Exportando nossos métodos de controle
module.exports = {
    //Método para criar um hospital
    async register(request, response) {
        try {
            //Recebendo dados do hospital do corpo da requisição
            const {
                company, cnpj, street, number,
                city, district, uf, zipCode, phone,
                place_id, id_donor, id_collaborator
            } = request.body;

            /*Aqui é feito um insert na tabela de hospital com os dados que foram recebidos,
            no final a variável 'id' recebe o id do registro criado.*/
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

            //Em caso de sucesso é retornado o id para o cliente.
            return response.json({ id })
        } catch (err) {
            //Em caso de falha é retornado a mensagem de erro.
            return response.status(500).json({ error: 'Falha ao cadastrar banco de leite!' });
        }
    },

    //Método de listagem de todos os hospitais
    async indexAll(request, response) {
        try {
            /*Aqui é feito um select na tabela de hospitais que povoa a váriavel 'hospitals' 
            com um objeto contendo todos os registros*/
            const hospitals = await connection('hospital')
                .select('*')

            //Em caso de sucesso é retornado o objeto com todos os registros
            return response.json(hospitals)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            console.log(err)
        }
    },

    //Método de listagem de hospitais por coordenadas
    async indexByCoords(request, response) {
        try {
            //Recebendo coordenadas pelo cabeçalho da requisição
            const { latitude, longitude } = request.headers
            //Váriavel 'key' recebe a chave da API do Google
            const key = process.env.GOOGLE_API_KEY
            /*Aqui é feito uma chamada a API externa do Google. Essa API é para localizar estabelecimentos
            próximos. Na URL da api é informado como parâmetros as coordenadas bem como a chave da API. Além
            disso será filtrado na busca somente a palavra chave 'hospital' em um raio de 1500 metros*/
            const { data } = await axios.get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=hospital&location=${latitude},${longitude}&radius=1500&type=hospital&key=${key}`
            )

            const arrayHospital = []
            /*Para cada registro retornado pela API externa é povoado uma array somente com 
            o place_id de cada registro.*/
            for (let i = 0; i < data.results.length; ++i) {
                arrayHospital[i] = data.results[i].place_id
            }

            /*Na tabela de hospitals é feito um select em todos os registros onde o place_id 
            também esteja no array povoado pelo 'for'*/
            const hospitals = await connection('hospital')
                .select('*')
                .whereIn("place_id", arrayHospital)

            //Em caso de sucesso é retornado o objeto com todos os registros
            return response.json(hospitals)
        } catch (err) {
            //Em caso de falha é retornado a mensagem de erro.
            return response.status(500).json({ error: 'Falha ao exibir bancos de leite!' });
        }
    },

    async verifyAvailability(request, response) {
        try {
            const hours = [
                '7:30:00', '8:00:00',
                '8:30:00', '9:00:00',
                '9:30:00', '10:00:00',
                '10:30:00', '11:00:00',
                '11:30:00', '12:00:00',
                '12:30:00', '13:00:00',
                '13:30:00', '14:00:00',
                '14:30:00', '15:00:00',
                '15:30:00', '16:00:00',
                '16:30:00', '17:00:00',
            ];

            const { id } = request.params;

            const today = new Date();

            const selectedYear = today.getFullYear();
            const selectedMonth = today.getMonth();
            const selectedDay = today.getDate();

            let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
            let listDates = [];
            let newListDates = [];
            let occupiedDateTime = [];
            let occupiedDate = [];
            let occupiedHour = [];
            let occupiedDateHour = [];

            const available = await connection('schedule')
                .select('date_time', 'date', 'hour')
                .where('id_hospital', id)

            for (let i = 0; i < available.length; i++) {
                occupiedDateTime[i] = new Date(available[i].date_time).toLocaleDateString();
                occupiedDate[i] = available[i].date;
                occupiedHour[i] = available[i].hour
                occupiedDateHour[i] = { date: occupiedDateTime[i], hour: [occupiedHour[i]] }
            }

            // const exampleList = available.filter((arr) => {
            //     return 1;
            // })

            // console.log(exampleList)


            for (let i = 1; i <= daysInMonth; i++) {
                let d = new Date(selectedYear, selectedMonth, i);

                let year = d.getFullYear();
                let month = d.getMonth();
                let day = d.getDate();
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                let selDate = new Date(`${year}`, `${month}`, `${day}`);

                listDates[i - 1] = { date: selDate.toLocaleDateString(), hour: hours };
            }

            // newListDates = listDates.map((currentDateData) => {
            //     const currentOccupiedDateHour = occupiedDateHour.find(dateData => dateData.date === currentDateData.date)
            //     if (!currentOccupiedDateHour) {
            //         return currentDateData
            //     }

            //     return {
            //         date: currentDateData.date,
            //         hour: currentDateData.hour.filter(currentHour => !currentOccupiedDateHour.hour.includes(currentHour))
            //     }
            // })




            const occupiedDateHourIndex = occupiedDateHour.reduce((acc, el) => {
                acc[el.date] = el.hour;
                return acc;
            }, {});


            const filterHours = (hours, excludeHours) => {
                return hours.filter(h => !excludeHours.includes(h));
            };



            newListDates = listDates.map(el => {
                const date = el.date;
                const hour = filterHours(el.hour, occupiedDateHourIndex[date]);
                return { date, hour }
            })

            // console.log(JSON.stringify(newListDates, null, 4))

            return response.json({ available: newListDates })
        } catch (error) {
            console.log(error)
            return response.status(500).json({ error: 'Falha ao verificar disponibilidade!' })
        }
    }
}