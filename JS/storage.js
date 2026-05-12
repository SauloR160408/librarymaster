// Funções de Banco de Dados (LocalStorage)
function getLivrosDB() {
  return JSON.parse(localStorage.getItem("biblioteca")) || [];
}

function saveLivrosDB(livros) {
  localStorage.setItem("biblioteca", JSON.stringify(livros));
}

function getUsuarioLogado() {
  return JSON.parse(localStorage.getItem("usuarioLogado"));
}

// Variável global para checar se é bibliotecário
const usuarioLogado = getUsuarioLogado();
const bibliotecario = usuarioLogado?.tipo === "bibliotecario";