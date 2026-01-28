import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeyboardComponent } from "./components/keyboard/keyboard.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, KeyboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  MAX_MISTAKES = 6;
  mistakes = 0;
  secretWord = 'secretary';
  obscuredWord = '_______';
  guessedLetters: string[] = [];
  gameStatus: 'playing' | 'won' | 'lost' = 'playing';
  setOfWords = ['area','book','business','case','child','company','country','day','eye','fact','family','government','group','hand','home','job','life','lot','man','money','month','mother','Mr','night','number','part','people','place','point','problem','program','question','right','room','school','state','story','student','study','system','thing','time','water','way','week','woman','word','work','world','year',]
  
  ngOnInit(): void {
    this.restartGame();
  }

  guess(letter: string) {
    if(this.gameStatus != 'playing') {
      return;
    }
    this.guessedLetters = [...this.guessedLetters, letter];
    
    if (!this.secretWord.includes(letter)) {
      this.mistakes++;
      if (this.mistakes >= this.MAX_MISTAKES) {
        this.gameStatus = 'lost';
      }
    }
    
    this.obscuredWord = this.getObfuscatedWord();
    
    if (!this.obscuredWord.includes('_')) {
      this.gameStatus = 'won';
    }
  }
  
  getObfuscatedWord(): string {
    let letters = this.secretWord.split('');
    letters = letters.map(l => {
      if (this.guessedLetters.includes(l)) {
        return l;
      }
      else {
        return ' _ ';
      }
    })
    return letters.join('');
  }

  restartGame() {
    this.secretWord = this.setOfWords[Math.floor(this.setOfWords.length * Math.random())].toLowerCase();
    this.guessedLetters = [];
    this.mistakes = 0;
    this.obscuredWord = this.getObfuscatedWord();
    this.gameStatus = 'playing';
  }
}



// wordList = ['angular', 'component', 'typescript', 'directive'];
// secretWord = '';
// guessedLetters: string[] = [];
// maxMistakes = 6;
// mistakes = 0;
// gameStatus: 'playing' | 'won' | 'lost' = 'playing';

// constructor() {
//   this.resetGame();
// }

// obscuredWord(): string {
//   return this.secretWord
//     .split('')
//     .map(letter => (this.guessedLetters.includes(letter) ? letter : '_'))
//     .join(' ');
// }

// guess(letter: string) {
//   if (this.gameStatus !== 'playing' || this.guessedLetters.includes(letter)) return;

//   this.guessedLetters.push(letter);

//   if (!this.secretWord.includes(letter)) {
//     this.mistakes++;
//     if (this.mistakes >= this.maxMistakes) {
//       this.gameStatus = 'lost';
//     }
//   } else if (!this.obscuredWord().includes('_')) {
//     this.gameStatus = 'won';
//   }
// }

// resetGame() {
//   this.secretWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
//   this.guessedLetters = [];
//   this.mistakes = 0;
//   this.gameStatus = 'playing';
// }