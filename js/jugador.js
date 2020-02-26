var Jugador = {
  sprite: 'imagenes/auto_rojo_abajo.png',
  x: 130,
  y: 160,
  ancho: 15,
  alto: 30,
  velocidad: 10,
  vidas: 5,
  mover: function (movX, movY) {
    this.x = this.x + movX;
    this.y = this.y + movY;
    if(movY > 0){
      this.sprite = 'imagenes/auto_rojo_abajo.png';
      this.ancho = 15;
      this.alto = 30;
    } 
    else if(movY < 0) {
      this.sprite =  'imagenes/auto_rojo_arriba.png';
      this.ancho = 15;
      this.alto = 30;
    }
    else if(movX > 0){
      this.sprite = 'imagenes/auto_rojo_derecha.png';
      this.ancho = 30;
      this.alto = 15;
    }
    else {
      this.sprite =  'imagenes/auto_rojo_izquierda.png';
      this.ancho = 30;
      this.alto = 15;
    }
        
  },
  perderVidas: function (cantVidas) {
    this.vidas = this.vidas - cantVidas;
  }


}
