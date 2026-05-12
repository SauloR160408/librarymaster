function renderizar() {
  const livros = getLivrosDB();
  const container = document.getElementById("book");
  if (!container) return; // Só executa se estiver na página da biblioteca

  const busca = document.getElementById("pesq").value.toLowerCase();
  const genero = document.getElementById("filtro").value;
  const subgenero = document.getElementById("sgen").value;
  const tipo = document.getElementById("tipo").value;
  const faixa = document.getElementById("Fet").value;
  const notaMin = Number(document.getElementById("nota").value);

  const html = livros
    .filter((livro) => {
      const temasSel = Array.from(document.querySelectorAll("#tema input:checked")).map(t => t.value.toLowerCase());
      const pessSel = Array.from(document.querySelectorAll("#pessoais input:checked")).map(p => p.value);

      const filtroBusca = livro.titulo.toLowerCase().includes(busca) || livro.autor.toLowerCase().includes(busca);
      const filtroTemas = temasSel.length === 0 || temasSel.some(t => livro.temas.includes(t));
      const filtroPessoais = pessSel.length === 0 || pessSel.some(p => livro[p] === true);

      return filtroBusca && filtroTemas && filtroPessoais &&
             (!genero || livro.genero === genero) &&
             (!subgenero || livro.subgenero === subgenero) &&
             (!tipo || livro.tipo === tipo) &&
             (!faixa || livro.faixaEtaria === faixa) &&
             (livro.nota >= notaMin);
    })
    .sort((a, b) => {
      const ordem = document.getElementById("ord").value;
      if (ordem === "az") return a.titulo.localeCompare(b.titulo);
      if (ordem === "nota") return b.nota - a.nota;
      if (ordem === "recente") return Number(b.dataPublicacao) - Number(a.dataPublicacao);
      return 0;
    })
    .map(livro => `
      <div class="book">
        <div class="imagem"><img src="${livro.imagem}"></div>
        <div class="info">
          <div class="cab-b">
            <h2 class="titulo">${livro.titulo}</h2>
            <div class="stars">${gerarEstrelas(livro.nota)}</div>
            <p class="genero">${livro.genero} ${livro.subgenero ? "/ " + livro.subgenero : ""}</p>
            <p class="autor">${livro.autor}</p>
            <p class="sobre">${livro.sobre}</p>
          </div>
          <div class="btn-info">
            <button class="emprestar" onclick="emprestarLivro(${livro.id})">${livro.disponivel ? "Emprestar" : "Indisponível"}</button>
            <button class="ver-mais" onclick="verMais(${livro.id})">Ver mais</button>
            <button class="icons" onclick="toggleQuero(${livro.id})"><img src="${livro.quero ? 'imagens/quero-cheia-removebg-preview.png' : 'imagens/quero-oca-removebg-preview.png'}"></button>
            <button class="icons" onclick="toggleFavorito(${livro.id})"><img src="${livro.favorito ? 'imagens/star-cheia-removebg-preview.png' : 'imagens/star-oca-removebg-preview.png'}"></button>
          </div>
        </div>
        ${bibliotecario ? `<button class="remover-livro" onclick="removerLivro(${livro.id})">🗑</button>` : ""}
      </div>`)
    .join("");

  container.innerHTML = html;
}