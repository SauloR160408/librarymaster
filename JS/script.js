/* estrutura do banco de dados livro
{
id: Date.now(),
nota:5,
titulo: "...",
serie:false,
genero: "...",
subgenero: "...",
autor: "...",
paginas: 0,
editora: "...",
dataPublicacao: "...",
isbn: "...",
tipo: "...",
faixaEtaria: "...",
temas: [],
sobre: "...",
imagem: "...",
disponivel: true
lido:false,
quero:false,
lendo:false,
favorito:false
}
*/

const tabs = document.querySelectorAll(".tab");
const abas = document.querySelectorAll(".aba");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // remove ativo
    tabs.forEach((t) => t.classList.remove("active"));
    abas.forEach((a) => a.classList.remove("active"));

    // ativa clicado
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

/* =========================
BANCO DE DADOS COMPLETO
========================= */

const livrosPadrao = [
  {
    id: 1,
    nota: 5,
    todasNotas: [5], // Nota inicial
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
  },

  {
    id: 2,
    nota: 5,
    todasNotas: [5], // Nota inicial
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
  },

  {
    id: 3,
    nota: 4,
    todasNotas: [4], // Nota inicial
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
  },
];

/* =========================
LOGIN
========================= */

let botao = document.getElementById("Cadastrar")

botao.addEventListener("click", cadastrar)

function cadastrar(){

    let nome = document.getElementById("nome").value
    let email = document.getElementById("email").value
    let matricula = document.getElementById("matricula").value

    let tipo = "aluno"

    // IDENTIFICA BIBLIOTECÁRIO
    if(
        email.includes("@librarymaster.com")
        ||
        matricula.startsWith("BIB")
    ){
        tipo = "bibliotecario"
    }

    let usuario = {

        id: Date.now(),

        nome: nome,
        email: email,
        matricula: matricula,

        tipo: tipo,

        livrosLidos: [],
        livrosSalvos: [],
        emprestimos: [],
        multas: []
    }

    // PEGA USUÁRIOS ANTIGOS
    let usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || []

    usuarios.push(usuario)

    usuarios.push(usuario)

localStorage.setItem(
    "usuarios",
    JSON.stringify(usuarios)
)

// NOVO
localStorage.setItem(
    "usuarioLogado",
    JSON.stringify(usuario)
)

alert("Cadastro realizado!")
}

const usuarioLogado =
JSON.parse(localStorage.getItem("usuarioLogado"))

const bibliotecario =
usuarioLogado?.tipo === "bibliotecario"


/* =========================
ADD/DEL LIVRO
========================= */

if(bibliotecario){
    document
    .getElementById("add-book")
    .classList.remove("hidden")
}

const modalAdd =
document.getElementById("modalAdd")

document
.getElementById("add-book")
.addEventListener("click", ()=>{

    modalAdd.classList.remove("hidden")

})

document
.getElementById("fecharAdd")
.addEventListener("click", ()=>{

    modalAdd.classList.add("hidden")

})


document
.getElementById("salvarLivro")
.addEventListener("click", adicionarLivro)

function adicionarLivro(){

    let livros =
    JSON.parse(localStorage.getItem("biblioteca"))

    const novoLivro = {

        id: Date.now(),

        nota: 0,
        todasNotas: [],
        comentarios: [],

        titulo:
        document.getElementById("novoTitulo").value,

        serie: false,

        genero:
        document.getElementById("novoGenero").value,

        subgenero:
        document.getElementById("novoSubgenero").value,

        autor:
        document.getElementById("novoAutor").value,

        paginas:
        Number(document.getElementById("novoPaginas").value),

        editora:
        document.getElementById("novaEditora").value,

        dataPublicacao:
        document.getElementById("novoAno").value,

        isbn:
        document.getElementById("novoISBN").value,

        tipo:
        document.getElementById("novoTipo").value,

        faixaEtaria:
        document.getElementById("novaFaixa").value,

        temas:
        document.getElementById("novoTema")
        .value
        .split(","),

        sobre:
        document.getElementById("novaSobre").value,

        imagem:
        document.getElementById("novaImagem").value,

        disponivel: true,

        lido:false,
        quero:false,
        lendo:false,
        favorito:false
    }

    livros.push(novoLivro)

    localStorage.setItem(
        "biblioteca",
        JSON.stringify(livros)
    )

    modalAdd.classList.add("hidden")

    renderizar()
}

function removerLivro(id){

    const confirmar =
    confirm("Deseja remover este livro?")

    if(!confirmar) return

    let livros =
    JSON.parse(localStorage.getItem("biblioteca"))

    livros =
    livros.filter((livro)=> livro.id !== id)

    localStorage.setItem(
        "biblioteca",
        JSON.stringify(livros)
    )

    renderizar()
}

/* =========================
INICIALIZAÇÃO
========================= */

if (!localStorage.getItem("biblioteca")) {
  localStorage.setItem("biblioteca", JSON.stringify(livrosPadrao));
}

/* =========================
GERAR ESTRELAS
========================= */

function gerarEstrelas(nota) {
  const totalEstrelas = Number(nota) || 0;

  let estrelas = "";

  for (let i = 0; i < 5; i++) {
    if (i < totalEstrelas) {
      estrelas += `<img src="imagens/star-cheia-removebg-preview.png">`;
    } else {
      estrelas += `<img src="imagens/star-oca-removebg-preview.png">`;
    }
  }

  return estrelas;
}

/* =========================
FUNÇAO QUERO LER E FAVORITO
========================= */
function toggleQuero(id) {
  let livros = JSON.parse(localStorage.getItem("biblioteca"));

  let livro = livros.find((l) => l.id === id);

  // 🔁 INVERTE VALOR
  livro.quero = !livro.quero;

  // salva
  localStorage.setItem("biblioteca", JSON.stringify(livros));

  // atualiza tela
  renderizar();
}

function toggleFavorito(id) {
  let livros = JSON.parse(localStorage.getItem("biblioteca"));

  let livro = livros.find((l) => l.id === id);

  // 🔁 INVERTE VALOR
  livro.favorito = !livro.favorito;

  // salva
  localStorage.setItem("biblioteca", JSON.stringify(livros));

  // atualiza tela
  renderizar();
}

/* =========================
RENDERIZAR LIVROS
========================= */

function renderizar() {
  const livros = JSON.parse(localStorage.getItem("biblioteca"));

  const html = livros

    .filter((livro) => {
      // BUSCA
      const busca = document.getElementById("pesq").value.toLowerCase();

      // FILTROS
      const genero = document.getElementById("filtro").value;
      const subgenero = document.getElementById("sgen").value;
      const tipo = document.getElementById("tipo").value;
      const faixa = document.getElementById("Fet").value;
      const notaMin = Number(document.getElementById("nota").value);

      // TEMAS
      const temasSelecionados = Array.from(
        document.querySelectorAll("#tema input:checked"),
      ).map((t) => t.value.toLowerCase());

      // PESSOAIS
      const pessoaisSelecionados = Array.from(
        document.querySelectorAll("#pessoais input:checked"),
      ).map((p) => p.value);

      // BUSCA
      const filtroBusca =
        livro.titulo.toLowerCase().includes(busca) ||
        livro.autor.toLowerCase().includes(busca);

      // FILTROS
      const filtroGenero = !genero || livro.genero === genero;
      const filtroSub = !subgenero || livro.subgenero === subgenero;
      const filtroTipo = !tipo || livro.tipo === tipo;
      const filtroFaixa = !faixa || livro.faixaEtaria === faixa;

      // NOTA
      const filtroNota = livro.nota >= notaMin;

      // TEMAS
      const filtroTemas =
        temasSelecionados.length === 0 ||
        temasSelecionados.some((t) => livro.temas.includes(t));

      // PESSOAIS
      const filtroPessoais =
        pessoaisSelecionados.length === 0 ||
        pessoaisSelecionados.some((p) => livro[p] === true);

      // ✅ FINAL
      return (
        filtroBusca &&
        filtroGenero &&
        filtroSub &&
        filtroTipo &&
        filtroFaixa &&
        filtroNota &&
        filtroTemas &&
        filtroPessoais
      );
    })

    .sort((a, b) => {
      const ordem = document.getElementById("ord").value;

      if (ordem === "az") {
        return a.titulo.localeCompare(b.titulo);
      }

      if (ordem === "nota") {
        return b.nota - a.nota;
      }

      if (ordem === "recente") {
        return Number(b.dataPublicacao) - Number(a.dataPublicacao);
      }

      return 0;
    })

    .map(
      (livro) => `

<div class="book">

<div class="imagem">
<img src="${livro.imagem}" alt="capa do livro ${livro.titulo}">
</div>

<div class="info">

<div class="cab-b">

<h2 class="titulo">${livro.titulo}</h2>

<div class="stars">
${gerarEstrelas(livro.nota)}
</div>

<p class="genero">
${livro.genero} ${livro.subgenero ? "/ " + livro.subgenero : ""}
</p>

<p class="autor">${livro.autor}</p>

<p class="sobre">${livro.sobre}</p>

</div>

<div class="btn-info">

<button class="emprestar"
onclick="emprestarLivro(${livro.id})">
${livro.disponivel ? "Emprestar" : "Indisponível"} </button>

<button class="ver-mais" onclick="verMais(${livro.id})">Ver mais</button>

<button class="icons" onclick="toggleQuero(${livro.id})">
  <img src="${
    livro.quero
      ? "imagens/quero-cheia-removebg-preview.png"
      : "imagens/quero-oca-removebg-preview.png"
  }">
</button>

<button class="icons" onclick="toggleFavorito(${livro.id})">
  <img src="${
    livro.favorito
      ? "imagens/star-cheia-removebg-preview.png"
      : "imagens/star-oca-removebg-preview.png"
  }">
</button>

</div>

</div>

${bibliotecario ? `

<button
class="remover-livro"
onclick="removerLivro(${livro.id})">

🗑

</button>

` : ""}

</div>

`,
    )
    .join("");

  document.getElementById("book").innerHTML = html;
}

/* =========================
EVENTOS
========================= */

// busca (digitação)
document.getElementById("pesq").addEventListener("input", renderizar);

// TODOS OS SELECTS
document.querySelectorAll("select").forEach((el) => {
  el.addEventListener("change", renderizar);
});

// CHECKBOXES (temas + pessoais)
document.querySelectorAll("#tema input, #pessoais input").forEach((el) => {
  el.addEventListener("change", renderizar);
});

// BOTÃO REMOVER FILTROS
document.getElementById("dlt").addEventListener("click", () => {
  // limpa selects
  document.querySelectorAll("select").forEach((s) => (s.value = ""));

  // limpa checkboxes
  document
    .querySelectorAll("input[type='checkbox']")
    .forEach((c) => (c.checked = false));

  // limpa busca
  document.getElementById("pesq").value = "";

  // renderiza tudo de novo
  renderizar();
});

/* =========================
EMPRESTAR LIVRO
========================= */

function emprestarLivro(id) {
  let emprestimo = JSON.parse(localStorage.getItem("emprestimoAtivo"));

  if (emprestimo) {
    alert("Você já tem um livro emprestado!");
    return;
  }

  let livros = JSON.parse(localStorage.getItem("biblioteca"));

  let livro = livros.find((l) => l.id === id);

  livro.disponivel = false;

  localStorage.setItem("biblioteca", JSON.stringify(livros));

  localStorage.setItem("emprestimoAtivo", JSON.stringify(livro));

  alert("Livro emprestado!");

  renderizar();
}

/* =========================
INICIAR
========================= */

renderizar();

 function verMais(id) {
  const livros = JSON.parse(localStorage.getItem("biblioteca"));
  const livro = livros.find((l) => l.id === id);

  // Inicializa comentários se não existirem
  if (!livro.comentarios) livro.comentarios = [];

  const vm = document.querySelector(".vm");
  const espaco = vm.querySelector(".espacovm");

  espaco.innerHTML = `
    <div class="modal-livro">
      <button class="fechar" onclick="addhid()">X</button>
      
      <div class="modal-grid">
        <div class="modal-esquerda">
          <img src="${livro.imagem}" alt="${livro.titulo}">
          <div class="meta-info">
            <p><strong>ISBN:</strong> ${livro.isbn || 'Não informado'}</p>
            <p><strong>Páginas:</strong> ${livro.paginas}</p>
            <p><strong>Ano:</strong> ${livro.dataPublicacao}</p>
          </div>
        </div>

        <div class="modal-direita">
          <h2>${livro.titulo}</h2>
          <p class="autor-modal">por ${livro.autor}</p>
          <span class="tag-genero">${livro.genero}</span>
          
          <div class="sinopse-container">
            <h3>Sinopse</h3>
            <p>${livro.sobre}</p>
          </div>

          <div class="comentarios-section">
            <h3>Comentários (${livro.comentarios.length})</h3>
            <div id="lista-comentarios">
              ${livro.comentarios.map(c => `<div class="comentario-item">${c}</div>`).join('')}
            </div>
            <div class="add-comentario">
    <select id="nova-nota-usuario">
        <option value="5">5 Estrelas</option>
        <option value="4">4 Estrelas</option>
        <option value="3">3 Estrelas</option>
        <option value="2">2 Estrelas</option>
        <option value="1">1 Estrela</option>
    </select>
    <input type="text" id="novo-comentario" placeholder="Escreva sua resenha...">
    <button onclick="salvarComentario(${livro.id})">Enviar</button>
</div>
          </div>
        </div>
      </div>
    </div>
  `;

  vm.classList.remove("hidden");
}

function salvarComentario(id) {
    const inputTexto = document.getElementById("novo-comentario");
    const inputNota = document.getElementById("nova-nota-usuario");
    
    const texto = inputTexto.value.trim();
    const notaDada = Number(inputNota.value);

    if (texto === "") return;

    let livros = JSON.parse(localStorage.getItem("biblioteca"));
    let livro = livros.find(l => l.id === id);

    // 1. Inicializa os arrays se não existirem
    if (!livro.comentarios) livro.comentarios = [];
    if (!livro.todasNotas) livro.todasNotas = [livro.nota]; // Começa com a nota original

    // 2. Adiciona o novo comentário e a nova nota
    livro.comentarios.push(texto);
    livro.todasNotas.push(notaDada);

    // 3. CÁLCULO DA MÉDIA ARREDONDADA
    const soma = livro.todasNotas.reduce((acc, n) => acc + n, 0);
    const media = soma / livro.todasNotas.length;
    
    // Math.round arredonda para o inteiro mais próximo (ex: 3.5 vira 4)
    livro.nota = Math.round(media);

    // 4. Salva e atualiza a interface
    localStorage.setItem("biblioteca", JSON.stringify(livros));
    
    renderizar(); // Atualiza a lista de livros no fundo
    verMais(id);   // Atualiza o modal aberto
}

function addhid() {
  document.querySelector(".vm").classList.add("hidden");
}
