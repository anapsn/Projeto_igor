const express = require('express');
const app = express();
const port = 3000;
const database = require('./database');
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'seu_segredo_aqui',
  resave: false,
  saveUninitialized: false
}));

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

app.get('/cardapio', (req, res) => {
  const usuario = req.session.usuario;

  if (usuario) {
    // O usuário está logado
    res.sendFile(__dirname + '/public/cardapio.html');
  } else {
    // O usuário não está logado
    res.redirect('/login'); // Redirecionar para a página de login
  }
});


app.get('/perfil', (req, res) => {
  const usuario = req.session.usuario;

  if (usuario) {
    // O usuário está logado
    res.send(`Bem-vindo(a) ao seu perfil, ${usuario.primeiro_nome} ${usuario.ultimo_nome} ${usuario.telefone} ${usuario.email}!`);
  } else {
    // O usuário não está logado
    res.send('Faça login para acessar o perfil.');
  }
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

  const usuario = await database.validarLogin(email, password);

  if (usuario) {
    req.session.usuario = usuario; // Salvar dados do usuário na sessão
    console.log('Usuario logado com sucesso!');
    console.log('Sessão iniciada:');
    console.log('nome:', usuario.primeiro_nome, usuario.ultimo_nome);
    console.log('email:', usuario.email);
    console.log('email:', usuario.telefone);

    // Redirecionar para a página de perfil após o login
    res.redirect('/cardapio.html');
  } else {
    res.send('Credenciais inválidas. Tente novamente.');
  }
});

