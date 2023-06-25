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
    const query = `SELECT * FROM usuarios WHERE email = '${email}' AND password = '${password}'`;
    const result = await sql.query(query);

    if (result.recordset.length > 0) {
      const usuario = result.recordset[0];
      return {
        primeiro_nome: usuario.firstname,
        ultimo_nome: usuario.lastname,
        email: usuario.email,
        telefone: usuario.number,
      };
    } else {
      return null; // Login inválido
    }
  } catch (error) {
    console.error('Erro ao validar o login:', error);
    return 'Ocorreu um erro ao validar o login'; // Mensagem de erro
  }
}


async function obterDadosUsuario(email) {
  try {
    const request = new sql.Request();
    const query = `SELECT * FROM usuarios WHERE email = '${email}'`;
    const result = await request.query(query);

    if (result.recordset.length > 0) {
      return result.recordset[0]; // Retorna o primeiro registro encontrado
    } else {
      return null; // Usuário não encontrado
    }
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    return null; // Ocorreu um erro ao consultar o banco de dados
  }
}

module.exports = {
  conectar: conectar,
  cadastrarUsuario: cadastrarUsuario,
  validarLogin: validarLogin,
  obterDadosUsuario: obterDadosUsuario
};
