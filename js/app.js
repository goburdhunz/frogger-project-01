//
// class NewFroggerGame {
//   constructor() {
//
//   }
// }



document.addEventListener('DOMContentLoaded', () => {

  const allPavementDivs = document.querySelectorAll('.pavement div')
  const allRoad1Divs = document.querySelectorAll('.road1 div')
  const allRoad2Divs = document.querySelectorAll('.road2 div')
  const allTreesDivs = document.querySelectorAll('.trees div')
  const allRiverDivs = document.querySelectorAll('.river div')
  const allLilypadDivs = document.querySelectorAll('.lilypad div')
  const frogArea = document.querySelectorAll('.container div')
  // console.log(frogArea)

  let currentIndex = 105
  const width = 10

  function addFrog() {
    frogArea[105].classList.add('frog')
  }

  addFrog()

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

  document.addEventListener('keyup', moveMyFrog)
























})
