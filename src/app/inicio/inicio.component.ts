import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  boardWidth = 10;  // 10 columnas
  boardHeight = 20; // 20 filas
  board: number[][] = [];
  contenedorPiezas: { pieza: number[][], x: number, y: number }[] = [{
    pieza: [[]],
     x: 0,
     y: 0
   }];

  piezaActual: { pieza: number[][], x: number, y: number } = {
   pieza: [],
    x: 0,
    y: 0
  };

  caidaIntervalo: any;
  velocidadDeBajada = 500; // Velocidad de caída de las piezas (ms)

  ngOnInit(): void {
    this.tablero();//Llamada tablero
    this.seleccionarPieza();
    this.iniciaGame();
  }

  ispiezaActual(row: number, col: number): boolean {
    for (let y = 0; y < this.piezaActual.pieza.length; y++) {
      for (let x = 0; x < this.piezaActual.pieza[y].length; x++) {
        if (
          this.piezaActual.pieza[y][x] !== 0 &&
          this.piezaActual.y + y === row &&
          this.piezaActual.x + x === col
        ) {
          return true;
        }
      }
    }
    return false;
  }


  tablero() {
    // Inicializar el tablero vacío cada casilla en 0, indica que esta vacio
    this.board = Array(this.boardHeight).fill(null).map(() => Array(this.boardWidth).fill(0));
  }

  seleccionarPieza() {
    this.contenedorPiezas=[
      {
        pieza: [
          [1, 1],
          [1, 1]
        ],
        x: 4,
        y: 0
      },
      {
        pieza: [
          [0,1, 1],
          [1, 1,0]
        ],
        x: 4,
        y: 0
      },
      {
        pieza: [
          [1,0],
          [1,0],
          [1,1]
        ],
        x: 4,
        y: 0
      },
      {
        pieza: [
          [1],
          [1],
          [1]
        ],
        x: 4,
        y: 0
      },
      {
        pieza: [
          [1,1, 0],
          [0, 1,1]
        ],
        x: 4,
        y: 0
      }
    ]

    const randomValue = Math.floor(Math.random() * 5); // Genera un número entre 0 y 4
    this.piezaActual=this.contenedorPiezas[randomValue]  
  }

  iniciaGame() {
    //Intervalo infinito de caida de piezas
  this.caidaIntervalo = setInterval(() => {
    this.iniciaBajada();

  }, this.velocidadDeBajada);

}


iniciaBajada() {
  //1: se va a mover una fila hacia abajo
  //0: no se movera ni izquierda ni derecha
  if (this.revisarMovimiento(1, 0)) {
    this.piezaActual.y += 1;
  } else {
    //
    this.colocarPiezaTablero();
    this.seleccionarPieza();
  }
}

revisarMovimiento(paray: number, parax: number): boolean {
/*
pieza
[
  [1, 0],
  [1, 0],
  [1, 1]
] L

El bucle for irá recorriendo cada bloque de la pieza:
Cuando y = 0 y x = 0, estás en el primer bloque, con valor 1.
Si this.piezaActual.y = 4 y this.piezaActual.x = 2, 
el bloque en la posición relativa (0, 0) dentro de la 
pieza estará en la posición absoluta (4 + 0, 2 + 0) en el tablero, es decir, (4, 2).

Cuando y = 2 y x = 1, estás en el último bloque de la
 pieza. Ese bloque, en la posición relativa (2, 1) 
 dentro de la pieza, se encontrará en la posición absoluta (4 + 2, 2 + 1) en el tablero, es decir, (6, 3).
*/

  for (let y = 0; y < this.piezaActual.pieza.length; y++) {
    for (let x = 0; x < this.piezaActual.pieza[y].length; x++) {
      if (this.piezaActual.pieza[y][x] !== 0) {  
        //Ciclo 1  y=0 la x=0 coordenadas dentro de el arreglo pieza.
        //newY= 0 + 0 + 1= 1
        //newX= 4 + 0 + 0= 4
        //La nueva posicion seria (x=4, y=1) en el tablero, esta coordenada (x=0,y=0) del arreglo pieza apunta a 1
         //Ciclo 2 y=0 la x=1 coordenadas dentro de el arreglo pieza.
        //newY= 0 + 0 + 1= 1
        //newX= 4 + 1 + 0= 5
        //La nueva posicion seria (x=5, y=1) en el tablero,esta coordenada (x=0,y=1) del arreglo pieza apunta a 0
        //ciclo 3 y=1 la x=0 coordenadas dentro de el arreglo pieza.
         //newY= 0 + 1 + 1= 2
        //newX= 4 + 0 + 0= 4
        //La nueva posicion seria (x=4, y=2) en el tablero,esta coordenada (x=1,y=0) del arreglo pieza apunta a 1

        //ciclo 4 y=1 la x=1 coordenadas dentro de el arreglo pieza.
         //newY= 0 + 1 + 1= 2
        //newX= 4 + 1 + 0= 5
        //La nueva posicion seria (x=5, y=2) en el tablero, esta coordenada (x=1,y=1) del arreglo pieza apunta a 0

        //ciclo 5 y=2 la x=0 coordenadas dentro de el arreglo pieza.
         //newY= 0 + 2 + 1= 3
        //newX= 4 + 0 + 0= 4
        //La nueva posicion seria (x=4, y=3) en el tablero,esta coordenada (x=2,y=0) del arreglo pieza apunta a 1

        //ciclo 6 y=2 la x=1 coordenadas dentro de el arreglo pieza.
         //newY= 0 + 2 + 1= 3
        //newX= 4 + 1 + 0= 5
        //La nueva posicion seria (x=5, y=3) en el tablero, esta coordenada (x=2,y=1) del arreglo pieza apunta a 1

        //Formula de traslacion 
        const newY = this.piezaActual.y + y + paray;
        const newX = this.piezaActual.x + x + parax;

        //Revisa si la nueva coordenada esta en los limites establecidos, para saber si llego al fondo, o si existe alguna otra pieza en la misma posicion, lo que
        //Indica que choco con otra pieza
        if (newY >= this.boardHeight || newX < 0 || newX >= this.boardWidth || this.board[newY][newX] !== 0) {
          return false;
        }
      }
    }
  }
  return true;
}

colocarPiezaTablero() {
  for (let y = 0; y < this.piezaActual.pieza.length; y++) {
    for (let x = 0; x < this.piezaActual.pieza[y].length; x++) {

      if (this.piezaActual.pieza[y][x] !== 0) {


        this.board[this.piezaActual.y + y][this.piezaActual.x + x] = this.piezaActual.pieza[y][x];

    
      }
    }
  }
}


rotarPieza(pieza: number[][]): number[][] {
  // Rotar la matriz en sentido horario
  return pieza[0].map((_, index) => pieza.map(row => row[index]).reverse());
}

canMoveRotated(rotatedShape: number[][]): boolean {
  for (let y = 0; y < rotatedShape.length; y++) {
    for (let x = 0; x < rotatedShape[y].length; x++) {
      if (rotatedShape[y][x] !== 0) {
        const newY = this.piezaActual.y + y;
        const newX = this.piezaActual.x + x;

        // Verificar colisiones con los bordes del tablero o piezas existentes
        if (newY >= this.boardHeight || newX < 0 || newX >= this.boardWidth || this.board[newY][newX] !== 0) {
          return false;
        }
      }
    }
  }
  return true;
}

rotatepiezaActual() {
  const rotatedShape = this.rotarPieza(this.piezaActual.pieza);
  // Verificar si la rotación es válida antes de asignar
  if (this.canMoveRotated(rotatedShape)) {
    this.piezaActual.pieza = rotatedShape;
  }
}

@HostListener('window:keydown', ['$event'])
handleKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowLeft':
      if (this.revisarMovimiento(0, -1)) this.piezaActual.x -= 1;
      break;
    case 'ArrowRight':
      if (this.revisarMovimiento(0, 1)) this.piezaActual.x += 1;
      break;
    case 'ArrowDown':
      this.iniciaBajada();
      break;
      case 'ArrowUp':
        this.rotatepiezaActual();  // Rotar la pieza
        break;
  }
}

}