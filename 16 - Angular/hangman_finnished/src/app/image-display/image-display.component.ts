import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-display',
  imports: [],
  templateUrl: './image-display.component.html',
  styleUrl: './image-display.component.css'
})
export class ImageDisplayComponent implements OnChanges {

  @Input({required: true}) step = 0;
  src =  ''
  alternative_text = 'alt text for this image'

  ngOnChanges(): void {
    this.src = this.step + '_10.png';
    this.alternative_text = `Hangman step ${this.step}/10`
  }
}
