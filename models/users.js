const db = require('./db');

const todosuser = async() =>{
  sql = 'SELECT * FROM usuarios ORDER BY user_id DESC'
  const linhas = await db.query(sql)

   return await linhas


}

const cadastraruser = async(clien) =>{
    sql = 'INSERT INTO usuarios VALUES (?, ?, ?)'
    res = [clien.user_nome, clien.user_usuario, clien.user_senha]
    const linhas = await db.query(sql, res)
  
     return await linhas
  
  
}

const atualizaruser = async(id,clien) =>{
    sql = 'UPDATE INTO usuarios VALUES (?, ?, ?) WHERE user_id=?'
    res = [clien.user_nome, clien.user_usuario, clien.user_senha,id]
    const linhas = await db.query(sql, res)
  
     return await linhas

}

const deletaruser = async(id) =>{
    sql = 'DELETE FROM usuarios WHERE user_id=?'
    res = [id]
    const linhas = await db.query(SQL, res)
  
     return await linhas

}

const Verificaruser = async(clien) =>{
    sql = 'SELECT * FROM usuarios WHERE user_usuario=?'
    res = [clien.user_usuario]
    const linhas = await db.query(SQL, res)
  
     return await linhas

}

const verificarsenha = async(clien) =>{
    sql = 'SELECT * FROM usuarios WHERE user_usuario=? AND user_senha=?'
    res = [clien.user_usuario, clien.user_senha]
    const linhas = await db.query(SQL, res)
  
     return await linhas

}



module.exports = {todosuser, cadastraruser, atualizaruser, deletaruser, verificarsenha, Verificaruser}

//EXEMPLO DE COMO FICARIA NO CONTROLLER
(async()=>{
    const op = require('./users');
    

    // cadastrar novo usuario
    await op.cadastraruser({user_nome, user_usuario, user_senha})

    // editar informações do usuario
    await op.atualizaruser(id,{user_nome, user_usuario, user_senha})

    // verificação de senha
    const achou = await op.verificarsenha({user_usuario, user_senha})
    console.log(achou)

    // verificação de usuario
    const existe = await op.Verificaruser({user_usuario})
    console.log(existe)

    // listar
    console.log('todos users')
    const todos = await op.todosuser()
    console.log(todos)
    
    // deletar
    await op.deletaruser(id)


    })