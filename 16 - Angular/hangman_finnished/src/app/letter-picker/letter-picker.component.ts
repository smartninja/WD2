import { Component, output } from '@angular/core';

@Component({
  selector: 'app-letter-picker',
  imports: [],
  templateUrl: './letter-picker.component.html',
  styleUrl: './letter-picker.component.css'
})
export class LetterPickerComponent {

  selectLetter = output<string>();
  letters = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
  ]

  chooseCharacter(char:string){
    this.letters = this.letters.filter(el => el !== char);
    this.selectLetter.emit(char);
  }

}
