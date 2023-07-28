const express = require("express");
const app = express();
const bodyParser=require('body-parser');
const cors = require('cors');
const op = require('./users');
// mvc pesquisar

app.use(cors())
// analise/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended:'true'}));


app.post('/deletar', async(req, res){
  id=req.body.ID;
  // Nome usuário senha all
  if(id){
    await op.deletaruser(id)
 
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

app.post('/listar', async(req, res){

  console.log('todos users')

  const todos = await op.todosuser()

  console.log(todos)
    var data = {
      code: 200,
      mensage: 'Lista',
      dados: dados
    };
    res.json(data);
 
 
});

app.post('/cadastro', async(req, res){
   receb=(req.body)
  let validar=false
   if(receb.Username){ 
      if(receb.nome){ 
           if(req.body.Senha){
            let dados = {'Username':req.body.Username, 'Nome':req.body.nome, 'Senha':req.body.Senha};
            console.log(dados)       
            const DB = readFile()

              for (var i = 0; i < DB.clientes.length; i++) { 
                if(req.body.Username == DB.clientes[i].Username){
                validar = true
                console.log("Nice");
                break
               } 
            } 

            if(validar == false){
                fetch('http://localhost:3000/clientes', {
                  method:'POST',
                  body:JSON.stringify(dados),
                  headers:{'Content-Type':'application/json'}
                })

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

app.post('/login', async(req, res) {
    console.log(req.body); //console to verify the body data received on this endpoint request
   

    if(req.body.Username){      
      if(req.body.Senha){
        fetch('http://localhost:3000/clientes', {method:'GET'})
        .then(resposta => resposta.json())
        .then((clientes) => {
        let validar = false
          for (var i = 0; i < clientes.length; i++) { 
            if(req.body.Username == clientes[i].Username){
              validar = true
              break
            }

          }
          console.log(req.body.Username)
          

          if(validar == true){
            if( req.body.Senha == clientes[i].Senha){
              data = {
                code: 200,
                mensage: 'Usuário Logado com Sucesso',
                Nome:clientes[i].Nome
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
        }

        );
    



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



  
  
  