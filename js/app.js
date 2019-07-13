document.addEventListener('DOMContentLoaded', () => {

  const allPavementDivs = document.querySelectorAll('.pavement')
  const allRoadDivs = document.querySelectorAll('.road')
  const allTreesDivs = document.querySelectorAll('.trees')
  const allRiverDivs = document.querySelectorAll('.river')
  const allLilypadDivs = document.querySelectorAll('.lilypad')

  const frogArea = document.querySelectorAll('.container div')

  const startButtonDisplay = document.querySelector('.start')
  let countdownDisplay = document.querySelector('.countdown')
  let scoreCountDisplay = document.querySelector('p span')

  let carObstaclesMove = null
  let logObstaclesMove = null

  let currentIndex = 105
  const width = 10
  let timerId = null
  let timeRemaining = +countdownDisplay.textContent

  // start the game = start positions and movment
  function startGame() {
    startingPosition()
    const moveFrog = document.addEventListener('keyup', moveMyFrog)
    carObstaclesMove = setInterval(makeCarsMove,1000)
    logObstaclesMove = setInterval(makeLogsMove,1000)
  }

  // timer countdown
  function countdown() {
    timeRemaining--
    countdownDisplay.textContent = timeRemaining

    if(timeRemaining === 0) {
      clearInterval(timerId)
      timerId = null
    }
  }

  startButtonDisplay.addEventListener('click', startGame)

  startButtonDisplay.addEventListener('click', () => {
    if(timerId) return false
    timerId = setInterval(countdown, 1000)
  })


  frogArea[105].classList.add('frog')

  // Move the frod
  function moveMyFrog(e) {

    frogArea[currentIndex].classList.remove('frog')

    switch(e.keyCode) {
      case 37:
        if(currentIndex % width !== 0) currentIndex -= 1
        console.log(e)
        // left
        break
      case 38:
        if(currentIndex - width >= 0) currentIndex -= width
        console.log(e)
        // up
        break
      case 39:
        if(currentIndex % width < width - 1) currentIndex += 1
        console.log(e)
        // right
        break
      case 40:
        if(currentIndex + width < width * width) currentIndex += width
        console.log(e)
        // down
        break
    }
    frogArea[currentIndex].classList.add('frog')
  }


  // add car/log obstacles to starting index
  function startingPosition() {
    for (let i = 0; i < allRoadDivs.length; i++) {
      if (i % 3 === 0) {
        allRoadDivs[i].classList.add('car')
      }
      for (let i = 0; i < allRiverDivs.length; i++) {
        if (i % 4 === 0) {
          allRiverDivs[i].classList.add('log')
        }
      }
    }
  }


  // make obstacles move
  function makeCarsMove() {
    for (let i = 0; i < allRoadDivs.length; i++) {
      if (allRoadDivs[i].classList.contains('car')) {
        allRoadDivs[i].classList.remove('car')
        i++
        allRoadDivs[i].classList.add('car')
      }
    }

  }

  function makeLogsMove() {
    for (let i = 0; i < allRiverDivs.length; i++) {
      if (allRiverDivs[i].classList.contains('log')) {
        allRiverDivs[i].classList.remove('log')
        i++
        allRiverDivs[i].classList.add('log')
      }
    }
  }


  // Set boundairies for movement

  function fixCarBoundaries() {

  }



















})
