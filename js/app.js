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
  console.log(frogArea)

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
    carObstaclesMove = setInterval(makeCarsMove,500)
    logObstaclesMove = setInterval(makeLogsMove,800)
    makeReverseMove = setInterval(makeReverseLogsMove,500)
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
    // playJumpingSound()
    frogArea[currentIndex].classList.add('frog')
    carCollision()
    killerPlantCollision()
    occupyTreeSpace()
    waterCollision()
  }


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
    frogColission()
    // playDrivingSound()
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
    ridingTheLogs()
  }

  function ridingTheLogs() {
    for (let i = logIndices.length-1; i >= 0; i--) {
      if (allRiverDivs[logIndices[i]].classList.contains('frog')) {
        frogArea[currentIndex].classList.remove('frog')
        currentIndex++
        frogArea[currentIndex].classList.add('frog')
      }
    }
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
    ridingTheLogsBackwards()
  }

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
      console.log('frog Break')
    } else console.log('frog on')
  }

  // When a frog runs into a car
  function carCollision() {
    if (frogArea[currentIndex].classList.contains('car')) {
      console.log('Break')
    } else console.log('carry on')

  }

  // When a frog runs into a frog
  function killerPlantCollision() {
    if (frogArea[currentIndex].classList.contains('killerplant')) {
      console.log('KillerPlantbreak')
    } else console.log('carry on')

  }

  // When a frog falls into the water
  function waterCollision() {
    if (frogArea[currentIndex].classList.contains('river')) {
      console.log('Help Im drowning')
    } else console.log('carry on')

  }

  // adding the tree image class
  const treePosition = [10,12,14,16,18]
  treePosition.forEach(logIndex => allTreesDivs[logIndex].classList.add('treeimages'))


  // Adding logic so the frog cannot occupy the same space as the tree
  function occupyTreeSpace() {
    if (frogArea[currentIndex].classList.contains('treeimages')) {
      console.log('hmm there is a tree here')
    }
  }

  // Added a killer plant next to the 'safety' lilypads
  const killerPlantPosition = [1,3,5,7,9]
  killerPlantPosition.forEach(logIndex => allLilypadDivs[logIndex].classList.add('killerplant'))

  // Block access to these elements divs within frogarea - remove fropm frogArea array
  // frogArea[1,3,5,7,9] - break, no go area for frog
  // treeArea[1,3,5,7,9] - break, no go area for frog




  // function playJumpingSound() {
  //   frogArea.forEach(a => {
  //     const frogJumpSound = document.createElement('AUDIO')
  //     frogJumpSound.src = 'audio/jumpSound.mp4'
  //     a.appendChild(frogJumpSound)
  //     if(frogJumpSound.paused) {
  //       frogJumpSound.play()
  //     } else {
  //       frogJumpSound.pause()
  //       frogJumpSound.currenTime = 0
  //     }
  //   })
  // }
  //
  // function playDrivingSound() {
  //   allRoadDivs.forEach(a => {
  //     const carDrivingSound = document.createElement('AUDIO')
  //     carDrivingSound.src = 'audio/Urban Traffic-SoundBible.com-1217469275.wav'
  //     a.appendChild(carDrivingSound)
  //     if (carDrivingSound.paused) {
  //       carDrivingSound.play()
  //     } if (frogArea[currentIndex].classList.contains(!'road')) {
  //       carDrivingSound.pause()
  //       carDrivingSound.currenTime = 0
  //     }
  //   })
  // }








})
