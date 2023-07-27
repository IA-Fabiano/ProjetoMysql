const mysql = require("mysql");

const con = mysql.createConnection({
    host: 'localhost', // O host do banco. Ex: localhost
    user: 'adm', // Um usuário do banco. Ex: user 
    password: '12345', // A senha do usuário. Ex: user123
    database: 'dblogin' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
});

//verifica conexao com o banco
con.connect((err) => {
    if (err) {
    console.log('Erro connecting to database...', err)
    return
    }
    console.log('Connection established!')
});

module.exports = con;