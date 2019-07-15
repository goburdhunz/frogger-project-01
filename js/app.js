document.addEventListener('DOMContentLoaded', () => {

  // grid divs
  const allPavementDivs = document.querySelectorAll('.pavement')
  const allRoadDivs = document.querySelectorAll('.road')
  const allTreesDivs = document.querySelectorAll('.trees')
  const allRiverDivs = document.querySelectorAll('.river')
  const allLilypadDivs = document.querySelectorAll('.lilypad')
  const allReverseLogsDivs = document.querySelectorAll('.riverreverse')
  console.log(allReverseLogsDivs)


  // Whole moveable area for frog
  const frogArea = document.querySelectorAll('.container div')

  // Header button, countdown and score display
  const startButtonDisplay = document.querySelector('.start')
  let countdownDisplay = document.querySelector('.countdown')
  let scoreCountDisplay = document.querySelector('p span')

  // interval id's
  let carObstaclesMove = null
  let logObstaclesMove = null
  let makeReverseMove = null

  // starting index for frog
  let currentIndex = 105

  // game screen width
  const width = 10

  let timerId = null
  let timeRemaining = +countdownDisplay.textContent

  // start the game = start positions and movment
  function startGame() {
    carObstaclesMove = setInterval(makeCarsMove,1000)
    logObstaclesMove = setInterval(makeLogsMove,1000)
    makeReverseMove = setInterval(makeReverseLogsMove,1000)
    const moveFrog = document.addEventListener('keyup', moveMyFrog)
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
        // left
        break
      case 38:
        if(currentIndex - width >= 0) currentIndex -= width
        // up
        break
      case 39:
        if(currentIndex % width < width - 1) currentIndex += 1
        // right
        break
      case 40:
        if(currentIndex + width < width * width) currentIndex += width
        // down
        break
    }
    frogArea[currentIndex].classList.add('frog')
    carCollision()
  }


  // add car/log obstacles to starting index
  // function startingPosition() {
  //   for (let i = 0; i < allRoadDivs.length; i++) {
  //     if (i % 4 === 0) {
  //       allRoadDivs[i].classList.add('car')
  //     }
  //     for (let i = 0; i < allRiverDivs.length; i++) {
  //       if (i % 4 === 0) {
  //         allRiverDivs[i].classList.add('log')
  //       }
  //     }
  //   }
  // }


  // Starting position/make obstacles move
  const carIndices = [0,4,8,12,16,20,24,28,32,36]

  carIndices.forEach(carIndex => allRoadDivs[carIndex].classList.add('car'))

  function makeCarsMove() {
    for (let i = 0; i < carIndices.length; i++) {
      allRoadDivs[carIndices[i]].classList.remove('car')

      if (carIndices[i] % width === width - 1)  {
        carIndices[i] -= (width-1)
      } else {
        carIndices[i] += 1
      }
      allRoadDivs[carIndices[i]].classList.add('car')
    }
  }

  const logIndices = [1,2,3,5,6,7,12,13,14,17,18,19]

  logIndices.forEach(logIndex => allRiverDivs[logIndex].classList.add('log'))

  function makeLogsMove() {
    for (let i = logIndices.length-1; i >= 0; i--) {
      allRiverDivs[logIndices[i]].classList.remove('log')

      if (logIndices[i] % width === width - 1)  {
        logIndices[i] -= (width-1)
      } else {
        logIndices[i] += 1
      }
      allRiverDivs[logIndices[i]].classList.add('log')
    }
    frogColission()
  }


  const reverseRiver = [0,1,2,6,7,8]

  reverseRiver.forEach(logIndex => allReverseLogsDivs[logIndex].classList.add('log'))

  function makeReverseLogsMove() {
    for (let i = 0; i < reverseRiver.length; i++) {
      allReverseLogsDivs[reverseRiver[i]].classList.remove('log')

      if (reverseRiver[i] % width === 0)  {
        reverseRiver[i] += (width-1)
      } else {
        reverseRiver[i] -= 1
      }
      allReverseLogsDivs[reverseRiver[i]].classList.add('log')
    }
  }
  // When a car runs into a frog
  function frogColission() {
    if (frogArea[currentIndex].classList.contains('car')) {
      console.log('frog Break')
    }
    // else console.log('frog on')
  }
  // When a frog runs into a car
  function carCollision() {
    if (frogArea[currentIndex].classList.contains('car')) {
      console.log('Break')
    } else console.log('carry on')

  }

  // carCollision()


  // allRoadDivs.forEach((element) => {
  //   // console.log(element)
  //   if (element.classList.contains('road frog car')) {
  //     console.log('Break')
  //   } else console.log('carry on')
  // })











})
