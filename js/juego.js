var Juego = {

  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,

  ganador: false,

  obstaculosCarretera: [

    new Obstaculo('imagenes/valla_horizontal.png', 70, 430, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 410, 480, 30, 30, 1), 
    new Obstaculo('imagenes/valla_vertical.png', 410, 450, 30, 30, 1), 
    new Obstaculo('imagenes/valla_vertical.png', 220, 460, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 520, 380, 30, 30, 1),  
    new Obstaculo('imagenes/valla_horizontal.png', 100, 430, 30, 30, 1), 
    new Obstaculo('imagenes/valla_horizontal.png',130, 430, 30, 30, 1), 
    new Obstaculo('imagenes/valla_horizontal.png', 140, 120, 30, 30, 1), 
    new Obstaculo('imagenes/valla_horizontal.png', 170, 120, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 180, 240, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 310, 450, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 600,70, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 800, 450, 30, 30, 1),
    new Obstaculo('imagenes/auto_verde_abajo.png', 70, 260, 15, 30, 2),
    new Obstaculo('imagenes/auto_verde_abajo.png', 830, 430, 15, 30, 2),
    new Obstaculo('imagenes/auto_verde_derecha.png', 360, 430, 30, 15, 2),

  ],

  bordes: [
    // // Bordes
    new Obstaculo('', 0, 5, 961, 18, 0),
    new Obstaculo('', 0, 559, 961, 18, 0),
    new Obstaculo('', 0, 5, 18, 572, 0),
    new Obstaculo('', 943, 5, 18, 572, 0),
    // Veredas
    new Obstaculo('', 18, 23, 51, 536, 2),
    new Obstaculo('', 69, 507, 690, 52, 2),
    new Obstaculo('', 587, 147, 173, 360, 2),
    new Obstaculo('', 346, 147, 241, 52, 2),
    new Obstaculo('', 196, 267, 263, 112, 2),
    new Obstaculo('', 196, 23, 83, 244, 2),
    new Obstaculo('', 279, 23, 664, 56, 2),
    new Obstaculo('', 887, 79, 56, 480, 2)
  ],
  enemigos: [
    new ZombieCaminante('imagenes/zombie1.png', 500, 480, 10, 10, 1, {desdeX: 80, hastaX: 500, desdeY: 480, hastaY: 490}),
    new ZombieCaminante('imagenes/zombie2.png', 50, 220, 10, 10, 1, {desdeX: 50, hastaX: 300, desdeY: 220, hastaY: 230}),
    new ZombieCaminante('imagenes/zombie3.png', 250, 190, 10, 10, 2, {desdeX: 250, hastaX: 350, desdeY: 190, hastaY:200}),
    new ZombieCaminante('imagenes/zombie4.png', 820, 120, 10, 10, 1, {desdeX: 300, hastaX: 820, desdeY: 100, hastaY: 160}),
    new ZombieCaminante('imagenes/zombie1.png', 700, 500, 10, 10, 1, {desdeX: 700, hastaX: 900, desdeY: 500, hastaY: 510}),
    new ZombieConductor('imagenes/tren_vertical.png', 644, 0, 30, 90, 6, {desdeX: 644, hastaX: 644, desdeY: -300, hastaY: 900}, "v"),
    new ZombieConductor('imagenes/tren_vertical.png', 678, -100, 30, 90, -3, {desdeX: 678, hastaX: 678, desdeY: -300, hastaY: 900}, "v"),
    new ZombieConductor('imagenes/tren_horizontal.png', 400, 322, 90, 30, 8, {desdeX: -300, hastaX: 1200, desdeY: 322, hastaY: 322}, "h")

  ]

}

Juego.iniciarRecursos = function() {
  Resources.load([
    'imagenes/mapa.png',
    'imagenes/mensaje_gameover.png',
    'imagenes/Splash.png',
    'imagenes/bache.png',
    'imagenes/tren_horizontal.png',
    'imagenes/tren_vertical.png',
    'imagenes/valla_horizontal.png',
    'imagenes/valla_vertical.png',
    'imagenes/zombie1.png',
    'imagenes/zombie2.png',
    'imagenes/zombie3.png',
    'imagenes/zombie4.png',
    'imagenes/auto_rojo_abajo.png',
    'imagenes/auto_rojo_arriba.png',
    'imagenes/auto_rojo_derecha.png',
    'imagenes/auto_rojo_izquierda.png',
    'imagenes/auto_verde_abajo.png',
    'imagenes/auto_verde_derecha.png'
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
};

Juego.obstaculos = function() {
  return this.obstaculosCarretera.concat(this.bordes);
};

Juego.comenzar = function() {
  Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
  this.buclePrincipal();
};

Juego.buclePrincipal = function() {
  this.update();
  this.dibujar();
   window.requestAnimationFrame(this.buclePrincipal.bind(this));
};

Juego.update = function() {
  this.calcularAtaques();
  this.moverEnemigos();
}
Juego.capturarMovimiento = function(tecla) {
  var movX = 0;
  var movY = 0;
  var velocidad = this.jugador.velocidad;

  if (tecla == 'izq') {
    movX = -velocidad;
  }
  if (tecla == 'arriba') {
    movY = -velocidad;
  }
  if (tecla == 'der') {
    movX = velocidad;
  }
  if (tecla == 'abajo') {
    movY = velocidad;
  }

  if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y)) {
   Jugador.mover(movX, movY);
  
  }
};

Juego.dibujar = function() {
   Dibujante.borrarAreaDeJuego();
  this.dibujarFondo();
  Dibujante.dibujarRectangulo("Red", 758, 545, 130, 20);
  
  Dibujante.dibujarEntidad(Jugador);
    this.obstaculosCarretera.forEach(function(obstaculo) {
    Dibujante.dibujarEntidad(obstaculo);
  });

  this.enemigos.forEach(function(enemigo) {
    Dibujante.dibujarEntidad(enemigo);
  });
  var tamanio = this.anchoCanvas / this.vidasInicial;
  Dibujante.dibujarRectangulo('white', 0, 0, this.anchoCanvas, 8);
  for (var i = 0; i < this.jugador.vidas; i++) {
    var x = tamanio * i
    Dibujante.dibujarRectangulo('red', x, 0, tamanio, 8);
  }
};

Juego.moverEnemigos = function() {
  this.enemigos.forEach(function(enemigo) {
    enemigo.mover();
  });
};

Juego.calcularAtaques = function() {
  this.enemigos.forEach(function(enemigo) {
    if (this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y))
      enemigo.comenzarAtaque(this.jugador);
    else 
      enemigo.dejarDeAtacar(this.jugador);
    
  }, this);
};
Juego.chequearColisiones = function(x, y) {
  var puedeMoverse = true
  this.obstaculos().forEach(function(obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {

      obstaculo.chocar();
      
      puedeMoverse = false
    }
  }, this)
  return puedeMoverse
};

Juego.intersecan = function(elemento1, elemento2, x, y) {
  var izquierda1 = elemento1.x
  var derecha1 = izquierda1 + elemento1.ancho
  var techo1 = elemento1.y
  var piso1 = techo1 + elemento1.alto
  var izquierda2 = x
  var derecha2 = izquierda2 + elemento2.ancho
  var techo2 = y
  var piso2 = y + elemento2.alto

  return ((piso1 >= techo2) && (techo1 <= piso2) &&
    (derecha1 >= izquierda2) && (izquierda1 <= derecha2))
};

Juego.dibujarFondo = function() {

  
  if (this.terminoJuego()) {
    
    Dibujante.dibujarImagen('imagenes/mensaje_gameover.png', 0, 5, this.anchoCanvas, this.altoCanvas);
    document.getElementById('reiniciar').style.visibility = 'visible';
  }
  else if (this.ganoJuego()) {
    
    Dibujante.dibujarImagen('imagenes/Splash.png', 190, 113, 500, 203);
    document.getElementById('reiniciar').style.visibility = 'visible';
    
  } else {
    Dibujante.dibujarImagen('imagenes/mapa.png', 0, 5, this.anchoCanvas, this.altoCanvas);
  }
};

Juego.terminoJuego = function() {
  return this.jugador.vidas <= 0;
};

Juego.ganoJuego = function() {
  return (this.jugador.y + this.jugador.alto) > 530;
};

Juego.iniciarRecursos();

document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'izq',
    38: 'arriba',
    39: 'der',
    40: 'abajo'
  };

  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});
