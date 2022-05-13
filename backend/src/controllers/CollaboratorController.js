//Importando arquivo de conexão com o banco de dados
const connection = require('../database/connection');

//Exportando nossos métodos de controle
module.exports = {
    //Método para criar um colaborador
    async register(request, response) {
        try {
            //Recebendo nome e id de usuário do corpo da requisição
            const { name, id_user } = request.body;

            /*Aqui é feito um insert na tabela de colaboradores com os dados que foram recebidos,
            no final a variável 'id' recebe o id do registro criado.*/
            const [id] = await connection('collaborator')
                .insert({
                    name: name,
                    id_user: id_user
                })

            //Em caso de sucesso é retornado o id para o cliente.
            return response.json({ id })
        } catch (err) {
            //Em caso de falha é retornado a mensagem de erro.
            return response.status(500).json({ error: 'Algo deu errado!' });
        }
    },

    //Método de listagem de todos os colaboradores
    async indexAll(request, response) {
        try {
            /*Aqui é feito um select na tabela de colaboradores que povoa a váriavel 'collaborator' 
            com um objeto contendo todos os registros*/
            const collaborator = await connection('collaborator')
                .select('*');

            //Em caso de sucesso é retornado o objeto com todos os registros
            return response.json(collaborator)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            console.log(err)
        }
    },

    //Método de listagem por id
    async indexById(request, response) {
        try {
            //Recebendo o id de usuário pelos parâmetros da requisição
            const { id } = request.params;

            /*Na tabela de colaboradores é feito um select onde o id é igual ao id recebido pelo cliente, 
            o retorno povoa a váriavel 'collaborator' com um objeto contendo o registro*/
            const collaborator = await connection('collaborator')
                .select('*')
                .where('id', id)

            //Em caso de sucesso é retornado o objeto com o registro
            return response.json(collaborator)
        } catch (err) {
            //Em caso de falha é exibido no terminal o erro
            console.log(err)
        }
    },
}