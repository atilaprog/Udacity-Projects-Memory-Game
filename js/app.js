/*
* Create a list that holds all of your cards
*/

/*-----Variables and constant declaration-----*/
const allCards = document.querySelector('.deck')
const resetButton = document.querySelector('.restart')
const stars = document.querySelector('.stars')
const listOfStars = document.querySelectorAll('.li-stars')
const starChild = undefined
const increaseMoves = document.querySelector('.moves')
let hoursTimer = document.querySelector('.hours')
let minutesTimer1 = document.querySelector('.minutes1')
let secondsTimer1 = document.querySelector('.seconds1')
let minutesTimer2 = document.querySelector('.minutes2')
let secondsTimer2 = document.querySelector('.seconds2')
let secondsTimer3 = document.querySelector('.seconds3')
let textModal = document.querySelector('.text-modal')
let span = document.getElementsByClassName('close')[0]
let modal = document.getElementById('myModal')



/*-----Arrays-----*/
let cardsToShuffle = [].slice.call(allCards.children)
/*-----Deck Match-----*/
let deckMatch = []
/*-----Deck to loose stars-----*/
let deckChances = []
/*-----Deck Opened-----*/
let deckOpened = []

/*-----Array to shuffle-----*/
let classToShuffle = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 
'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 
'bomb', 'bomb']  

/*-----Events-----*/
/*-----Click Deck-----*/
allCards.addEventListener('click', addOpenShowClass)
resetButton.addEventListener('click', resetGame)
span.addEventListener('click', closeModal)

/*-----Functions-----*/
//function to add open and match class in target
function addOpenShowClass (event){
    
    let target = event.target
    let child = target.firstElementChild
    
    if(target.classList.contains('deck')){
        return
    }
    
    if(target.classList.contains('same')){
        return
    }
    
    if(!deckOpened.includes(deckOpened[0])){
        deckOpened.unshift(child)
        target.classList.add('open', 'show', 'same')
    } 
    
    else if(!target.classList.contains('same')){
        target.classList.add('open', 'show', 'same')
        deckOpened.unshift(child)
        checkMatch()   
    }
}

//function if you loose a chance
function lostChances (){

    if(deckChances.length == 3 || deckChances.length == 6 || deckChances.length == 9 ){ let starChild = document.querySelector('.fa-star')
    starChild.classList.remove('fa-star')
    starChild.classList.add('fa-star-o', '1')
    if(listOfStars[2].classList.contains('1')){
        resetGame()
    }}
}


//function to reset game
function resetGame(){

    deckChances.length = 0
    deckOpened.length = 0
    classToShuffle = shuffle(classToShuffle)
    
    //put all stars again in the game panel
    listOfStars.forEach(putStars => {
        putStars.classList.remove('fa-star-o', '1')
        putStars.classList.add('fa-star')
    })
    
    //close all cards
    for (let i = 0; i < allCards.children.length; i++) {
        const element = allCards.children[i]
        element.classList.remove('open','show','same','match')
        
        removeClassByPrefix(element.firstElementChild, 'fa-')
        
        const symbol = `fa-${classToShuffle[i]}`
        element.firstElementChild.classList.add(symbol) 
    }
    
    
    
    if(deckMatch.length == 8){
        modal.style.display = 'block'
        textModal.textContent = `You win with ${increaseMoves.textContent} moves`
    }else{
        modal.style.display = 'block'
        textModal.textContent = 'Try again'
    }
    
    increaseMoves.textContent = 0
    deckMatch.length = 0

}


//function to check if cards match
function checkMatch(){
    increaseMoves.textContent++
    let length = deckOpened.length
    let firstClick = deckOpened[0]
    let lastClick = deckOpened[1]
    if(length === 2){
        if(firstClick.classList.value == lastClick.classList.value){
            matchCard(firstClick.parentElement)
            matchCard(lastClick.parentElement)
            deckOpened.length = 0
            deckMatch.push('1')
        }
        
        if(firstClick.classList.value != lastClick.classList.value && deckOpened[1] != undefined){
            closeCard(firstClick.parentElement)
            closeCard(lastClick.parentElement)
            deckOpened.length = 0
            deckChances.push('check')

            lostChances()
        }
    }
}

//function to close targets
function closeCard (card){
    setTimeout(() => {
        card.classList.remove('open', 'show', 'same')
    }, 500)
}

//function to add 'match' class
function matchCard (card){
    setTimeout(() => {
        if(deckMatch.length === 8){
            resetGame()
        }
    }, 500)
    card.classList.add('match')
}

//function to close modal
function closeModal (){
    modal.style.display = 'none'
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    
    var currentIndex = array.length, temporaryValue, randomIndex

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array
}

//function to remove prefix of classes
function removeClassByPrefix(el, prefix, replace = '') {
    var regx = new RegExp('\\b' + prefix + '(.*)?\\b', 'g')
    el.className = el.className.replace(regx, replace)
    return el
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
