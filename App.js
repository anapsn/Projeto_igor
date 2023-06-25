const express = require('express');
const app = express();
const port = 3000;
const database = require('./database');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});



// Rota para exibir o formulário de cadastro
app.get('/cadastro', (req, res) => {
  res.sendFile(__dirname + '/public/cadastro.html');
});
// Rota para exibir o formulário de login
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});


database.conectar();

app.post('/cadastro', (req, res)=>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const number = req.body.number;
    const password = req.body.password;
    const gender = req.body.gender;

    database.cadastrarUsuario(firstname, lastname, email, number, password, gender);
    res.send('Cadastro realizado com sucesso!');


});

app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log('Email:', email);
  console.log('Senha:', password);

  const loginValido = await database.validarLogin(email, password);

  if (loginValido) {
    res.send('Login bem-sucedido!');
  } else {
    res.send('Credenciais inválidas. Tente novamente.');
  }
});