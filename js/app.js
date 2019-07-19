document.addEventListener('DOMContentLoaded', () => {

  // grid divs
  const allPavementDivs = document.querySelectorAll('.pavement')
  const allRoadDivs = document.querySelectorAll('.road')
  const allTreesDivs = document.querySelectorAll('.trees')
  const allRiverDivs = document.querySelectorAll('.river')
  const allLilypadDivs = document.querySelectorAll('.lilypad')
  const allReverseLogsDivs = document.querySelectorAll('.riverreverse')

  // Whole moveable area for frog
  const frogArea = document.querySelectorAll('.container div')

  // Header button, countdown and score display
  const startButtonDisplay = document.querySelector('.start')
  let countdownDisplay = document.querySelector('.countdown')
  let scoreCountDisplay = document.querySelector('.score')
  let currentLevelDisplay = document.querySelector('.level')

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
  let currentLevel = +currentLevelDisplay.textContent
  let currentScore = +scoreCountDisplay.textContent

  // start the game = start positions and movment
  function startGame() {
    carObstaclesMove = setInterval(makeCarsMove,1000)
    logObstaclesMove = setInterval(makeLogsMove,1200)
    makeReverseMove = setInterval(makeReverseLogsMove,1000)
    document.addEventListener('keyup', moveMyFrog)
    overlayOff()
  }

  // timer countdown
  function countdown() {
    timeRemaining--
    countdownDisplay.textContent = timeRemaining

    if(timeRemaining === 0) {
      clearInterval(timerId)
      timerId = null
      countdownBreak()
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
        if(
          currentIndex % width !== 0 &&
          !frogArea[currentIndex - 1].classList.contains('treeimages')
        ) currentIndex -= 1
        // left
        break
      case 38:

        if(
          currentIndex - width >= 0 &&
          !frogArea[currentIndex - width].classList.contains('treeimages')
        ) {
          currentIndex -= width
          scoreMe()
        }
        // up
        break
      case 39:
        if(
          currentIndex % width < width - 1 &&
          !frogArea[currentIndex + 1].classList.contains('treeimages')
        ) currentIndex += 1
        // right
        break
      case 40:
        if(
          currentIndex + width < width * width &&
          !frogArea[currentIndex + width].classList.contains('treeimages')
        ) currentIndex += width
        // down
        break
    }
    frogArea[currentIndex].classList.add('frog')
    carCollision()
    killerPlantCollision()
    waterCollision()
    waterCollisionReverse()
    winGame()
  }

  // Starting position of cars/make cars move
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
    frogColission()
  }

  // Starting position of logs/make logs move
  const logIndices = [1,2,3,5,6,7,12,13,14,17,18,19]
  logIndices.forEach(logIndex => allRiverDivs[logIndex].classList.add('log'))

  function makeLogsMove() {
    ridingTheLogs()
    endOfTheLogCollision()
    for (let i = logIndices.length-1; i >= 0; i--) {
      allRiverDivs[logIndices[i]].classList.remove('log')

      if (logIndices[i] % width === width - 1)  {
        logIndices[i] -= (width-1)
      } else {
        logIndices[i] += 1
      }
      allRiverDivs[logIndices[i]].classList.add('log')
    }
  }

  // frog riding the moving logs
  function ridingTheLogs() {
    for (let i = logIndices.length-1; i >= 0; i--) {
      if (allRiverDivs[logIndices[i]].classList.contains('frog')) {
        frogArea[currentIndex].classList.remove('frog')
        currentIndex++
        frogArea[currentIndex].classList.add('frog')
      }
    }
  }

  // Starting position of reverse logs/make reverse logs move
  const reverseRiver = [0,1,6,7]
  reverseRiver.forEach(logIndex => allReverseLogsDivs[logIndex].classList.add('log'))

  function makeReverseLogsMove() {
    ridingTheLogsBackwards()
    endOfTheLogCollision()
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

  // riding the reverse logs
  function ridingTheLogsBackwards() {
    for (let i = 0; i < reverseRiver.length; i++) {
      if (allReverseLogsDivs[reverseRiver[i]].classList.contains('frog')) {
        frogArea[currentIndex].classList.remove('frog')
        currentIndex--
        frogArea[currentIndex].classList.add('frog')
      }
    }
  }

  // When a car runs into a frog
  function frogColission() {
    if (frogArea[currentIndex].classList.contains('car')) {
      breakGame()
    } else console.log('frog on')
  }

  // When a frog runs into a car
  function carCollision() {
    if (frogArea[currentIndex].classList.contains('car')) {
      breakGame()
    } else console.log('carry on')

  }

  // When a frog runs into a killerplant
  function killerPlantCollision() {
    if (frogArea[currentIndex].classList.contains('killerplant')) {
      breakGame()
    } else console.log('carry on')

  }

  // When a frog falls into the water
  function waterCollision() {
    if (frogArea[currentIndex].classList.contains('river') && !frogArea[currentIndex].classList.contains('log')) {
      breakGame()
    } else console.log('carry on')
  }

  // When a frog falls into the water on the reverse flowing river
  function waterCollisionReverse() {
    if (frogArea[currentIndex].classList.contains('riverreverse') && !frogArea[currentIndex].classList.contains('log')) {
      breakGame()
    } else console.log('carry on')
  }

  // reach end of the log flow and running into wall breaks the game
  function endOfTheLogCollision() {
    if (currentIndex % width === width - 1 || currentIndex % width === 0) {
      breakGame()
    }
  }

  // adding the tree image class
  const treePosition = [10,12,14,16,18]
  treePosition.forEach(logIndex => allTreesDivs[logIndex].classList.add('treeimages'))


  // Added a killer plant next to the 'safety' lilypads
  const killerPlantPosition = [1,3,5,7,9]
  killerPlantPosition.forEach(logIndex => allLilypadDivs[logIndex].classList.add('killerplant'))


  // Reset the frog to its starting position
  function breakGame() {
    frogArea[currentIndex].classList.remove('frog')
    currentIndex = 105
    frogArea[currentIndex].classList.add('frog')
    currentScore = 0
    scoreCountDisplay.textContent = currentScore
    currentLevel = 1
    currentLevelDisplay.textContent = currentLevel
    clearInterval(carObstaclesMove)
    clearInterval(logObstaclesMove)
    clearInterval(makeReverseMove)
    carObstaclesMove = setInterval(makeCarsMove,1000)
    logObstaclesMove = setInterval(makeLogsMove,1200)
    makeReverseMove = setInterval(makeReverseLogsMove,1000)
  }

  // If the countdown reaches 0 - things stop moving and frog cannot be moved
  function countdownBreak() {
    overlayOn()
    frogArea[currentIndex].classList.remove('frog')
    currentIndex = 105
    frogArea[currentIndex].classList.add('frog')
    currentScore = 0
    scoreCountDisplay.textContent = currentScore
    currentLevel = 1
    currentLevelDisplay.textContent = currentLevel
    clearInterval(carObstaclesMove)
    clearInterval(logObstaclesMove)
    clearInterval(makeReverseMove)
    document.removeEventListener('keyup', moveMyFrog)
    timeRemaining = 60
  }

  // Level won when this is called and level incremented
  function winGame() {
    if (frogArea[currentIndex].classList.contains('lilypad')) {
      frogArea[currentIndex].classList.remove('frog')
      frogArea[105].classList.add('frog')
      currentLevel++
      currentIndex = 105
      currentLevelDisplay.textContent = currentLevel
      timingIncrement()
    }
  }

  // increment speed as the levels increase
  let cartiming = 1000
  let logtiming = 1200
  let reverselogtiming = 1000

  // reducing the timing with each level and in turn increasing speed of obstacles
  function timingIncrement() {
    if (+currentLevelDisplay.textContent > 1) {
      clearInterval(carObstaclesMove)
      clearInterval(logObstaclesMove)
      clearInterval(makeReverseMove)
      carObstaclesMove = setInterval(makeCarsMove,(cartiming -= 100))
      logObstaclesMove = setInterval(makeLogsMove,(logtiming -= 100))
      makeReverseMove = setInterval(makeReverseLogsMove,(reverselogtiming -= 100))
    }
  }

  // Create score logic
  function scoreMe() {
    if (frogArea[currentIndex].classList.contains('road')) {
      currentScore += 10
      scoreCountDisplay.textContent = currentScore
    } else if (frogArea[currentIndex].classList.contains('trees')) {
      currentScore += 5
      scoreCountDisplay.textContent = currentScore
    } else if ((frogArea[currentIndex].classList.contains('log'))) {
      currentScore += 30
      scoreCountDisplay.textContent = currentScore
    } else if ((frogArea[currentIndex].classList.contains('lilypad'))) {
      currentScore += 50
      scoreCountDisplay.textContent = currentScore
    } else if ((frogArea[currentIndex].classList.contains('pavement'))) {
      currentScore += 0
    }
  }

  // toggles overlay appearing and disappearing
  function overlayOn() {
    document.getElementById('overlay').style.display = 'block'
  }

  function overlayOff() {
    document.getElementById('overlay').style.display = 'none'
  }



















})
