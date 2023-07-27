const db = require('./db');

const todosuser = async() =>{
  sql = 'SELECT * FROM usuarios'
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
    sql = 'UPDATE INTO usuarios VALUES (?, ?, ?) WHERE id=?'
    res = [clien.user_nome, clien.user_usuario, clien.user_senha,id]
    const linhas = await db.query(sql, res)
  
     return await linhas

}

const deletaruser = async(id) =>{
    sql = 'DELETE FROM usuarios WHERE id=?'
    res = [id]
    const linhas = await db.query(SQL, res)
  
     return await linhas

}




module.exports = {todosuser, cadastraruser, atualizaruser, deletaruser}

//EXEMPLO DE COMO FICARIA NO CONTROLLER
(async()=>{
    const op = require('./users');
    


    await op.cadastraruser({user_nome, user_usuario, user_senha})
    
    await op.atualizaruser(id,{user_nome, user_usuario, user_senha})

    console.log('todos users')
    const todos=await op.todosuser()
    console.log(todos)

    await op.deletaruser(id)


    })