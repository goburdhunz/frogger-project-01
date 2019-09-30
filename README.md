# frogger-project-01 ![alt text](https://miro.medium.com/fit/c/50/50/1*HDIDs6Iq0bW-2qeYXqjp9w.png "GA logo")

*A vanilla javascript game*

## Project 1: Frogger General Assembly

Frogger is a classic arcade action from the 80s, originaly developed by Konami.
The object of the game is to direct frogs to the lilypads. You score points as you move closer
and the obstacle speed/level is incremented every time you reach the lilypad. You will have to cross a busy road, navigate a river using logs and avoid the carnivore plants at the last hurdle.

I created frogger for the end of module one project - We have only been looking at javascript for two weeks! We had a week
to plan, develop and test the game.

Launch on GitHub Pages - https://goburdhunz.github.io/frogger-project-01/

![alt text](https://i.imgur.com/SdRlFpC.png "Project screenshot")

![alt text](https://i.imgur.com/PXPzAxy.png1 "Project screenshot")


## Brief

Requirements
* The game should be playable for one player.
* The obstacles should be auto generated.

Suggested enhancements
* Different difficulty levels.
* Auto generated boards.
* Two player mode on the same computer: players take turns the first to lose more lives across a whole game loses.
* High score board with `localStorage`

Challenges
* The main difficulty here is animating the obstacles and detecting collision. There will be a number of timers to manage across the whole game, which can be easily get out of hand.

## Technologies Used

HTML5

SASS/CSS3

JavaScript (ES6)

Git

GitHub

Google Fonts

## Game architecture

Within our overall brief, we were instructed to use grids to layout out game and not the default html canvas element. This meant that my game would be consisted of a lot of small divs to cover the different areas of the game. I grouped the thematically similar divs together and have them appropriate semantic class names such as 'road' & 'river'. Grouping similar elements together allowed me to access the DOM object model and to gather all the same-type divs together into one variable and thus creating an array of those individual divs. These arrays created from the list of elements were crucial in being able to add and remove classes from the JS file.


#### Movement

The frog would have a starting index, and is able to be moved using the arrow keys - I used the index position & width to increase and decrease the current index, which moved the frog.

```JS
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
```

#### Adding in obstacles and letting them move in a loop

For me, this was the hardest aspect of the game - adding the obstacles at specific indexes and having them move forward and loop back to the start. The obstacles start at a hard coded index point and then this index point is incremented until they reach the end of their respective rows.The log movements were a little more complicated as i had to reverse the incrementing index points to reflect a backwards flow.

``` JS
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
```

#### Collisions

I defined the collisions as being when the frog shared the same div with either a car, river, lily pad or collided into the wall of the game. In the code, this was looking at the point when a specific div contained the class of frog + any of the above obstacles. Once this occurred, there was a break in the game and the starting position was reset.

#### Scoring and levels

I added the scoring by how close the player got to the lily pad - this scoring can only be achieved when going upwards. Levels incremented when the level was 'won' - i.e the player reached a lily pad - then the level count incremented and the intervals were reduced by a set amount, increasing the speed of movement.

``` JS
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
```

#### Timings

This was another tricky side to this implementation of the game. I had multiple timings going on for the obstacle movements and also for the countdown. These timings incremented and had to be reset according to the level, if the original position was reset after a break and after a restart. The increasing speed of the gameplay through the levels is done by gradually reducing the obstacle intervals after each level win.

## Bugs

There will always be bugs - no matter how long you spend developing something.

* In this game, the timing, level increment and gameplay speed gets muddled if you reach the end of the countdown and you start the game again. The speed is not incrementing correctly.

* Also, sometimes the game will collide with a wall one div too early, before it has reached the of the row.

* In some cases the speed is being incremented when you keyUp.


## Wins and Blockers

The main blocker was the movement of the obstacles - this is something that i spent a lot of time on and tried different solutions. I had to rewrite the way i added the obstacles in the first place in order to be able the simplify the way the movements worked.

The wins were getting the main game logic working after i got over the obstacles moving block. Also, adding the overlay at the end was simpler than i thought and also the webpage outside of the game was fun to work on.

## Key learnings
 
The purpose of this project was to cement the basic concepts of HTML/CSS, javascript and DOM manipulation. The idea of adding different views after the HTML structure had already been loaded was a foreign concept before learning about the DOM. In this sense, the project served its purpose as I had to build the HTML structure without the help of HTML canvas and the basic logic of the game was based on DOM manipulation. I also learnt about project management and the benefits of taking the time to plan before building anything. 

Moreover, there were deeper learnings in terms of how I approach problems as a whole. There were moments when I was stuck and nothing was moving forward. During these periods, I had to either stare at my screen helplessly or go out and take a walk and (hopefully) realise the solution during my break. Asking for help was something else that helped me during this project - I realised that seeking help or another viewpoint, especially in software development, is never a bad thing - even if the individual doesn't have the specific answer, they might point you in the right direction.


## Future content

* Spent some time adding sounds which did not play very well at all and I decided to remove at this time. In a future iteration, i would like to try and add some game sounds to the movement, collisions, game music prior to start.

* Would also like to store the scores in memory and to display a leaderboard.

* Different obstacles and animations to make them move better across the game

* Better media to fill the divs
