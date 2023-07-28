const express = require("express");
const app = express();
const bodyParser=require('body-parser');
const cors = require('cors');
const op = require('../models/users');
// mvc pesquisar

app.use(cors())
// analise/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended:'true'}));

app.post('/editar', async(req, res) => {
  id=req.body.user_id;
  let dados = {'Usuario':req.body.user_usuario, 
               'Nome':req.body.user_nome,
               'senha':req.body.user_senha
              };
  // Nome usuário senha all
  if(id){
    await op.atualizar_user(id,dados)
 
    data = {
      code: 200,
      mensage: 'Conta deletada',
    };
    res.json(data)

  }else{ 
    data = {
      code: 200,
      mensage: 'ID sem conta',
    };
    res.json(data)
  }

  
});

app.post('/deletar', async(req, res) => {
  id=req.body.id;
  // Nome usuário senha all
  if(id){
    await op.deletar_user(id)
 
    data = {
      code: 200,
      mensage: 'Conta deletada',
    };
    res.json(data)

  }else{ 
    data = {
      code: 200,
      mensage: 'ID sem conta',
    };
    res.json(data)
  }

  
});

app.post('/listar', async(req, res) => {

  console.log('todos users')

  const todos = await op.todos_user()

  console.log(todos)
    var data = {
      code: 200,
      mensage: 'Lista',
      dados: dados
    };
    res.json(data);
 
 
});

app.post('/cadastro', async(req, res) => {
  let aba=req.body.user_usuario;
  let validar=false
   if(req.body.user_usuario){ 
      if(req.body.user_nome){ 
          if(req.body.user_senha){
            let dados = {'Usuario':req.body.user_usuario, 
            'Nome':req.body.user_nome,
            'senha':req.body.user_senha
            };
            console.log(dados);       
            const existe = await op.Verificar_user(aba)
            console.log(existe)
            if(existe.length > 0){
              validar= true
              console.log('alguma coisa')
            }

            if(validar == false){
              await op.cadastrar_user(dados)
              var data = {
              code: 200,
              mensage: 'Usuário cadastrado com Sucesso'
            
            };
            console.log(dados);
            res.json(data); 
              }else{
              var data = {
                code: 401,
                mensage: 'Username ja esta em uso'
              };
              res.json(data);
              } // aqui termina o  validar
          }else{ // se não do password
            var data = {
              code: 401,
              mensage: 'Coloque uma senha'
            };
            res.json(data);
          } 
      }else{  // se não do nome
            var data = {
              code: 401,
              mensage: 'Coloque um Nome' 
            };
            res.json(data);
           }
  }else{ // se não do Username
          var data = {
              code: 401,
              mensage: 'Coloque um Username'
          };
             res.json(data);
        }


});

app.post('/login', async(req, res) => {
    console.log(req.body); //console to verify the body data received on this endpoint request
    dados= req.body.user_usuario,req.body.user_senha;

    if(req.body.user_usuario){      
      if(req.body.user_senha){

        const existe = await op.Verificar_user(req.body.user_usuario)
        console.log(existe)

          if(existe){
            const achou = await op.verificar_senha(dados)
            console.log(achou)
            if(achou){
              data = {
                code: 200,
                mensage: 'Usuário Logado com Sucesso',
                Nome:req.body.user_usuario
              };
              
              res.json(data);
            }else{
              data = {
                code: 401,
                mensage: 'Senha errada'
              };
              
              res.json(data);
            }
          }else{
            data = {
              code: 401,
              mensage: 'Usuário errado'
                   };
          
          res.json(data);
          }
     }else{ data = {
      code: 401,
      mensage: 'Senha não informada'
      };
      
      res.json(data); } 
    }else{ 
      data = {
        code: 401,
        mensage: 'Usuário não informado'
      };
      
      res.json(data); 
    }
 
});




app.listen(8080, function () {
  console.log('http://localhost:8080/');
});



  
  
  