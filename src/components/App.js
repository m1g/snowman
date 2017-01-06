import React, { Component } from 'react'
import _ from 'lodash'
import LetterButton from './LetterButton'
import Snowman from './Snowman'
import Word from './Word'

// ALPHABET is an array of 26 letters, 'a' through 'z', i.e. ['a', 'b', 'c', ...'z']
const ALPHABET = _.range(26).map(i => String.fromCharCode(i + 97))

// WORDS is an array of 1024 different seven letter words
const WORDS = require('raw!../wordList.txt').trim().split('\n')

class App extends Component {

  constructor () {
    super()
    this.state = {
      word: _.sample(WORDS),
      guesses: []
    }
  }

// adds letter to the existing guesses
  choose (letter) {
    this.setState({
      guesses: [...this.state.guesses, letter]
    })
  }

  get points () {
    return this.state.word.split('').filter((letter) => {
      return this.state.guesses.includes(letter)
    }).length
  }

  render () {
    const letters = ALPHABET.map((letter, i) => {
      return <LetterButton
        value={letter}
        onChoose={() => this.choose(letter)}
        disabled={this.state.guesses.includes(letter)}
        key={i} />
    })

    return <div className='app'>
      <main>
        <Snowman step={this.points} size={400} />
        <Word value={this.state.word} guesses={this.state.guesses} />
        <div className='keyboard'>
          {letters}
        </div>
      </main>
      <footer>Created with &hearts; at The Iron Yard.</footer>
    </div>
  }
}

export default App
