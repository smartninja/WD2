# Lesson 15 - Angular

## About

Angular is a **full-featured framework** developed by **Google** for building dynamic web applications, whereas React is a **library** developed by Facebook focused primarily on building user interfaces. Unlike React's unopinionated, component-based architecture that relies heavily on third-party libraries for routing and state management, Angular provides a **comprehensive, opinionated solution** out of the box, including built-in routing, form handling, HTTP services, and dependency injection. Angular uses **TypeScript** by default, promoting strong typing and object-oriented programming, while React uses JavaScript with optional TypeScript support. This makes Angular a better fit for developers who prefer structure, convention, and a complete development ecosystem.

## Set up an Angular project

We’ll use the Angular CLI to scaffold our project. You need Node.js installed. Then install Angular CLI:

```bash
npm install -g @angular/cli
```

Create a new Angular project with:

```bash
ng new hangman
```

Choose `CSS` for the style sheet format and select "No" for the Server side rendering. After the installation, go to the created folder and run the `ng serve` command.

```bash
cd hangman
ng serve
```

In the folder we can see the following files and folders.

```
hangman/
├── src/                    # Main source folder for the app
│   ├── app/                # Application module and components
│   │   ├── app.component.ts       # Root component (logic)
│   │   ├── app.component.html     # Root component (template)
│   │   ├── app.component.css      # Root component (styles)
│   │   ├── app.component.spec.ts  # Specification for root component (tests)
│   │   └── app.module.ts          # App module declaration
│   ├── assets/            # Static assets (images, fonts, etc.)
│   ├── environments/      # Environment-specific settings
│   ├── index.html         # Main HTML page
│   ├── main.ts            # Entry point that bootstraps the app
│   ├── styles.css         # Global styles
│   └── angular.json       # Angular CLI config
├── package.json           # Project metadata and dependencies
├── angular.json           # CLI config (build/test settings)
├── tsconfig.json          # TypeScript compiler options
└── README.md              # Project overview

```

## Use the prepared CSS

Again since we already know about styling HTML, we can just use the following CSS for styling. Put  it into the global `styles.css` file.

```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
}

p {
    color: #444;
    text-align: center;
}

button {
    display: block;
    margin: auto;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background-color: #2196f3;
    color: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

button:hover {
    background-color: #1976d2;
}

.letters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px 0;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}
 .letters button {
    margin: 5px;
    height: 40px;
} 

.letters button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    color: #888;
}

.obscured, .result {
    font-size: 1.5rem;
    text-align: center;
    margin: 15px 0;
    color: #222;
}

```

## Set up the basic HTML structure

Let's create the basic HTML that we'll be using during the game. In Angular we write HTML templates into `.component.html` files. This is analogous to a Jinja template.

```html
<h1>Hangman</h1>
<p class="obscured">Word: H_ngm_n </p>
<p>Mistakes: 1 / 6 </p>

<div class="letters">
  <button>a</button>
  <button>b</button>
  <button>c</button>
  <button>d</button>
  <button>e</button>
  <button>f</button>
  <button>g</button>
  <button>h</button>
  <button>i</button>
  <button>j</button>
  <button>k</button>
  <button>l</button>
  <button>m</button>
  <button>n</button>
  <button>o</button>
  <button>p</button>
  <button>q</button>
  <button>r</button>
  <button>s</button>
  <button>t</button>
  <button>u</button>
  <button>v</button>
  <button>w</button>
  <button>x</button>
  <button>y</button>
  <button>z</button>
</div>

<p class="result">🎉 You won!</p>
<p class="result">💀 You lost! Word was: "secretWord" </p>
<button>🔄 Restart</button>

```

## The logic of the component

Of course, the HTML template will need to display the dynamic data from. This is achieved through data binding. 

First let's define the needed variables in it's component file `app.component.ts`. The variables that we'll be displaying are the following:

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  MAX_MISTAKES = 6;
  mistakes = 0;
  secretWord = 'secretary';
  obscuredWord = '';
  guessedLetters: string[] = [];
  gameStatus: 'playing' | 'won' | 'lost' = 'playing';
}
```

The `@Component` part in Angular is a **decorator** that marks a TypeScript class as an Angular component. It tells Angular how to instantiate and render this component in the DOM.

The object passed into `@Component({...})` is the **component metadata**, which describes how the component works:

- `selector`: the HTML tag used to embed the component (e.g., `<app-root>`).
- `imports`: optional list of standalone modules/components to import (like `RouterOutlet`).
- `templateUrl`: the path to the component's HTML template file.
- `styleUrl`: the path to the component's CSS file (this should actually be `styleUrls` if it's an array, or corrected to `styleUrl` if a string—but Angular expects `styleUrls`).

In short, the `@Component` decorator links the component class to its visual and behavioral definition. We will understand these settings more through the exercise.

## Data binding

Now when we created the component with its properties, we can use them to make the template dynamic. Change the template to include the variables from the component:

```html
<h1>Hangman</h1>
<p class="obscured">Word: {{ obscuredWord }} </p>
<p>Mistakes: {{ mistakes }} / {{ MAX_MISTAKES }} </p>

<div class="letters">
  <button>a</button>
  <button>b</button>
  <button>c</button>
  <button>d</button>
  <button>e</button>
  <button>f</button>
  <button>g</button>
  <button>h</button>
  <button>i</button>
  <button>j</button>
  <button>k</button>
  <button>l</button>
  <button>m</button>
  <button>n</button>
  <button>o</button>
  <button>p</button>
  <button>q</button>
  <button>r</button>
  <button>s</button>
  <button>t</button>
  <button>u</button>
  <button>v</button>
  <button>w</button>
  <button>x</button>
  <button>y</button>
  <button>z</button>
</div>

<p class="result">🎉 You won!</p>
<p class="result">💀 You lost! Word was: "{{ secretWord }}" </p>
<button>🔄 Restart</button>
```

Similar to Jinja, we use double brackets `{{ }}` to interpolate a variable into the HTML.

We also have to display the "result" paragraphs only when the correct state is reached. For this we'll use the `@if` block conditional. Change the last lines to the following 

```html
@if (gameStatus == 'won'){
  <p class="result">🎉 You won!</p>
}
@if (gameStatus == 'lost') {
  <p class="result">💀 You lost! Word was: "{{ secretWord }}" </p>
}
```

Another thing we want to fix is repeating the `<button>_</button>` lines. These are not nice to read, let's use a loop to make the code more readable

```html
<div class="letters">
  @for (letter of 'abcdefghijklmnopqrstuvwxyz'.split(''); track $index) {
    <button
    >
    {{ letter }}
  </button>
  }
 </div>
```

These are both similar to plane JavaScript, however in the past, Angular used the `*nfIf`  and `*ngFor` directives. The new syntax was introduced in Angular version 17 and the old syntax was deprecated in Angular version 20.

## Add the behavior

To make the game function, we will have to write some functions to manage the internal state of the application. We'll start by guessing a letter.

```ts
// ...
export class AppComponent {
  MAX_MISTAKES = 6;
  mistakes = 0;
  secretWord = 'secretary';
  obscuredWord = '';
  guessedLetters: string[] = [];
  gameStatus: 'playing' | 'won' | 'lost' = 'playing';

  guess(letter: string) {
    this.guessedLetters = [...this.guessedLetters, letter];


    if (!this.secretWord.includes(letter)) {
      this.mistakes++;
      if (this.mistakes >= this.MAX_MISTAKES) {
        this.gameStatus = 'lost';
      }
    }
    
    if (!this.obscuredWord.includes('_')) {
      this.gameStatus = 'won';
    }
  }
}
```

To trigger this action, we have to add event binding to the template. We'll add that on all of the buttons with letters.

```html
<div class="letters">
  @for (letter of 'abcdefghijklmnopqrstuvwxyz'.split(''); track $index) {
    <button
    (click)="guess(letter)"
    >
    {{ letter }}
  </button>
  }
 </div>
```

This is called event binding.

We also need to disable buttons, that were already clicked. We'll do that with property binding

```html
    <button
    (click)="guess(letter)"
    [disabled]="guessedLetters.includes(letter)"
    >
```

On every click we also need to recalculate the hidden word:

```ts
  getObfuscatedWord(): string {
    let letters = this.secretWord.split('');
    letters = letters.map(l => {
      if (this.guessedLetters.includes(l)) {
        return l;
      }
      else {
        return '_';
      }
    })
    return letters.join('')
  }
```

And call this every time a guess is chosen, before checking if the answer is correct.

```ts
  guess(letter: string) {
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
```

Add the functionality for restarting the game. Here we'll choose a random word from a list and obfuscate it.

In HTML:

```html
<button (click)="restartGame()">🔄 Restart</button>
```

and in the component

```ts
  restartGame() {
    this.secretWord = this.setOfWords[Math.floor(this.setOfWords.length * Math.random())].toLower();
    this.guessedLetters = [];
    this.mistakes = 0;
    this.obscuredWord = this.getObfuscatedWord();
    this.gameStatus = 'playing';
  }
```

And finally, prevent the game to be continued when it is lost or won. We'll do this in the `guess()` function

```ts
  guess(letter: string) {
    if(this.gameStatus != 'playing') {
      return;
    }
      //....
  }
```

## Doing things on component initialization

The way we've build this app, we have to restart the game when the game starts. We can do different things in the life-cycle of an Angular component with special methods that are run at different times during the "life of a component". These methods are called **lifecycle hooks**. The one we'll use here is `ngOnInit` which runs when the component is initialized. It's good practice to indicate that the component class implements this method, with the `implements OnInit` line.

```ts
export class AppComponent implements OnInit {
  // ...
  
  ngOnInit(): void {
    this.restartGame();
  }
```

The game is now finished and should play correctly. Try it out.

## Spliting the app into components

The benefit of Angular is to be able to make generalized components that could be used in different scenarios. Currently we only have one main component in the `src/app/` folder. Let's make the 'keyboard' a separate component.

We can create a new component with a command-line program:

```bash
ng generate component components/keyboard
```

The script generates 4 new files in the `src/components/keyboard/` folder. This is our new component. Let's move the logic for the keyboard to these new files:

**keyboard.component.ts**

```ts
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  imports: [],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent {
  keyboardPresse = output<string>();

  handleClick(letter: string) {
    this.keyboardPresse.emit(letter);
  }

  guessedLetters: string[] = [];
}
```

**keyboard.componetn.html**

```html
<div class="letters">
    @for (letter of 'abcdefghijklmnopqrstuvwxyz'.split(''); track $index) {
      <button
      (click)="handleClick(letter)"
      [disabled]="guessedLetters.includes(letter)"
      >
      {{ letter }}
    </button>
    }
   </div>
```

We also need to add this new component to the parent component and listen to the events emitted in the new component.

**app.component.html**

```html
<h1>Hangman</h1>
<p class="obscured">Word: {{ obscuredWord }} </p>
<p>Mistakes: {{ mistakes }} / {{ MAX_MISTAKES }} </p>

<p>Letters guessed: {{ guessedLetters.join(', ') }}</p>

<app-keyboard (keyboardPress)="guess($event)" [disabledLetters]="guessedLetters"></app-keyboard>

@if (gameStatus == 'won'){
  <p class="result">🎉 You won!</p>
}
@if (gameStatus == 'lost') {
  <p class="result">💀 You lost! Word was: "{{ secretWord }}" </p>
}
<button (click)="restartGame()">🔄 Restart</button>


```

Using `input()` and `output()` is how component in Angular communicate to each other.

## Homework

For homework, create a new component that will be used instead of the "Mistakes" line. The component should accept one input value and draw the correct image based on that value. The images for this you can find attached to this lecture in the `hangman_assets/` folder.

To make it more sophisticated, make the component accept two inputs: "mistakes" and ''maxMistakes' and select the correct image based on the "ratio" of mistakes. This way the game can be adjusted as being harder or easier.
