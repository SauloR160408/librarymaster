/* estrutura do banco de dados
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
📚 BANCO DE DADOS COMPLETO
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
disponivel:true
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
disponivel:true
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
disponivel:true
}

];

/* =========================
🧠 INICIALIZAÇÃO
========================= */

if(!localStorage.getItem("biblioteca")){
localStorage.setItem(
"biblioteca",
JSON.stringify(livrosPadrao)
);
}

/* =========================
⭐ GERAR ESTRELAS
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
🔄 RENDERIZAR LIVROS
========================= */

function renderizar(){

const livros = JSON.parse(
localStorage.getItem("biblioteca")
);

const busca = document
.getElementById("pesq")
.value
.toLowerCase();

const genero = document
.getElementById("filtro")
.value;

const html = livros

.filter(livro => {

const filtroBusca =

livro.titulo.toLowerCase().includes(busca)
||
livro.autor.toLowerCase().includes(busca);

const filtroGenero =
!genero || livro.genero === genero;

return filtroBusca && filtroGenero;

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

<p class="sobre">
${livro.sobre}
</p>

</div>

<div class="btn-info">

<button
class="emprestar"
onclick="emprestarLivro(${livro.id})"

>

${livro.disponivel ? "Emprestar" : "Indisponível"} </button>

<button class="ver-mais">
Ver mais
</button>

</div>

</div>

</div>

`).join("");

document.getElementById("book").innerHTML = html;

}

/* =========================
🔍 EVENTOS
========================= */

document
.getElementById("pesq")
.addEventListener("input", renderizar);

document
.getElementById("filtro")
.addEventListener("change", renderizar);

/* =========================
📖 EMPRESTAR LIVRO
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
🚀 INICIAR
========================= */

renderizar();

