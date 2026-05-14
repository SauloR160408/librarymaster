function cadastrar() {
  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let matricula = document.getElementById("matricula").value;
  let tipo =
    email.includes("@librarymaster.com") || matricula.startsWith("BIB")
      ? "bibliotecario"
      : "aluno";

  let usuario = {
    id: Date.now(),

    nome,
    email,
    matricula,

    tipo, // usuario ou bibliotecario

    livrosLidos: [],

    livrosSalvos: [],

    emprestimoAtivo: null,

    historicoEmprestimos: [],

    multas: [],

    criadoEm: new Date(),
  };

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

  alert("Cadastro realizado!");
  window.location.href = "index.html";
}

function pegarUsuarioLogado() {
  return JSON.parse(localStorage.getItem("usuarioLogado"));
}

function salvarUsuarioLogado(usuario) {
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarios = usuarios.map((u) => {
    if (u.id === usuario.id) {
      return usuario;
    }

    return u;
  });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
