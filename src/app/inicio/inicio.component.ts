import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  board: { filled: boolean }[][];
  piecePosition: { x: number, y: number }[];
  activePiece: number[][];
  intervalId: any; // Identificador del intervalo de temporizador

  constructor() {
    this.board = Array.from({ length: 20 }, () => Array.from({ length: 10 }, () => ({ filled: false })));
    this.activePiece = [
      [1, 1],  // Ejemplo de pieza en forma de bloque
      [1, 1]
    ];
    this.piecePosition = [{ x: 0, y: 4 }]; // La pieza aparece en la fila superior, columna central
  }

  ngOnInit() {
    this.startGame();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Inicia el juego
  startGame() {
    this.placePieceOnBoard();
    this.intervalId = setInterval(() => {
      this.movePiece(0, 1); // Mueve la pieza hacia abajo
    }, 500); // Ajusta la velocidad aquí (milisegundos)
  }

  // Coloca la pieza en el tablero actualizando las celdas llenas
  placePieceOnBoard() {
    this.clearBoard();
    this.piecePosition.forEach(pos => {
      if (this.isValidPosition(pos.x, pos.y)) {
        this.board[pos.y][pos.x].filled = true;
      }
    });
  }

  // Limpia el tablero de la pieza actual
  clearBoard() {
    this.board.forEach(row => row.forEach(cell => cell.filled = false));
  }

  // Verifica si la posición es válida
  isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < 10 && y >= 0 && y < 20;
  }

  // Listener para las teclas
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.movePiece(-1, 0); // Mover a la izquierda
        break;
      case 'ArrowRight':
        this.movePiece(1, 0);  // Mover a la derecha
        break;
      case 'ArrowDown':
        this.movePiece(0, 1);  // Mover hacia abajo
        break;
      case 'ArrowUp':
        this.rotatePiece();    // Rotar la pieza
        break;
    }
  }

  // Mueve la pieza
  movePiece(deltaX: number, deltaY: number) {
    const newPosition = this.piecePosition.map(pos => ({ x: pos.x + deltaX, y: pos.y + deltaY }));
    
    if (newPosition.every(pos => this.isValidPosition(pos.x, pos.y))) {
      this.piecePosition = newPosition;
      this.placePieceOnBoard();
    }
  }

  // Lógica simple para rotar la pieza (en este caso, rotación de matrices)
  rotatePiece() {
    const size = this.activePiece.length;
    let newPiece = Array.from({ length: size }, () => Array(size).fill(0));
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        newPiece[i][j] = this.activePiece[size - j - 1][i];
      }
    }
    
    this.activePiece = newPiece;
    // Aquí también debes ajustar las posiciones de la pieza actual
  }
}