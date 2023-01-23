//Tamanho e posição inicial da bola
let dBola = 30            //Diametro da bola
let rBola = dBola / 2     //Raio da bola 
let xBola = 300           //Posição inicial da bola no eixo X
let yBola = 200           //Posição inicial da bola no eixo Y

//Velocidade da bola
let velocidadeX = 5       //Velocidade da bola no eixo X
let velocidadeY = 5       //Velocidade da bola no eixo Y

//Tamanho e posição inicial das raquetes
let xRaqueteD = 680       //Posição inicial da raquete direita no eixo X
let yRaqueteD = 150       //Posição inicial da raquete direita no eixo Y
let xRaqueteE = 10        //Posição inicial da raquete esquerda no eixo X
let yRaqueteE = 150       //Posição inicial da raquete esquerda no eixo Y
let cRaquete = 10         //Comprimento das raquetes
let lRaquete = 60         //Largura das raquetes
let vRaqueteAuto          //Velocidade da raquete esquerda no modo automático

//Teste de colisão
let colidiu = false 

//Placar do jogo
let placarD = 0           //Placar de pontos da raquete direita    
let placarE = 0           //Placar de pontos da raquete esquerda

//Chance de erro do oponente
let chanceErro = 0

//Sons
let trilha
let ponto
let raquetada

//Carrega os arquivos de áudio
function preload(){
}

//Cria o Canvas e executa a trilha sonora
function setup () {
    createCanvas (700, 400)
}

//Chama todas as funções dentro do Canvas
function draw () {
    background (0)
    criaBola ()
    movimentoBola ()
    colisaoBola ()
    criaRaquete (xRaqueteE, yRaqueteE)
    criaRaquete (xRaqueteD, yRaqueteD)
    moveRaqueteE ()
    moveRaqueteD ()
    colisaoDaBiblioteca (xRaqueteE, yRaqueteE)
    colisaoDaBiblioteca (xRaqueteD, yRaqueteD)
    criaPlacar ()
    marcaPonto ()
    limitaMovimento ()
    corrigeBug ()
}

//Cria a bola no Canvas
function criaBola () {
    circle(xBola, yBola, dBola)
}

//Move a bola alterando as coordenadas dela no Canvas
function movimentoBola () {
    xBola += velocidadeX
    yBola += velocidadeY
}

//Rege o funcionamento da colisão da bola com a borda da tela
function colisaoBola () {
    if (xBola + rBola > width || xBola - rBola < 0) {
        velocidadeX *= -1
    }
    if (yBola + rBola > height || yBola - rBola < 0) {
        velocidadeY *= -1
    }
}

//Cria a raquete no Canvas (Recebe os parâmetros da posição x e y na função "draw")
function criaRaquete(x, y) {
    rect (x, y, cRaquete, lRaquete)
}

//Movimenta a raquete esquerda usando W e S
function moveRaqueteE () {
    if (keyIsDown(87)) {
        yRaqueteE -= 10;
    }
    if (keyIsDown(83)) {
        yRaqueteE += 10;
    }
}

//Movimenta a raquete direita usando as setas
function moveRaqueteD () {
    if (keyIsDown(UP_ARROW)) {
        yRaqueteD -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaqueteD += 10;
    }
}

//Limita o movimento das raquetes quando elas tocam na borda da tela
function limitaMovimento () {
    if (yRaqueteD + lRaquete > height) {
        yRaqueteD -= 10
    }
    if (yRaqueteD < 0) {
        yRaqueteD += 10
    }
    if (yRaqueteE + lRaquete > height) {
        yRaqueteE -= 10
    }
    if (yRaqueteE < 0) {
        yRaqueteE += 10
    }
}

//Usa a biblioteca P5 Collide 2D para retornar uma resposta boleana na colisão entre um círculo e um retângulo
//Se 'colidiu' for 'true', então muda a direção da bola
function colisaoDaBiblioteca (x, y) {
    colidiu = collideRectCircle(x, y, cRaquete, lRaquete, xBola, yBola, rBola)
    if (colidiu) {
        velocidadeX *= -1
    }
}

//Cria o placar do jogo
function criaPlacar () {
    fill (color(255, 0, 0))     //Define a cor do placar esquerdo
    rect (260, 10, 40, 20)      //Cria e define a posição do placar esquerdo
    fill (255)                  //Cor do texto do placar esquerdo
    text (placarE, 280, 26)     //Cria o texto e define a posição dele
    
    fill (color(0, 0, 255))     //Define a cor do placar direito
    rect (400, 10, 40, 20)      //Cria e define a posição do placar direito
    fill (255)                  //Cor do texto do placar direito
    text (placarD, 420, 26)     //Cria o texto e define a posição dele

    stroke (255)                //Cria a borda branca ao redor dos objetos
    textSize (16)               //Tamanho do texto
    textAlign (CENTER)          //Posição do texto
}

//Marca ponto quando toca na borda do oponente
function marcaPonto () {
    if (xBola > 685) {
        placarE += 1
    }
    if (xBola < 15) {
        placarD += 1
    }
}

//Impede que a bola fique presa atrás da raquete, limita o movimento sem impedir a pontuação
function corrigeBug () {
    if (xBola - rBola < 0) {
      xBola = 30
    }
    if (xBola + rBola > 700) {
      xBola = 666
    }
  }
