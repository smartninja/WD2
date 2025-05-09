# Lesson 14 - React

React is a JavaScript library for building user interfaces, primarily for web applications. Developed by **Facebook**, it allows developers to create **reusable UI components** and manage application state efficiently using a declarative and component-based approach. React utilizes a virtual DOM to optimize rendering performance, making it fast and responsive. It is widely used for building dynamic, interactive, and scalable front-end applications.

To learn about React, we'll use it's official tutorial to build a Tic-Tac-Toe game.

## Build a game with react

First we'll create react app. We'll use `vite` for this. This lesson uses vite version 6.0, but later versions should work the same.

```bash
npm create vite@6.0.0
```

Name the project **tic-tac-toe** and select **React** as the framework and **JavaScript** as the language. Then do the following:

```bash
cd tic-tac-toe
npm install
npm run dev
```

## Reviewing the files

Let' go through the files installed by Vite and see what they're for ...

```
node_modules/   -------- a directory of all dependencies
index.html      -------- a main html file to which our app will get rendered into. Note the <div id="root"> tag
package.json    -------- npm package file
package-lock.json ------ npm lock file
public/         -------- a folder for static assets that should be accessible after the build
README.md       -------- a README markdown file where you can describe your project
src/            -------- the main directory for our source code
vite.config.js  -------- the configuration file for vite, this configuration helps building react
eslint.config.js ------- a default configuration file for ESlint - we'll talk about this in lesson about code quality
```

## Style sheets

Since we already know a lot about CSS and this lesson is not intended for learning about CSS we'll just replace the contents of `src/App.css` with the code below:

```css
.board {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.board-row {
  display: flex;
  flex-direction: row;
}

.square {
  border: 1px solid #999;
  font-weight: bold;
  font-size: 2rem;
  height: 60px;
  width: 60px;
}

.status {
  margin-top: 2rem;
  font-size: 1.4rem;
}
```

Also let's remove all the base CSS that we can find in the `src/index.css` file.

## Create your first component

React apps are built by creating components that communicate amongst each other. A component is part of reusable code that creates a part of the user interface. Let's create our first component in the `App.jsx` file:

```jsx
import './App.css';

function App() {
  return (
        <button className="square">X</button>
  );
}

export default App;
```

Looking from a point of view of JavaScript, a component is just a function that returns a special kind of object; a JavaScript XML or a **JSX** which is just a syntactic sugar for React. In the example above, the return JSX translates to `React.createElement("button", { className: 'square' }, "X");`.

The attribute `className` actually defines the css class of the element.  Think about why we need to use `className` instead of `class` for css classes.

Now try with two Squares

```jsx
  return (
        <button className="square">X</button>
        <button className="square">X</button>
  );
```

The component must always have one root element. We can use an empty JSX element `<></>` to wrap multiple elements in the component.

## Build the tic-tac-toe board

Fix the error and create 9 fields

```jsx
import './App.css';

function App() {
  return (
    <div className="board">
      <div className='board-row'>
        <button className="square">1</button>
        <button className="square">2</button>
        <button className="square">3</button>
      </div>
      <div className='board-row'>
        <button className="square">4</button>
        <button className="square">5</button>
        <button className="square">6</button>
      </div>
      <div className='board-row'>
        <button className="square">7</button>
        <button className="square">8</button>
        <button className="square">9</button>
      </div>
    </div>
  );
}

export default App;
```

In the example above, we have a lot of the code repeating. All of the buttons have the same class name and just differ in the element they're wrapping. Let's rather create a reusable component and use that:

```jsx
import './App.css';

function Square() {
  return <button className="square">1</button>;
}

function App() {
  return (
    <div className='board'>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  );
}

export default App;
```

The `<Square>` component now works for itself and the internal implementation is decoupled of it's use. This is a common practice in software engineering. Think only about the APIs, functions and class inheritance.

Note how we name the components to start with a capital letter. This is how all React components should be named as lower case letters are reserved for native HTML tags.

To make the component really usable, we need to make it more general so that it's able to receive the properties from the parent component. 

```jsx
import './App.css';

function Square({text}) {
  return <button className="square">{text}</button>;
}

function App() {
  return (
    <div className='board'>
      <div className='board-row'>
        <Square text={"X"} />
        <Square text={"O"} />
        <Square text={"X"} />
      </div>
      <div className='board-row'>
        <Square text={"X"} />
        <Square text={"O"} />
        <Square text={"X"} />
      </div>
      <div className='board-row'>
        <Square text={"X"} />
        <Square text={"O"} />
        <Square text={"O"} />
      </div>
    </div>
  );
}

export default App;
```

If the code editor is reporting a warning in the `{text}` property of your new component, you can change the eslint rules by adding `'react/prop-types': [0]` in the `eslint.config.js` file in the `rules` object. This rule helps the developers write a better code, but we don't need that for now.

All of the attributes that are in "sent" to the `<Square>` component (inside of the `App` component) are sent to the `Square` function as one parameter of type object. We usually name this parameter `params`, but, we can also use object destructing as we did here. Therefore from the entire params object, we only take the `text `property.

In the function/component body, we can now use the value of this `text` variable. In this line the curly braces are used as string interpolation - as we've seen in Jinja templating engine.

## Make the component interactive

As of now our components can only display static data that we hard-coded in. Any functional front-end application needs to do more than that - it needs to be able to respond to the users' clicks and actions - it needs to be interactive.

We've seen how to add event listeners to the DOM elements in a previous lesson. In React, the syntax is similar: We need to define a function that handles the event and we need to pass that function as the event listener to the HTML tag.

```jsx
import './App.css';

function Square({text}) {
  function handleClick() {
    console.log(`clicked square ${text}`);
  }

  return (
  <button
    className="square"
    onClick={handleClick}
  >
    {text}
  </button>);
}

function App() {
  return (
    <div className='board'>
      <div className='board-row'>
        <Square text='1' />
        <Square text='2' />
        <Square text='3' />
      </div>
      <div className='board-row'>
        <Square text='4' />
        <Square text='5' />
        <Square text='6' />
      </div>
      <div className='board-row'>
        <Square text='7' />
        <Square text='8' />
        <Square text='9' />
      </div>
    </div>
  );
}

export default App;
```

We can test this actions by looking at the console while clicking on the squares on the board.

## Save state in the components

The next thing is saving the state in the component. React re-renders each component that changed because of some user action. It does this by calling the function that defines that component. Since all of the components are just functions that get re-run on every render, we can not simply save the state of the component as a variable in the function. For this (and some other functionalities) React offers us hooks. Hooks are a way to interact with different React features. You can read more about them in the [hooks documentation](https://react.dev/reference/react/hooks).

To save the state in the component, we'll be using the `useState` hook. This is a function that returns an array of two elements. The first is the current value of the state that we want to access - this is a normal variable. The second element is the setter function for this value. Because of change detection, React has to know, which components' state has changed. This function sets the new value and 'alerts' the change detection mechanism that something changed in the component.

The `useState` hook is used by calling it as a function and providing the initial value for that state. We usually destructure the array right as we use this hook, since we'll most often need both read and write access to that state. By convention we name the first element by the value it's storing and we perpend the second element with the 'set' keyword.

For the demonstration of this functionality, we'll be increasing the value of the text in each square on every click.

```jsx
import { useState } from 'react';
import './App.css';

function Square() {
  const [text, setText] = useState(0);

  function handleClick() {
    console.log(`clicked ${text}`);
    setText(text+1);
  }

  return (
  <button
    className="square"
    onClick={handleClick}
  >
    {text}
  </button>);
}

function App() {
  return (
    <div className='board'>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
      <div className='board-row'>
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  );
}

export default App;
```

We can now save the state in the component and are able to update that sate on a user's action. This is useful. Now we have to make sure that the game functions correctly. We need to switch the next player when a move is made, we need to prohibit illegal moves and we have to check if the state of the game is a winning state. To do all of this we need to know the state of the entire board. We could query all of the components of their state, but this kind of code would get complicated and hard to maintain. A better approach is to lift the game state up.

## Move the state to the board

To do this, we'll use the same `useState` hook, we'll just use it in the parent component. The game state will hold the entire state of the board.

The child `Square` components will only display their part of the game state and handle the click events.

```jsx
import { useState } from 'react';
import './App.css';

function Square({text, onSquareClick}) {

  return (
  <button
    className="square"
    onClick={onSquareClick}
  >
    {text}
  </button>);
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(squareId) {
    let newSquares = [...squares];
    newSquares[squareId] = 'X';
    setSquares(newSquares);
  }

  return (
    <div className='board'>
      <div className='board-row'>
        <Square text={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square text={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square text={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square text={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square text={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square text={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square text={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square text={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square text={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default App;
```

Let's go through the code ...

In the `Square` component we now expect two parameters - a `text` which is a normal variable, and a `onSquareClick` which is a function that we later assign as the click handler. 

In the `App` component we now use `useState` hook for the entire board. We set the initial state of the board to array of length 9, with all elements filled with `null` values.

The `handleClick` function is a click handler, that gets assigned as the event listener in the `Square` component. In it we first create a new board state from the old (so we don't mutate the state - we'll learn more about that later), We then set the appropriate field to "X" and save the new state with the `setSquares` setter function.

In the template of this main component, we display all of the squares, pass the appropriate `text` value to them and pass the `handleClick` function with the appropriate `squareId` to it. Note that we use the arrow function here. This is so that we actually pass a function and not the return value of the `handleClick` function that we're calling with the `squareId` parameter.

## Toggle players

To change players on each turn, we'll use another `useState` hook. This one will hold the boolean value as the answer to the question if  X is the next player. We'll use this value in the `handleClick` function where we set the state of the clicked field. We also need to toggle this value which we do with `setXisNext(! xIsNext)` line.

```jsx

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);

  function handleClick(squareId) {
    let newSquares = [...squares];
    newSquares[squareId] = xIsNext ? 'X' : "0";
    setSquares(newSquares);
    setXisNext(!xIsNext);
  }

  return (
  ///...
  );
}
```

The game is now coming well together. We only have some finishing touches. An important thing is to calculate when the board is in a state where one of the player won the game.

## Calculate the winner

The following function does this. There is nothing React specific in this function so for exercise you can try implementing it yourself before looking at the solution. If not, I'd encourage you to at least go through its logic and figure out how it works.

We'll add this function to the main component and call it every time a new move is made.

```jsx
function App() {
// ...
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(squareId) {
      // ...
      let winner = calculateWinner(newSquares);
      if (winner) {
          console.log(winner + ' wins!');
      }
  }
  // ...
}

```

When the winning move is made, we can see that in the console. Let's add a status row that tells us the status of the game in a user-friendly manner.

## Add the status row

Well add a state for `gameStatus`, we'll display that below the main board and we'll update the `gameStatus` in its own function that we call in the click handler.

```jsx

function App() {
  // ...
  const [gameStatus, setGameStatus] = useState('X is next');

  function calculateWinner(squares) {
  // ...
  }

  function updateStatusRow(winner, next) {
    if (winner) {
      setGameStatus('Game over. ' + winner + ' wins!!!');
    } else {
        setGameStatus(next + ' is next.')
    }
  }

  function handleClick(squareId) {
    // ...
    updateStatusRow(winner, !xIsNext ? 'X' : 'O');
    setXisNext(!xIsNext);
  }

  return (
    <>
    <div className='board'>
      <h1>Tic Tac Toe</h1>
      <div className='board-row'>
        <Square text={squares[0]} onSquareClick={() => handleClick(0)} />
      {
      // ...        
      }
        <Square text={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className="status">
        {gameStatus}
      </div>
    </div>
    </>
  );
}

export default App;
```

Now the game looks like it's working well. A keen observer will however notice a bug in our code.

## Prohibit changing the field

We have to add the check that the user can not change the fields and that they can not play after the game has ended. We'll change the click handler to return on these occurrences. 

```jsx

  function handleClick(squareId) {
    if (squares[squareId] || calculateWinner(squares) ) {
      return;
    }
      // ....
  }
```



## Complete code

Below, you can find the entire code of the game.

```jsx
import { useState } from 'react';
import './App.css';

function Square({text, onSquareClick}) {

  return (
  <button
    className="square"
    onClick={onSquareClick}
  >
    {text}
  </button>);
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [gameStatus, setGameStatus] = useState('');

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function updateStatusRow(winner, next) {
    if (winner) {
      setGameStatus('Game over. ' + winner + ' wins!!!');
    } else {
        setGameStatus(next + ' is next.')
    }
  }

  function handleClick(squareId) {
    if (squares[squareId] || calculateWinner(squares) ) {
      return;
    }
    let newSquares = [...squares];
    newSquares[squareId] = xIsNext ? 'X' : "0";
    setSquares(newSquares);
    let winner = calculateWinner(newSquares);
    updateStatusRow(winner, !xIsNext ? 'X' : 'O');
    setXisNext(!xIsNext);
  }

  return (
    <>
    <div className='board'>
      <h1>Tic Tac Toe</h1>
      <div className='board-row'>
        <Square text={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square text={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square text={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square text={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square text={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square text={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square text={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square text={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square text={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className="status">
        {gameStatus}
      </div>
    </div>
    </>
  );
}

export default App;
```

