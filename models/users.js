const bd = require('./sql');
var db = bd.conectiondb();
const todos_user = async() =>{
  sql = 'SELECT * FROM users ORDER BY user_id DESC'
  const linhas = await db.query(sql)

   return await linhas


}

const cadastrar_user = async(clien) =>{
    sql = 'INSERT INTO users VALUES (?, ?, ?)'
    res = [clien.user_nome, clien.user_usuario, clien.user_senha]
    const linhas = await db.query(sql, res)
  
    return await linhas
  
  
}

const atualizar_user = async(id,clien) =>{
    sql = 'UPDATE INTO users VALUES (?, ?, ?) WHERE user_id=?'
    res = [clien.user_nome, clien.user_usuario, clien.user_senha,id]
    const linhas = await db.query(sql, res)
  
    return await linhas

}

const deletar_user = async(id) =>{
    sql = 'DELETE FROM users WHERE user_id=?'
    res = [id]
    const linhas = await db.query(sql, res)
  
    return await linhas

}

const Verificar_user = async(clien) =>{
    sql = 'SELECT * FROM users WHERE user_usuario=?'
   // res = {clien.user_usuario}
    const linhas = await db.query(sql, clien)
  
    return await linhas

}

const verificar_senha = async(clien) =>{
    sql = 'SELECT * FROM users WHERE user_usuario=? AND user_senha=?'
    res = [clien.user_usuario, clien.user_senha]
    const linhas = await db.query(sql, res)
  
    return await linhas

}



module.exports = {todos_user, cadastrar_user, atualizar_user, deletar_user, verificar_senha, Verificar_user}

//EXEMPLO DE COMO FICARIA NO CONTROLLER
/*
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


    }) */