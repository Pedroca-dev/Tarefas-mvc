const express = require("express");
const router = express.Router();
const moment = require("moment");
moment.locale("pt-br");
//requisição do Model
// usar a chave e o mesmo nome do objeto exportado
const {tarefasModel} = require("../models/tarefasModel");

router.get("/", async function (req, res) {
    res.locals.moment = moment;
    try{
        const linhas = await tarefasModel.findAll();
        res.render("pages/index", {listaTarefas:linhas});
    }catch(erro){
        console.log(erro);
    }
});


router.get("/cadastro", (req, res)=>{
    res.locals.moment = moment;
    res.render("pages/cadastro", {tarefa:{id_tarefa:"",nome_tarefa:"",prazo_tarefa:"",situacao_tarefa:1},
        titulo:"Nova Tarefa",
        id_tarefa:0
    });
});

router.get("/editar", async (req, res)=>{
    res.locals.moment = moment;
    let id = req.query.id;
    try{
        const tarefa = await tarefasModel.findById(id);
        res.render("pages/cadastro", 
            {tarefa:tarefa[0],
            titulo:"Editar Tarefa",
            id_tarefa:id
        });
    }catch(erro){
        console.log(erro)
    }
});





router.post("/cadastro", async (req, res)=>{
    // adicionar a validação com express-validator
    const dados = {
        nome: req.body.tarefa,
        prazo: req.body.prazo,
        situacao: req.body.situacao
    }
    const id = req.body.id_tarefa;
    try{
        if(id == 0){
            var result = await tarefasModel.create(dados);
        }else{
            var result = await tarefasModel.update(dados, id);
        }
        console.log(result);
        res.redirect("/");
    }catch(erro){
        console.log(erro)
    }
})


router.get("/teste-insert", async (req, res)=>{
    const dados = {
        nome:"instalar o MySQL no lab 3 e lab 4",
        prazo:"2026-03-18"
    }
    try{
        const resultado = await tarefasModel.create(dados);
        res.send(resultado);
    }catch(erro){
        console.log(erro);
    }

    router.delete('/nome_tarefa`,`prazo_tarefa`,`situacao_tarefa/:id 1, id 2, id 3', controller.deletartarefasModel);
exports.deletarItem = (req, res) => {
    const { id } = req.params;
        res.status(200).json({ message: `Item ${id} deletado com sucesso` });

});

module.exports = router;