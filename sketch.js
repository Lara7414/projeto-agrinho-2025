let dialogo = [];
let indiceDialogo = 0;
let personagemAtual = 0; // 0 para personagem do campo, 1 para personagem da cidade
let falaAtual = "";
let alphaFala = 0; // Transparência da fala
let aumentandoFala = true;
let velocidadeFala = 5; // Velocidade de aparecimento/desaparecimento da fala

let campoX, campoY, cidadeX, cidadeY;
let balaoCampoX, balaoCampoY, balaoCidadeX, balaoCidadeY;

function setup() {
  createCanvas(800, 500);
  background(220);

  // Posições dos personagens
  campoX = width * 0.25;
  campoY = height * 0.7;
  cidadeX = width * 0.75;
  cidadeY = height * 0.7;

  // Posições dos balões de fala (ajustadas para cima dos personagens)
  balaoCampoX = campoX;
  balaoCampoY = campoY - 100;
  balaoCidadeX = cidadeX;
  balaoCidadeY = cidadeY - 100;

  // Diálogo
  dialogo = [
    { personagem: 0, texto: "Que bom te ver! Tão corrido aí na cidade?" },
    { personagem: 1, texto: "Sempre! Mas hoje vim respirar um pouco. E você, como estão as coisas na roça?" },
    { personagem: 0, texto: "Tudo a mil! Plantação que cresce, colheita se aproximando... A gente não para!" },
    { personagem: 1, texto: "Nem imagino! É impressionante como o campo trabalha para abastecer a gente. Quanta dedicação!" },
    { personagem: 0, texto: "Pois é! E a cidade, com suas inovações e ideias, também ajuda muito a gente aqui. Tecnologia que facilita o nosso dia a dia, por exemplo." },
    { personagem: 1, texto: "Verdade! Essa troca é essencial. A gente depende tanto de vocês para o alimento, para a natureza... E vocês, talvez, um pouco da nossa infraestrutura e do consumo." },
    { personagem: 0, texto: "Exatamente! O Agrinho sempre nos lembra dessa conexão forte. É como um rio que flui, ligando um ao outro." },
    { personagem: 1, texto: "Um rio que nutre os dois lados! É lindo ver como a gente se completa. A cidade precisa do verde, do ar puro do campo." },
    { personagem: 0, texto: "E o campo precisa da valorização do seu trabalho, do acesso aos mercados... É uma parceria que só cresce!" },
    { personagem: 1, texto: "Então, vamos celebrar essa união! Brindemos à conexão entre o campo e a cidade, que nos fortalece a todos!" },
    { personagem: 0, texto: "Brindemos! Por mais campo na cidade e mais cidade no campo, sempre em harmonia!" }
  ];

  falaAtual = dialogo[indiceDialogo].texto;
  personagemAtual = dialogo[indiceDialogo].personagem;
}

function draw() {
  background(220); // Limpa o background a cada frame

  // Desenha o cenário (ex: um chão e um céu simples)
  fill(150, 200, 150); // Cor do chão
  rect(0, height * 0.8, width, height * 0.2); // Chão
  fill(135, 206, 235); // Cor do céu
  rect(0, 0, width, height * 0.8);

  // Desenha os personagens
  desenharPersonagemCampo(campoX, campoY);
  desenharPersonagemCidade(cidadeX, cidadeY);

  // Lógica para aparecer e desaparecer a fala
  if (aumentandoFala) {
    alphaFala += velocidadeFala;
    if (alphaFala >= 255) {
      alphaFala = 255;
      aumentandoFala = false; // A fala está totalmente visível
    }
  } else {
    // A fala permanece visível por um tempo, depois começa a diminuir a transparência
    // Essa parte pode ser controlada por um timer se você quiser que desapareça sozinho.
    // Por enquanto, ela permanece visível até o próximo clique.
  }

  // Desenha os balões de fala
  push();
  fill(255, alphaFala); // Balão branco com transparência
  stroke(0, alphaFala); // Contorno preto com transparência

  if (personagemAtual === 0) { // Personagem do Campo falando
    rect(balaoCampoX + 20, balaoCampoY - textAscent() / 2 - 20, textWidth(falaAtual) + 40, textAscent() + textDescent() + 20, 10);
    triangle(balaoCampoX, balaoCampoY + 30, balaoCampoX + 20, balaoCampoY - 10, balaoCampoX + 20, balaoCampoY + 10); // Ponta do balão
    fill(0, alphaFala); // Texto preto com transparência
    textAlign(LEFT, TOP);
    text(falaAtual, balaoCampoX + 30, balaoCampoY - textAscent() / 2 - 10);
  } else { // Personagem da Cidade falando
    rect(balaoCidadeX - textWidth(falaAtual) - 60, balaoCidadeY - textAscent() / 2 - 20, textWidth(falaAtual) + 40, textAscent() + textDescent() + 20, 10);
    triangle(balaoCidadeX, balaoCidadeY + 30, balaoCidadeX - 20, balaoCidadeY - 10, balaoCidadeX - 20, balaoCidadeY + 10); // Ponta do balão
    fill(0, alphaFala); // Texto preto com transparência
    textAlign(LEFT, TOP);
    text(falaAtual, balaoCidadeX - textWidth(falaAtual) - 50, balaoCidadeY - textAscent() / 2 - 10);
  }
  pop();

  // Texto de instrução
  fill(0);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text("Clique para avançar o diálogo", width / 2, height - 10);
}

function mousePressed() {
  // Avança o diálogo ao clicar
  if (indiceDialogo < dialogo.length - 1) {
    indiceDialogo++;
    falaAtual = dialogo[indiceDialogo].texto;
    personagemAtual = dialogo[indiceDialogo].personagem;
    alphaFala = 0; // Reinicia a transparência para a nova fala
    aumentandoFala = true;
  } else {
    // Diálogo terminou
    falaAtual = "Fim da conversa!";
    alphaFala = 255;
    aumentandoFala = false;
  }
}

// --- Funções para desenhar os personagens ---

function desenharPersonagemCampo(x, y) {
  push();
  translate(x, y);

  // Sombra simples
  fill(0, 0, 0, 50);
  ellipse(0, 10, 80, 20);

  // Corpo (Macacão ou roupa de trabalho)
  fill(80, 120, 80); // Verde escuro
  rect(-35, -70, 70, 100, 5); // Corpo principal
  rect(-50, -60, 20, 60, 5); // Braço esquerdo
  rect(30, -60, 20, 60, 5); // Braço direito
  rect(-35, 30, 30, 40, 5); // Perna esquerda
  rect(5, 30, 30, 40, 5); // Perna direita

  // Cabeça
  fill(240, 200, 180); // Cor de pele
  ellipse(0, -95, 60, 60);

  // Chapéu de palha
  fill(200, 180, 100);
  arc(0, -120, 90, 40, PI, TWO_PI); // Aba
  fill(180, 160, 80);
  ellipse(0, -120, 60, 20); // Copa

  // Olhos
  fill(0);
  ellipse(-10, -100, 8, 8);
  ellipse(10, -100, 8, 8);

  // Boca (sorriso simples)
  noFill();
  stroke(0);
  arc(0, -85, 20, 10, 0, PI);
  stroke(1); // Reset stroke

  pop();
}

function desenharPersonagemCidade(x, y) {
  push();
  translate(x, y);

  // Sombra simples
  fill(0, 0, 0, 50);
  ellipse(0, 10, 80, 20);

  // Corpo (Roupa mais social)
  fill(60, 60, 150); // Azul escuro para camisa
  rect(-30, -70, 60, 70, 5); // Camisa
  fill(40); // Calça
  rect(-25, 0, 50, 40, 5);
  fill(60, 60, 150);
  rect(-45, -60, 20, 50, 5); // Braço esquerdo
  rect(25, -60, 20, 50, 5); // Braço direito
  fill(40);
  rect(-25, 40, 20, 30, 5); // Perna esquerda
  rect(5, 40, 20, 30, 5); // Perna direita


  // Cabeça
  fill(240, 200, 180); // Cor de pele
  ellipse(0, -95, 60, 60);

  // Cabelo (simples)
  fill(40); // Preto
  arc(0, -120, 70, 40, PI, TWO_PI); // Topo da cabeça
  rect(-25, -120, 50, 20, 5); // Laterais

  // Olhos
  fill(0);
  ellipse(-10, -100, 8, 8);
  ellipse(10, -100, 8, 8);

  // Boca (sorriso simples)
  noFill();
  stroke(0);
  arc(0, -85, 20, 10, 0, PI);
  stroke(1); // Reset stroke

  pop();
}