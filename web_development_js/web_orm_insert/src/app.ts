import { Livros } from "./models/model";
import { Service } from "./models/services";



const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(bodyParser.urlencoded({ extended: false }));

const service = new Service();
service.start();

app.use(express.static('src/public'));

app.get('/', listProjectHandler);
app.post('/cadastroLivro', addProjectHandler);
app.get('/login', logar);
app.get('/cadastro', cadastroUsuario);
app.get('/admin', admin);
app.get('/cadastrarCategoria', cadastrarCategoria);
app.get('/cadastroLivro', cadastroLivro);
app.get('/pesquisar', listProjectHandler);

app.listen(port, listenHandler);

function addProjectHandlerForm(req, res) {
  res.render('cadastroLivro.ejs');
}

function addProjectHandler(req, res) {
  let novo_livro = new Livros();
  novo_livro.titulo = req.body.titulo;
  novo_livro.autor = req.body.autor;
  novo_livro.categoria = req.body.categoria;
  novo_livro.data = req.body.data;
  service.insert(novo_livro);
  res.render('adicionar_livro_confirm.ejs', { livro: novo_livro });
}

async function listProjectHandler(req, res) {
  let livros = await service.listAll();

  // Verifica se há um termo de pesquisa na query da requisição
  const termoPesquisa = req.query.termoPesquisa;
  if (termoPesquisa) {
    service.searchBooks(termoPesquisa)
      .then((livrosEncontrados) => {
        res.render('admin.ejs', { listar_projetos: livros, livroEncontrado: livrosEncontrados});
      })
      .catch((error) => {
        console.error(error);
        res.render('admin.ejs', { listar_projetos: [], livroEncontrado: null });
      });
  } else {
    res.render('admin.ejs', { listar_projetos: livros, livroEncontrado: [] });
  }
}

function listenHandler() {
  console.log(`Escutando na porta ${port}!`);
}

function logar(req, res) {
  res.render('login.ejs', {});
}

function cadastroUsuario(req, res) {
  res.render('cadastroUsuario.ejs', {});
}

function admin(req, res) {
  service.listAll().then((livros) => {
    res.render('admin.ejs', { listar_projetos: livros, livroEncontrado: [] });
  }).catch((error) => {
    console.error(error);
    res.render('admin.ejs', { listar_projetos: [], livroEncontrado: [] });
  });
}

function cadastrarCategoria(req, res) {
  res.render('cadastrarCategoria.ejs', {});
}

function cadastroLivro(req, res) {
  res.render('cadastroLivro.ejs', {});
}


