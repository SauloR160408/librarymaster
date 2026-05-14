function verMais(id) {
  const livros = getLivrosDB();
  const livro = livros.find((l) => l.id === id);
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
            <p><strong>ISBN:</strong> ${livro.isbn || "Não informado"}</p>
            <p><strong>Páginas:</strong> ${livro.paginas}</p>
            <p><strong>Ano:</strong> ${livro.dataPublicacao}</p>
          </div>
        </div>
        <div class="modal-direita">
          <h2>${livro.titulo}</h2>
          <p class="autor-modal">por ${livro.autor}</p>
          <span class="tag-genero">${livro.genero}</span>
          <div class="sinopse-container"><h3>Sinopse</h3><p>${livro.sobre}</p></div>
          <div class="comentarios-section">
            <h3>Comentários (${livro.comentarios.length})</h3>
            <div id="lista-comentarios">
              ${livro.comentarios.map((c) => `<div class="comentario-item">${c}</div>`).join("")}
            </div>
            <div class="add-comentario">
                <select id="nova-nota-usuario">
                    <option value="5">5 Estrelas</option><option value="4">4 Estrelas</option>
                    <option value="3">3 Estrelas</option><option value="2">2 Estrelas</option><option value="1">1 Estrela</option>
                </select>
                <input type="text" id="novo-comentario" placeholder="Escreva sua resenha...">
                <button onclick="salvarComentario(${livro.id})">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  vm.classList.remove("hidden");
}

function addhid() {
  document.querySelector(".vm").classList.add("hidden");
}

function salvarComentario(id) {
  const texto = document.getElementById("novo-comentario").value.trim();
  const notaDada = Number(document.getElementById("nova-nota-usuario").value);
  if (texto === "") return;

  let livros = getLivrosDB();
  let livro = livros.find((l) => l.id === id);

  if (!livro.comentarios) livro.comentarios = [];
  if (!livro.todasNotas) livro.todasNotas = [livro.nota];

  livro.comentarios.push(texto);
  livro.todasNotas.push(notaDada);
  livro.nota = Math.round(
    livro.todasNotas.reduce((acc, n) => acc + n, 0) / livro.todasNotas.length,
  );

  saveLivrosDB(livros);
  renderizar();
  verMais(id);
}
