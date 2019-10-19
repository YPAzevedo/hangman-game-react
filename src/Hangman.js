import React, { Component } from "react";
import {randomWord} from './words';
import _ from 'underscore';
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={`${ltr}000`}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  restartGame = () =>{
    this.setState(st =>({
      nWrong: st.nWrong = 0,
      guessed: st.guessed = new Set(),
      answer: st.answer = randomWord()
    }))
  }

  /** render: render game */
  render() {
    let block
    if(_.isEqual(this.guessedWord(), this.state.answer.split(""))){

        block = <div className="Won"><p className='Hangman-word'>{this.state.answer}</p>
        <p className='Hangman-btns'>YOU WON! YOU SAVED HIM!</p></div>

    } else if(this.state.nWrong !== this.props.maxWrong){

        block = <div className="Buttons"><p className='Hangman-word'>{this.guessedWord()}</p>
        <p className='Hangman-btns'>{this.generateButtons()}</p></div>

    } else{

        block = <div className="Lost"><p className='Hangman-word'>{this.state.answer}</p>
        <p className='Hangman-btns'>YOU LOST! HE HANGED!</p></div> 

    }
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} wrongs of ${this.props.maxWrong}`} />
        <h3 className='Hangman-wrong'>Wrong guesses:{this.state.nWrong}</h3>
        {block}
        <button id='Hangman-restart' onClick={this.restartGame}>Restart</button>
      </div>
    );
  }
}

export default Hangman;
