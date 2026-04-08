//recuperar o pool de conexões
const pool = require("../../config/pool_conexoes");

//criar um objeto que conterá as funções de banco de dados
const tarefasModel = {
    //funções com ações do banco de dados
    findAll: async ()=>{
        try{
            const [resultado] = await pool.query("select * from tarefas where status_tarefa = 1");
            return resultado;
        }catch(erro){
            return erro;
        }
    },
    
    findById: async (id)=>{
        try{
            const [resultado] = await 
                pool.query("select * from tarefas where status_tarefa = 1 and id_tarefa = ?",
                    [id]
                );
            return resultado;
        }catch(erro){
            return erro;
        }
    },

    create: async(dadosJson)=>{
        // dados json no seguinte formato:
        // {
                // nome: "valor",
                // prazo:"data"
                // situacao:"codigo"
        // }
        try{
            const [resultado] = await pool.query(
                "insert into tarefas(`nome_tarefa`,`prazo_tarefa`,`situacao_tarefa`) "+
                " values(?,?,?)",
                [dadosJson.nome,dadosJson.prazo,dadosJson.situacao]);
            return resultado;

        }catch(erro){
            return erro;
        }
    },

    update: async (dadosJson, id)=>{
         try{
            const [resultado] = await pool.query(
                "update tarefas set `nome_tarefa` = ?, "+ 
                " `prazo_tarefa`= ?, `situacao_tarefa`= ?  "+
                " where id_tarefa = ?",
                [dadosJson.nome,dadosJson.prazo,dadosJson.situacao,id]);
            return resultado;

        }catch(erro){
            return erro;
        }
    }

    //faltam os seguintes métodos:  delete fisico, delete lógico 

}

//exportar o objeto como um módulo do js
//uso da chave indica a obrigatoriedade de manter o mesmo nome na utilização
module.exports = {tarefasModel}
