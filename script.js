const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const telefone = "5573988572192";
  const texto = `Olá! Me chamo ${nome}, ${mensagem}`;
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank", "noopener,noreferrer");
});
