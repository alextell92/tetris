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
  currentPiece: { shape: number[][], x: number, y: number } = {
    shape: [],
    x: 0,
    y: 0
  };
  gameInterval: any;
  gameSpeed = 500; // Velocidad de caída de las piezas (ms)

  ngOnInit(): void {
    this.createBoard();
    this.spawnPiece();
    this.startGame();
  }

  isCurrentPiece(row: number, col: number): boolean {
    for (let y = 0; y < this.currentPiece.shape.length; y++) {
      for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
        if (
          this.currentPiece.shape[y][x] !== 0 &&
          this.currentPiece.y + y === row &&
          this.currentPiece.x + x === col
        ) {
          return true;
        }
      }
    }
    return false;
  }
  

  createBoard() {
    // Inicializar el tablero vacío
    this.board = Array(this.boardHeight).fill(null).map(() => Array(this.boardWidth).fill(0));
  }

  spawnPiece() {
    // Genera una pieza en forma de "L" (por simplicidad)
    this.currentPiece.shape = [
      [1, 0],
      [1, 0],
      [1, 1]
    ];
    this.currentPiece.x = 4; // Posición horizontal inicial
    this.currentPiece.y = 0; // Posición vertical inicial
  }

  startGame() {
    this.gameInterval = setInterval(() => {
      this.movePieceDown();
    }, this.gameSpeed);
  }

  movePieceDown() {
    if (this.canMove(1, 0)) {
      this.currentPiece.y += 1;
    } else {
      this.mergePiece();
      this.spawnPiece();
    }
  }

  canMove(dy: number, dx: number): boolean {
    for (let y = 0; y < this.currentPiece.shape.length; y++) {
      for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
        if (this.currentPiece.shape[y][x] !== 0) {
          const newY = this.currentPiece.y + y + dy;
          const newX = this.currentPiece.x + x + dx;

          if (newY >= this.boardHeight || newX < 0 || newX >= this.boardWidth || this.board[newY][newX] !== 0) {
            return false;
          }
        }
      }
    }
    return true;
  }

  mergePiece() {
    for (let y = 0; y < this.currentPiece.shape.length; y++) {
      for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
        if (this.currentPiece.shape[y][x] !== 0) {
          this.board[this.currentPiece.y + y][this.currentPiece.x + x] = this.currentPiece.shape[y][x];
        }
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        if (this.canMove(0, -1)) this.currentPiece.x -= 1;
        break;
      case 'ArrowRight':
        if (this.canMove(0, 1)) this.currentPiece.x += 1;
        break;
      case 'ArrowDown':
        this.movePieceDown();
        break;
    }
  }

}