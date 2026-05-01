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
