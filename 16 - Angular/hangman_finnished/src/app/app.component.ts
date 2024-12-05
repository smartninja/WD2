import { Component } from '@angular/core';
import { ImageDisplayComponent } from './image-display/image-display.component';
import { LetterPickerComponent } from './letter-picker/letter-picker.component'

@Component({
  selector: 'app-root',
  imports: [ImageDisplayComponent, LetterPickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Hangman game';

  wrongGuessesCount = 1;

  missedLetters:string[] = [];
  hitLetters:string[] = [];
  secretWord = this.selectSecretWord();
  hiddenWord = this.hideWord();
  gameStatus: 'playing'|'won'|'lost' = 'playing';

  selectSecretWord() {
    const words = ['area','book','business','case','child','company','country','day','eye','fact','family','government','group','hand','home','job','life','lot','man','money','month','mother','Mr','night','number','part','people','place','point','problem','program','question','right','room','school','state','story','student','study','system','thing','time','water','way','week','woman','word','work','world','year',]
    const randomItemId = Math.floor(words.length * Math.random());
    return words[randomItemId].toUpperCase();
  }

  hideWord(){
    let hidden = '';
    for(let char of this.secretWord.split('')){
      if(this.hitLetters.includes(char)){
        hidden += char;
      } else {
        hidden += '_'
      }
    }
    return hidden;
  }

  handleCharSelection(char: string){
    if (this.gameStatus !== 'playing') {
      return;
    }

    if (this.secretWord.includes(char)) {
      this.hitLetters.push(char);
      this.hiddenWord = this.hideWord();
      if(this.hiddenWord === this.secretWord){
        this.gameStatus = 'won';
      }
    }else{
      this.missedLetters.push(char);
      this.wrongGuessesCount += 1;
      if(this.wrongGuessesCount > 9) {
        this.gameStatus = 'lost';
      }
    }
    
  }

}
