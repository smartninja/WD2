import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  imports: [],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent {
  keyboardPress = output<string>();
  disabledLetters = input<string[]>([]);

  handleClick(letter: string) {
    this.keyboardPress.emit(letter);
  }

  guessedLetters: string[] = [];
}
