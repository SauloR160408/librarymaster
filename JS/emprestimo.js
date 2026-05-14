const hist = usuarioLogado.historicoEmprestimos.find(
  (h) => h.livroId === emprestimo.livroId && !h.devolvido,
);

if (hist) {
  hist.dataDevolucao = novaData;

  hist.renovado = true;
}

function renderizarTelaEmprestimo() {
  renderizarEmprestimoUsuario();

  renderizarHistorico();
}

function renderizarEmprestimoUsuario() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const livros = JSON.parse(localStorage.getItem("biblioteca")) || [];

  const emprestimo = usuarioLogado.emprestimoAtivo;

  const areaEmprestimo = document.getElementById("area-emprestimo");

  if (!emprestimo) {
    areaEmprestimo.innerHTML = "<h2>Sem empréstimos ativos</h2>";

    return;
  }

  const livro = livros.find((l) => l.id === emprestimo.livroId);

  if (!livro) {
    areaEmprestimo.innerHTML = "<h2>Livro não encontrado</h2>";

    return;
  }

  const dias = calcularDiasRestantes(emprestimo.dataDevolucao);

  if (dias < 0) {
    textoDias = `
    <h2>atrasado:</h2>
    <h1>${Math.abs(dias)}</h1>
    <p>dias</p>
  `;
  } else {
    textoDias = `
    <h2>faltam:</h2>
    <h1>${dias}</h1>
    <p>dias</p>
  `;
  }

  areaEmprestimo.innerHTML = `
  
    <div id="book-emprestado">

      <div id="capa-emprestimo">
        <img src="${livro.capa}">
      </div>

      <div id="info-emprestimo">

        <h2>${livro.titulo}</h2>

        <p>${livro.autor}</p>

        <hr>

        <p>
          <strong>Data de Empréstimo:</strong><br>
          ${new Date(emprestimo.dataEmprestimo).toLocaleDateString("pt-BR")}
        </p>

        <p>
          <strong>Data de Devolução:</strong><br>
          ${new Date(emprestimo.dataDevolucao).toLocaleDateString("pt-BR")}
        </p>

      </div>

      <div id="botoes-emp">

        <button class="btn-h" onclick="devolverLivro()">
          Devolver
        </button>

        ${
          emprestimo.renovado
            ? `
              <button class="btn-h" disabled>
                Renovado
              </button>
            `
            : `
              <button class="btn-h" onclick="renovarLivro()">
                Renovar
              </button>
            `
        }

      </div>

    </div>

    <div id="falta">

      ${textoDias}


    </div>
  
  `;
}

function devolverLivro() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const livros = JSON.parse(localStorage.getItem("biblioteca")) || [];

  let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const emprestimo = usuarioLogado.emprestimoAtivo;

  if (!emprestimo) {
    alert("Nenhum empréstimo ativo.");

    return;
  }

  /* encontrar livro */

  const livro = livros.find((l) => l.id === emprestimo.livroId);

  /* liberar livro */

  livro.disponivel = true;

  livro.emprestadoPara = null;

  /* atualizar histórico */

  const historico = usuarioLogado.historicoEmprestimos.find(
    (h) => h.livroId === emprestimo.livroId && !h.devolvido,
  );

  if (historico) {
    historico.devolvido = true;
  }

  /* remover empréstimo ativo */

  usuarioLogado.emprestimoAtivo = null;

  /* atualizar usuário */

  const indexUsuario = usuarios.findIndex((u) => u.id === usuarioLogado.id);

  usuarios[indexUsuario] = usuarioLogado;

  /* salvar */

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  localStorage.setItem("biblioteca", JSON.stringify(livros));

  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

  alert("Livro devolvido!");

  renderizarTelaEmprestimo();

  renderizar();
}

function renovarLivro() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const emprestimo = usuarioLogado.emprestimoAtivo;

  if (!emprestimo) {
    alert("Nenhum empréstimo ativo.");

    return;
  }

  if (emprestimo.renovado) {
    alert("Este livro já foi renovado.");

    return;
  }

  /* adicionar +14 dias */

  const novaData = new Date(emprestimo.dataDevolucao);

  novaData.setDate(novaData.getDate() + 14);

  emprestimo.dataDevolucao = novaData;

  emprestimo.renovado = true;

  const hist = usuarioLogado.historicoEmprestimos.find(
    (h) => h.livroId === emprestimo.livroId && !h.devolvido,
  );

  if (hist) {
    hist.dataDevolucao = novaData;

    hist.renovado = true;
  }

  /* atualizar usuário */

  const indexUsuario = usuarios.findIndex((u) => u.id === usuarioLogado.id);

  usuarios[indexUsuario] = usuarioLogado;

  /* salvar */

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

  alert("Livro renovado!");

  renderizarTelaEmprestimo();
}

function calcularDiasRestantes(dataDevolucao) {
  const hoje = new Date();

  hoje.setHours(0, 0, 0, 0);

  const devolucao = new Date(dataDevolucao);

  devolucao.setHours(0, 0, 0, 0);

  const diferenca = devolucao - hoje;

  return Math.ceil(diferenca / (1000 * 60 * 60 * 24));
}

const historicoLista = document.getElementById("historico-lista");
let paginaHistorico = 0;

const livrosPorPagina = 3;

function renderizarHistorico() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const livros = JSON.parse(localStorage.getItem("biblioteca")) || [];

  const historico = usuarioLogado.historicoEmprestimos || [];

  historicoLista.innerHTML = "";

  /* sem histórico */

  if (historico.length === 0) {
    historicoLista.innerHTML = `
    
      <h2 class="sem-historico">
        Nenhum empréstimo encontrado
      </h2>
    
    `;

    return;
  }

  /* paginação */

  const inicio = paginaHistorico * livrosPorPagina;

  const fim = inicio + livrosPorPagina;

  const pagina = historico.slice(inicio, fim);

  /* botão voltar */

  if (historico.length > livrosPorPagina) {
    historicoLista.innerHTML += `
  
    <button
      id="voltar"
      class="btn-g"
      onclick="paginaAnterior()"
    >
      <img
        src="imagens/seta_voltar-removebg-preview.png"
        alt="voltar"
      >
    </button>
  
  `;
  }

  /* renderizar livros */

  pagina.forEach((emprestimo) => {
    const livro = livros.find((l) => l.id === emprestimo.livroId);

    if (!livro) return;

    historicoLista.innerHTML += `
    
      <div class="hist-book">

        <img
          src="${livro.capa}"
          alt="${livro.titulo}"
        >

        <div class="hist-info">

          <h2>${livro.titulo}</h2>

          <p>${livro.autor}</p>

          <p class="data-h">

            <strong>Emprestado em:</strong>

            ${new Date(emprestimo.dataEmprestimo).toLocaleDateString("pt-BR")}

          </p>

        </div>

      </div>
    
    `;
  });

  /* botão passar */

  if (historico.length > livrosPorPagina) {
    historicoLista.innerHTML += `
  
    <button
      id="passar"
      class="btn-g"
      onclick="proximaPagina()"
    >
      <img
        src="imagens/seta_passar-removebg-preview.png"
        alt="passar"
      >
    </button>
  
  `;
  }
}

function proximaPagina() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const totalPaginas = Math.ceil(
    usuarioLogado.historicoEmprestimos.length / livrosPorPagina,
  );

  if (paginaHistorico < totalPaginas - 1) {
    paginaHistorico++;

    renderizarHistorico();
  }
}

function paginaAnterior() {
  if (paginaHistorico > 0) {
    paginaHistorico--;

    renderizarHistorico();
  }
}

function iniciarTelaEmprestimo() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuarioLogado) return;

  if (usuarioLogado.tipo === "bibliotecario") {
    renderizarEmprestimosBibliotecario();

    return;
  }

  renderizarTelaEmprestimo();
}

iniciarTelaEmprestimo();

renderizarHistorico();
