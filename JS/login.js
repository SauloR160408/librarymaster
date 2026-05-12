function cadastrar() {
  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let matricula = document.getElementById("matricula").value;
  let tipo = (email.includes("@librarymaster.com") || matricula.startsWith("BIB")) ? "bibliotecario" : "aluno";

  let usuario = {
    id: Date.now(), nome, email, matricula, tipo,
    livrosLidos: [], livrosSalvos: [], emprestimos: [], multas: []
  };

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

  alert("Cadastro realizado!");
  window.location.href = "index.html";
}