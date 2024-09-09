import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  board: { filled: boolean }[][];
  piecePosition: { x: number, y: number }[];
  intervalId: any; // Identificador del intervalo de temporizador

  rows = 20;
  columns = 10;
  activePiece: number[][] = [
    [1,1],
    [1, 1]
  ];

  constructor() {
    this.board = Array.from({ length: 10 }, () => Array.from({ length: 15 }, () => ({ filled: false })));
 
    this.piecePosition = [
    { y:0,x: 4 },
      {y:0,x:5},  
      {y:0,x:6},
      {y:1,x:4}];// La pieza aparece en la fila superior, columna central

     
     
 
  }


  piezas(){
    const L = [
      { y:0,x: 4 },
      {y:0,x:5},  
      {y:0,x:6},
      {y:1,x:4}]; // La pieza aparece en la fila superior, columna central

     const cuadro = [
        { y:0,x: 4 },
        {y:0,x:5},  
        {y:1,x:5},
        {y:1,x:4}]; // La pieza aparece en la fila superior, columna central
  
        
    const l = [
      { y:0,x: 4 },  
      {y:1,x:4},
      {y:2,x:4}]; // La pieza aparece en la fila superior, columna central

      const Z = [
        { y:0,x: 4 },
        { y:0,x: 5},
        {y:1,x:4},
        {y:1,x:3}]; // La pieza aparece en la fila superior, columna central
  

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
    // this.intervalId = setInterval(() => {
    //   this.movePiece(0, 1); // Mueve la pieza hacia abajo
    
    // }, 500); // Ajusta la velocidad aquí (milisegundos)
  }

  // Coloca la pieza en el tablero actualizando las celdas llenas
  placePieceOnBoard() {
    this.clearBoard();
    this.piecePosition.forEach(pos => {
     
      if (this.isValidPosition(pos.y, pos.x)) {
        this.board[pos.x][pos.y].filled = true;
      }
    
    });


  }

  // Limpia el tablero de la pieza actual
  clearBoard() {
    this.board.forEach(row => row.forEach(cell => cell.filled = false));
  }

  // Verifica si la posición es válida
  isValidPosition(x: number, y: number): boolean {

    // console.log("X:"+x)
    // console.log("Y:"+y)
    // console.log(x >= 0 && x < 15 && y >= 0 && y< 20)
    return x >= 0 && x < 15 && y >= 0 && y< 15;
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
        console.log("rotar")
        this.rotatePiece();    // Rotar la pieza
        break;
    }
  }

  // Mueve la pieza
  movePiece(deltaX: number, deltaY: number) {
    const newPosition = this.piecePosition.map(pos => ({ y: pos.y + deltaY, x: pos.x + deltaX }));

    console.log(newPosition)
    newPosition.every(pos => 
      
      console.log("X: "+pos.x +"  "+"Y: "+pos.y)
      
    )
   
   
    if (newPosition.every(pos => this.isValidPosition(pos.x, pos.y))) {
      console.log(true)
      this.piecePosition = newPosition;
      this.placePieceOnBoard();
    }else{
      console.log(false)
    }
  }

  // Lógica simple para rotar la pieza (en este caso, rotación de matrices)
  rotatePiece() {
    // Obtener la forma rotada de la pieza
    const rotatedShape = this.activePiece[0].map((_, i) =>
      this.activePiece.map(row => row[i]).reverse()
    );

    const newPiece: { x: number, y: number }[] = [];

    // Obtener la pieza rotada en términos de posiciones
    const pivotX = this.piecePosition[0].x;
    const pivotY = this.piecePosition[0].y;

    this.piecePosition.forEach(pos => {
      const newX = pivotX - (pos.y - pivotY);
      const newY = pivotY + (pos.x - pivotX);
      newPiece.push({ x: newX, y: newY });
    });

    // Verificar si la pieza rotada es válida
    if (this.isValidPositionAfterRotation(newPiece)) {
      this.piecePosition = newPiece;
      this.placePieceOnBoard();
    }
  }

  // Verifica si la pieza rotada es válida
  isValidPositionAfterRotation(newPiece: { x: number, y: number }[]): boolean {
    return newPiece.every(pos => this.isValidPosition(pos.x, pos.y));
  }
}