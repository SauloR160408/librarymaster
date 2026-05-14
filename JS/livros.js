const livrosPadrao = [
  {
    id: 1,
    nota: 5,
    todasNotas: [5],
    comentarios: [],
    titulo: "Harry Potter e a Pedra Filosofal",
    serie: true,
    genero: "fantasia",
    subgenero: "magia",
    autor: "J.K. Rowling",
    paginas: 264,
    editora: "Rocco",
    dataPublicacao: "1997",
    isbn: "9788532511010",
    tipo: "serie",
    faixaEtaria: "infantil",
    temas: ["magia", "aventura"],
    sobre: "Harry descobre que é um bruxo e vai para Hogwarts.",
    imagem: "imagens/harrypoter-capa.jpg",
    disponivel: true,
    lido: false,
    quero: false,
    lendo: false,
    favorito: false,
    emprestadoPara: null,
  },
  {
    id: 2,
    nota: 5,
    todasNotas: [5],
    comentarios: [],
    titulo: "1984",
    serie: false,
    genero: "distopia",
    subgenero: "politico",
    autor: "George Orwell",
    paginas: 328,
    editora: "Companhia das Letras",
    dataPublicacao: "1949",
    isbn: "9788535914849",
    tipo: "livro unico",
    faixaEtaria: "adulto",
    temas: ["politica", "controle"],
    sobre: "Um regime totalitário controla tudo.",
    imagem: "imagens/1984.jpg",
    disponivel: true,
    lido: false,
    quero: false,
    lendo: false,
    favorito: false,
    emprestadoPara: null,
  },
  {
    id: 3,
    nota: 4,
    todasNotas: [4],
    comentarios: [],
    titulo: "Drácula",
    serie: false,
    genero: "terror",
    subgenero: "gotico",
    autor: "Bram Stoker",
    paginas: 418,
    editora: "Penguin",
    dataPublicacao: "1897",
    isbn: "9780141439846",
    tipo: "livro unico",
    faixaEtaria: "adulto",
    temas: ["vampiros", "mistério"],
    sobre: "O clássico vampiro da literatura.",
    imagem: "imagens/dracula.jpg",
    disponivel: true,
    lido: false,
    quero: false,
    lendo: false,
    favorito: false,
    emprestadoPara: null,
  },
];

function adicionarLivro() {
  let livros = getLivrosDB();
  const titulo = document.getElementById("novoTitulo").value;
  const autor = document.getElementById("novoAutor").value;

  if (!titulo || !autor) {
    alert("Por favor, preencha pelo menos o Título e o Autor!");
    return;
  }

  const novoLivro = {
    id: Date.now(),
    nota: 0,
    todasNotas: [],
    comentarios: [],
    titulo: titulo,
    autor: autor,
    serie: false,
    genero: document.getElementById("novoGenero").value,
    subgenero: document.getElementById("novoSubgenero").value,
    paginas: Number(document.getElementById("novoPaginas").value),
    editora: document.getElementById("novaEditora").value,
    dataPublicacao: document.getElementById("novoAno").value,
    isbn: document.getElementById("novoISBN").value,
    tipo: document.getElementById("novoTipo").value,
    faixaEtaria: document.getElementById("novaFaixa").value,
    temas: document.getElementById("novoTema").value.split(","),
    sobre: document.getElementById("novaSobre").value,
    imagem: document.getElementById("novaImagem").value,
    disponivel: true,
    lido: false,
    quero: false,
    lendo: false,
    favorito: false,
    emprestadoPara: null,
  };

  livros.push(novoLivro);
  saveLivrosDB(livros);
  alert("Livro cadastrado!");
  document.getElementById("modalAdd").classList.add("hidden");
  renderizar();
}

function removerLivro(id) {
  if (!confirm("Deseja remover este livro?")) return;
  let livros = getLivrosDB().filter((livro) => livro.id !== id);
  saveLivrosDB(livros);
  renderizar();
}

function toggleFavorito(idlivro) {
  let usuario = pegarUsuarioLogado();

  if (!usuario) {
    alert("Faça login");
    return;
  }

  if (!usuario.favoritos) {
    usuario.favoritos = [];
  }

  const existe = usuario.favoritos.includes(idLivro);

  if (existe) {
    usuario.favoritos = usuario.favoritos.filter((id) => id !== idLivro);
  } else {
    usuario.favoritos.push(idLivro);
  }

  salvarUsuarioLogado(usuario);

  renderizar();
}

function toggleFavorito(idLivro) {
  let usuario = pegarUsuarioLogado();

  if (!usuario) {
    alert("Faça login");
    return;
  }

  if (!usuario.quero) {
    usuario.quero = [];
  }

  const existe = usuario.quero.includes(idLivro);

  if (existe) {
    usuario.quero = usuario.quero.filter((id) => id !== idLivro);
  } else {
    usuario.quero.push(idLivro);
  }

  salvarUsuarioLogado(usuario);

  renderizar();
}

function emprestarLivro(id) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const livros = JSON.parse(localStorage.getItem("biblioteca")) || [];

  let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  /* impedir bibliotecário */

  if (usuarioLogado.tipo === "bibliotecario") {
    alert("Bibliotecário não pode emprestar livros.");

    return;
  }

  /* impedir múltiplos empréstimos */

  if (usuarioLogado.emprestimoAtivo) {
    alert("Você já possui um empréstimo ativo.");

    return;
  }

  /* encontrar livro */

  const livro = livros.find((l) => l.id === id);

  if (!livro) {
    alert("Livro não encontrado.");

    return;
  }

  /* verificar disponibilidade */

  if (!livro.disponivel) {
    alert("Livro indisponível.");

    return;
  }

  /* datas */

  const hoje = new Date();

  const devolucao = new Date();

  devolucao.setDate(hoje.getDate() + 14);

  /* objeto empréstimo */

  const emprestimo = {
    livroId: livro.id,

    dataEmprestimo: hoje,

    dataDevolucao: devolucao,

    renovado: false,
  };

  /* salvar empréstimo ativo */

  usuarioLogado.emprestimoAtivo = emprestimo;

  /* salvar no histórico */

  usuarioLogado.historicoEmprestimos.push({
    ...emprestimo,

    devolvido: false,
  });

  /* atualizar livro */

  livro.disponivel = false;

  livro.emprestadoPara = usuarioLogado.id;

  /* atualizar usuário no array */

  const indexUsuario = usuarios.findIndex((u) => u.id === usuarioLogado.id);

  usuarios[indexUsuario] = usuarioLogado;

  /* salvar */

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  localStorage.setItem("biblioteca", JSON.stringify(livros));

  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

  alert("Livro emprestado com sucesso!");

  renderizar();

  renderizarTelaEmprestimo();
}
