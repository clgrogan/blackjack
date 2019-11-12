// import { ColdObservable } from 'rxjs/testing/ColdObservable'

const main = () => {
  console.log('Print this on page load.')
  initializeGame()
}
// Declare globalish variables
const deckOfCardsComplex = []
const player1Hand = []
const dealerHand = []
let playersHandValue = 0

// ====================================
// Functions - generally speaking
// ====================================

// This function creates a card object for each card, then adds the card object to the deck array.
const buildDeck = () => {
  let deckIndex = 0
  const cardSuits = ['Clubs', 'Spades', 'Hearts', 'Diamonds']
  const cardRank = [
    'Ace',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'Jack',
    'Queen',
    'King'
  ]
  for (let iSuits = 0; iSuits <= cardSuits.length - 1; iSuits++) {
    for (let iCardRank = 0; iCardRank <= cardRank.length - 1; iCardRank++) {
      let cardComplex = { value: 0, suit: '', cardName: '', cardImageSrc: '' }
      // deckOfCards[deckIndex] = cardRank[iCardRank] + ' of ' + cardSuits[iSuits]

      // Populate complex card
      cardComplex.value = getCardValue(cardRank[iCardRank])
      cardComplex.suit = cardSuits[iSuits]
      cardComplex.cardName = cardRank[iCardRank] + ' of ' + cardSuits[iSuits]
      cardComplex.cardImageSrc =
        'images/cards/' +
        cardRank[iCardRank] +
        '_of_' +
        cardSuits[iSuits] +
        '.svg'

      // Populate complex deck
      deckOfCardsComplex.push(cardComplex)

      console.log(cardComplex)
      console.log(
        'display Complex Deck current item',
        deckOfCardsComplex[deckIndex]
      )

      deckIndex++
    }
    console.log('display Complex Deck', deckOfCardsComplex)
  }

  console.log(deckOfCardsComplex.length)
}

// Shuffle the deck
const shuffleComplexDeck = () => {
  let randomInt = 0
  let currentCard = ''
  for (let i = 0; i <= deckOfCardsComplex.length - 1; i++) {
    randomInt = Math.floor(Math.random() * deckOfCardsComplex.length)
    currentCard = deckOfCardsComplex[i]
    deckOfCardsComplex[i] = deckOfCardsComplex[randomInt]
    deckOfCardsComplex[randomInt] = currentCard
  }
}

// get the card value
const getCardValue = cardRank => {
  if (cardRank === 'King' || cardRank === 'Queen' || cardRank === 'Jack') {
    return 10
  } else if (cardRank === 'Ace') {
    return 11
  } else {
    return parseInt(cardRank)
  }
}

const dealCards = () => {
  for (let i = 0; i < 2; i++) {
    // remove card object from deck array and add to the player's hand array
    player1Hand.push(deckOfCardsComplex.pop())
    // remove card object from deck array and add to the dealer's hand array
    dealerHand.push(deckOfCardsComplex.pop())
    console.log(
      'card dealt',
      player1Hand.length,
      deckOfCardsComplex.length,
      player1Hand,
      dealerHand
    )
  }
}

// Start of Game Initialize Values / Display
const initializeGame = () => {
  console.log('initialized')
  // reset globalish variables
  deckOfCardsComplex.length = 0
  player1Hand.length = 0
  dealerHand.length = 0
  playersHandValue = 0

  // Display Hit and Stand Buttons
  document.querySelector('.hit-me-btn').style.display = 'block'
  document.querySelector('.stand-btn').style.display = 'block'
  // Hide Play Again button
  document.querySelector('.play-again-btn').style.display = 'none'

  document.querySelector('.display-message').textContent =
    'May the odds be ever in your favor'
  // Build the deck of cards array
  buildDeck()
  // shuffleDeck()
  shuffleComplexDeck()
  console.log('Deck after shuffle', deckOfCardsComplex)
  // Deal the cards into the players' hands
  dealCards()

  // Display the player's hand
  displayPlayerCards()

  // Display's the dealer's hand
  // displayDealerCards()

  // deleteCards()
}

// Display's dealer cards
const displayDealerCards = () => {
  // Delete the card images from the section
  document.getElementById('dealer-cards').innerHTML = ''
  for (let i = 0; i <= dealerHand.length - 1; i++) {
    const cardImage = document.createElement('img')
    cardImage.src = dealerHand[i].cardImageSrc
    cardImage.alt = dealerHand[i].cardName

    // Add the card value to the player's hand value
    playersHandValue = playersHandValue + dealerHand[i].value
    console.log(dealerHand[i].cardName, ' Hand Value ', playersHandValue)

    // Place Dealt Card Images Into Player Hand Section
    document.querySelector('.dealer-card-section').appendChild(cardImage)
  }
}

// Display's player cards
const displayPlayerCards = () => {
  playersHandValue = 0 // zero the player's hand
  // Delete the card images from the section
  document.getElementById('player-cards').innerHTML = ''
  for (let i = 0; i <= player1Hand.length - 1; i++) {
    const cardImage = document.createElement('img')
    cardImage.src = player1Hand[i].cardImageSrc
    cardImage.alt = player1Hand[i].cardName

    // Add the card value to the player's hand value
    playersHandValue = playersHandValue + player1Hand[i].value
    console.log(player1Hand[i].cardName, ' Hand Value ', playersHandValue)

    // Place Dealt Card Images Into Player Hand Section
    document.querySelector('.player-left-card-section').appendChild(cardImage)
  }
}

const deleteCards = () => {
  document.getElementById('player-cards').innerHTML = ''
  document.getElementById('dealer-cards').innerHTML = ''
}

const hitMe = () => {
  // Add a card to the player's hand// remove card object from deck array and add to the player's hand array
  player1Hand.push(deckOfCardsComplex.pop())
  displayPlayerCards()
  evaluatePlayerHand()
}

const evaluatePlayerHand = () => {
  if (playersHandValue > 21) {
    playerBusted()
  }
}

const playerBusted = () => {
  document.querySelector('.display-message').textContent = 'You Busted'
  endGame()
}

const dealerTurn = () => {
  console.log('dealer turn started')

  // Display's the dealer's hand
  displayDealerCards()
}

// End the game play
const endGame = () => {
  // Hide Hit and Stand Buttons
  document.querySelector('.hit-me-btn').style.display = 'none'
  document.querySelector('.stand-btn').style.display = 'none'
  // Unhide Play Again button
  document.querySelector('.play-again-btn').style.display = 'block'
}

// Start Listening
document.addEventListener('DOMContentLoaded', main)
document
  .querySelector('.play-again-btn')
  .addEventListener('click', initializeGame)
document.querySelector('.hit-me-btn').addEventListener('click', hitMe)
document.querySelector('.stand-btn').addEventListener('click', dealerTurn)

// document.querySelector('.deck').addEventListener('click', dealCard)
