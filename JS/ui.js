function gerarEstrelas(nota) {
  const totalEstrelas = Number(nota) || 0;
  let estrelas = "";

  for (let i = 0; i < 5; i++) {
    if (i < totalEstrelas) {
      estrelas += `<img src="imagens/star-cheia-removebg-preview.png">`;
    } else {
      estrelas += `<img src="imagens/star-oca-removebg-preview.png">`;
    }
  }
  return estrelas;
}
