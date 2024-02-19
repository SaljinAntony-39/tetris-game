let squares = Array.from(document.querySelectorAll(".grid div"))
let scoreNum = document.querySelector(".scorenum")
let startBtn = document.getElementById("start")
const width = 10 // widht of a row in grid

timeindex = setInterval(movedown, 1000)  // time index used to create interval timer for a function 

const ltetris = [                                           // | |
  [1, width + 1, width * 2 + 1, 2],                         // | |
  [width, width + 1, width + 2, width * 2 + 2],             // | |
  [1, width + 1, width * 2 + 1, width * 2],                 // | |
  [width, width * 2, width * 2 + 1, width * 2 + 2],         // | |______
]                                                           // |________|
const Ztetris = [
  [1, width, width + 1, 2],
  [0, width, width + 1, width * 2 + 1],
  [1, width, width + 1, 2],
  [0, width, width + 1, width * 2 + 1],
]
const Ttetris = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width * 2 + 1, width + 2],
  [width, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width * 2 + 1, 1],
]
const Sqtetris = [
  [1, width + 1, width, 0],
  [1, width + 1, width, 0],
  [1, width + 1, width, 0],
  [1, width + 1, width, 0],
]
const linetetris = [
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
]


const Tetriminos = [linetetris, ltetris, Ztetris, Ttetris, Sqtetris]
let random = Math.floor(Math.random() * Tetriminos.length) // random function 
let current = Tetriminos[random][0]  // current tetrimino
let currentPosition = 4   //position of current Tetrimino
let currentRotation = 0   // rotation of tetriminos 




function draw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add("tetriminos")
  })
}

function undraw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.remove("tetriminos")
  })
}


function freeze() {
  if (
    current.some(index =>
      squares[currentPosition + index + width].classList.contains("taken")
    )
  ) {
    current.forEach(index =>
      squares[currentPosition + index].classList.add("taken")
    )
    random = Math.floor(Math.random() * Tetriminos.length)
    current = Tetriminos[random][currentRotation]
    currentPosition = 4
    draw()
  }
}

function movedown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  } 

  //left move
  function moveleft(){
    undraw()
    const isAtLeftEdge = current.some(index=> (currentPosition+index)%width===0)
    if (!isAtLeftEdge) currentPosition-=1
    if (current.some(index=>squares[currentPosition+index].classList.contains('taken')))
    currentPosition+=1

    draw()
  }

  document.addEventListener('keyup',control)

  function control(e){
    if(e.keyCode===37){
        moveleft()
    }
    if(e.keyCode===39){
        moveright()
    }
    if(e.keyCode===40){
        movedown()
    } 
    if(e.keyCode===38){
        rotate()
    }

    
  }
  function moveright(){
    undraw()
    const isAtRightEdge = current.some(index=> (currentPosition+index)%width===width-1)
    if (!isAtRightEdge) currentPosition+=1
    if (current.some(index=>squares[currentPosition+index].classList.contains('taken')))
    currentPosition-=1

    draw()
  }

  function rotate(){
    undraw()
    currentRotation ++
    if(currentRotation===current.length){
        currentRotation=0
    }
    current=Tetriminos[random][currentRotation]
    draw()
  }

  function displayShape(){

  }  