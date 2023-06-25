const sql = require('mssql');

const config = {
  user: 'casadojapa',
  password: '12!@Azure',
  server: 'luizserver.database.windows.net',
  database: 'casa_do_japa',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

async function conectar() {
  try {
    await sql.connect(config);
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro na conexão com o banco de dados:', error);
  }
}

async function cadastrarUsuario(firstname, lastname, email, number, password, gender) {
  try {
    const request = new sql.Request();
    const query = `INSERT INTO usuarios (firstname, lastname, email, number, password, gender) VALUES ('${firstname}', '${lastname}','${email}','${number}','${password}','${gender}')`;
    await request.query(query);
    console.log('Usuário cadastrado com sucesso!');
  } catch (error) {
    console.error('Erro ao cadastrar o usuário:', error);
  }
}

async function validarLogin(email, password) {
  try {
    const query = `SELECT * FROM usuarios WHERE email = '${email}' AND senha = '${password}'`;
    const result = await sql.query(query);

    if (result.recordset.length > 0) {
      return true; // Login válido
    } else {
      return false; // Login inválido
    }
  } catch (error) {
    console.error('Erro ao validar o login:', error);
    return false; // Login inválido (ocorreu um erro)
  }
}

module.exports = {
  conectar: conectar,
  cadastrarUsuario: cadastrarUsuario,
  validarLogin: validarLogin
};
