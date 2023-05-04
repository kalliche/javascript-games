const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

// responsive cambas
function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
  //console.log({map, mapRows, mapRowCols});

  game.clearRect(0,0,canvasSize,canvasSize);

  // recorrer el array y remplaza los for de abajo
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if(col == 'O') {
        //console.log({posX, posY});
        // asignamos las posiciones al objeto
        if(!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      }
      game.fillText(emoji, posX, posY);
      // el siguiente clg imprime las posiciones del jugador
      //console.log({row, rowI, col, colI});
    });
  });
  // for(let row = 1; row <= 10; row++) {
  //   for(let col = 1; col <= 10; col++) {
  //     game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
  //   }
  // }
  movePlayer();
}

function movePlayer() {
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

// movimientos del jugador
window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

//funcion paraa campturar teclas presionadas
function moveByKeys(event) {
  //sintaxis upcional 2
  if(event.key == 'ArrowUp') moveUp();
  else if(event.key == 'ArrowLeft') moveLeft();
  else if(event.key == 'ArrowRight') moveRight();
  else if(event.key == 'ArrowDown') moveDown();

  // sintaxis opcional 1
  // if(event.key == 'ArrowUp') {
  //   moveUp();
  // } else if(event.key == 'ArrowLeft') {
  //   moveLeft();
  // } else if(event.key == 'ArrowRight') {
  //   moveRight();
  // } else if(event.key == 'ArrowDown') {
  //   moveDown();
  // }
}

function moveUp() {
  console.log('Me quiero mover hacia arriba');

  // funcion para que jugador no salga de canvas
  if((playerPosition.y - elementsSize) < elementsSize) {
    console.log('out');
  } else {
    playerPosition.y -= elementsSize;
    startGame();
  }
}

function moveLeft() {
  console.log('Me quero mover hacia la izquierda');

  //funcion para que juganos no salga por la izquierda
  if((playerPosition.x - elementsSize) < elementsSize) {
    console.log('out');
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
}

function moveRight() {
  console.log('Me quiero mover hacia la derecha');

  //Funcion para que el jugador no salga por la derecha
  if((playerPosition.x + elementsSize) > canvasSize) {
    console.log('out');
  } else {
    playerPosition.x += elementsSize;
    startGame();
  }
}

function moveDown() {
  console.log('Me quiero mover hacia abajo');

  //Funcion para que jugador no salga por abajo
  if((playerPosition.y + elementsSize) > canvasSize) {
    console.log('out');
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
}