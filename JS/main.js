// 1. Iniciar Banco de Dados
if (!localStorage.getItem("biblioteca")) {
  saveLivrosDB(livrosPadrao);
}

// 2. Abas (Tabs)
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".aba").forEach((a) => a.classList.remove("active"));
    tab.classList.add("active");
    const alvo = document.getElementById(tab.dataset.tab);
    if (alvo) alvo.classList.add("active");
  });
});

// 3. Interface de Usuário / Login
const usuario = getUsuarioLogado();
if (usuario) {
  const bv = document.getElementById("bv");
  if (bv) bv.classList.add("hidden");
  const poscad = document.getElementById("poscad");
  if (poscad) poscad.classList.remove("hidden");
  const nomeuse = document.getElementById("nomeuse");
  if (nomeuse) nomeuse.innerHTML = `<strong>Bem-vindo, ${usuario.nome.split(" ")[0]}!</strong><br>Venha desbravar o Library Master!`;
}

// 4. Lógica de Bibliotecário (Botão Add)
const addBook = document.getElementById("add-book");
const modalAdd = document.getElementById("modalAdd");
if (bibliotecario && addBook) {
  addBook.classList.remove("hidden");
  addBook.addEventListener("click", () => modalAdd.classList.remove("hidden"));
}
document.getElementById("fecharAdd")?.addEventListener("click", () => modalAdd.classList.add("hidden"));
document.getElementById("salvarLivro")?.addEventListener("click", adicionarLivro);
document.getElementById("Cadastrar")?.addEventListener("click", cadastrar);

// 5. Filtros da Biblioteca (Apenas se existirem na página)
if (document.getElementById("pesq")) {
  document.getElementById("pesq").addEventListener("input", renderizar);
  document.querySelectorAll("select").forEach(el => el.addEventListener("change", renderizar));
  document.querySelectorAll("#tema input, #pessoais input").forEach(el => el.addEventListener("change", renderizar));
  
  document.getElementById("dlt")?.addEventListener("click", () => {
    document.querySelectorAll("select").forEach(s => s.value = "");
    document.querySelectorAll("input[type='checkbox']").forEach(c => c.checked = false);
    document.getElementById("pesq").value = "";
    renderizar();
  });

  renderizar(); // Chamada inicial
}