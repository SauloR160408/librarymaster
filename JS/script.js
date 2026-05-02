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
id:1,
nota:5,
titulo:"Harry Potter e a Pedra Filosofal",
serie:true,
genero:"fantasia",
subgenero:"magia",
autor:"J.K. Rowling",
paginas:264,
editora:"Rocco",
dataPublicacao:"1997",
isbn:"9788532511010",
tipo:"serie",
faixaEtaria:"infantil",
temas:["magia","aventura"],
sobre:"Harry descobre que é um bruxo e vai para Hogwarts.",
imagem:"imagens/harrypoter-capa.jpg",
disponivel:true,
lido:false,
quero:false,
lendo:false,
favorito:false
},

{
id:2,
nota:5,
titulo:"1984",
serie:false,
genero:"distopia",
subgenero:"politico",
autor:"George Orwell",
paginas:328,
editora:"Companhia das Letras",
dataPublicacao:"1949",
isbn:"9788535914849",
tipo:"livro unico",
faixaEtaria:"adulto",
temas:["politica","controle"],
sobre:"Um regime totalitário controla tudo.",
imagem:"imagens/1984.jpg",
disponivel:true,
lido:false,
quero:false,
lendo:false,
favorito:false
},

{
id:3,
nota:4,
titulo:"Drácula",
serie:false,
genero:"terror",
subgenero:"gotico",
autor:"Bram Stoker",
paginas:418,
editora:"Penguin",
dataPublicacao:"1897",
isbn:"9780141439846",
tipo:"livro unico",
faixaEtaria:"adulto",
temas:["vampiros","mistério"],
sobre:"O clássico vampiro da literatura.",
imagem:"imagens/dracula.jpg",
disponivel:true,
lido:false,
quero:false,
lendo:false,
favorito:false
}

];

/* =========================
INICIALIZAÇÃO
========================= */

if(!localStorage.getItem("biblioteca")){
localStorage.setItem(
"biblioteca",
JSON.stringify(livrosPadrao)
);
}

/* =========================
GERAR ESTRELAS
========================= */

function gerarEstrelas(nota){

const totalEstrelas = Number(nota) || 0;

let estrelas = "";

for(let i = 0; i < 5; i++){

if(i < totalEstrelas){
estrelas += `<img src="imagens/star-cheia-removebg-preview.png">`;
}else{
estrelas += `<img src="imagens/star-oca-removebg-preview.png">`;
}

}

return estrelas;

}

/* =========================
FUNÇAO QUERO LER E FAVORITO
========================= */
function toggleQuero(id){

let livros = JSON.parse(localStorage.getItem("biblioteca"));

let livro = livros.find(l => l.id === id);

// 🔁 INVERTE VALOR
livro.quero = !livro.quero;

// salva
localStorage.setItem("biblioteca", JSON.stringify(livros));

// atualiza tela
renderizar();

}

function toggleFavorito(id){

let livros = JSON.parse(localStorage.getItem("biblioteca"));

let livro = livros.find(l => l.id === id);

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

function renderizar(){

const livros = JSON.parse(
localStorage.getItem("biblioteca")
);

const html = livros

.filter(livro => {

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
document.querySelectorAll("#tema input:checked")
).map(t => t.value.toLowerCase());

// PESSOAIS
const pessoaisSelecionados = Array.from(
document.querySelectorAll("#pessoais input:checked")
).map(p => p.value);

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
temasSelecionados.some(t => livro.temas.includes(t));

// PESSOAIS
const filtroPessoais =
pessoaisSelecionados.length === 0 ||
pessoaisSelecionados.some(p => livro[p] === true);

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

if(ordem === "az"){
return a.titulo.localeCompare(b.titulo);
}

if(ordem === "nota"){
return b.nota - a.nota;
}

if(ordem === "recente"){
return Number(b.dataPublicacao) - Number(a.dataPublicacao);
}

return 0;

})

.map(livro => `

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

<button class="ver-mais">Ver mais</button>

<button class="icons" onclick="toggleQuero(${livro.id})">
  <img src="${livro.quero 
    ? 'imagens/quero-cheia-removebg-preview.png' 
    : 'imagens/quero-oca-removebg-preview.png'}">
</button>

<button class="icons" onclick="toggleFavorito(${livro.id})">
  <img src="${livro.favorito 
    ? 'imagens/star-cheia-removebg-preview.png' 
    : 'imagens/star-oca-removebg-preview.png'}">
</button>


</div>

</div>

</div>

`).join("");


document.getElementById("book").innerHTML = html;
}

/* =========================
EVENTOS
========================= */

// busca (digitação)
document
.getElementById("pesq")
.addEventListener("input", renderizar);

// TODOS OS SELECTS
document.querySelectorAll("select").forEach(el => {
el.addEventListener("change", renderizar);
});

// CHECKBOXES (temas + pessoais)
document.querySelectorAll("#tema input, #pessoais input").forEach(el => {
el.addEventListener("change", renderizar);
});

// BOTÃO REMOVER FILTROS
document.getElementById("dlt").addEventListener("click", () => {

// limpa selects
document.querySelectorAll("select").forEach(s => s.value = "");

// limpa checkboxes
document.querySelectorAll("input[type='checkbox']").forEach(c => c.checked = false);

// limpa busca
document.getElementById("pesq").value = "";

// renderiza tudo de novo
renderizar();

});



/* =========================
EMPRESTAR LIVRO
========================= */

function emprestarLivro(id){

let emprestimo = JSON.parse(
localStorage.getItem("emprestimoAtivo")
);

if(emprestimo){
alert("Você já tem um livro emprestado!");
return;
}

let livros = JSON.parse(
localStorage.getItem("biblioteca")
);

let livro = livros.find(
l => l.id === id
);

livro.disponivel = false;

localStorage.setItem(
"biblioteca",
JSON.stringify(livros)
);

localStorage.setItem(
"emprestimoAtivo",
JSON.stringify(livro)
);

alert("Livro emprestado!");

renderizar();

}

/* =========================
INICIAR
========================= */

renderizar();

 