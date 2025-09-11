# Lesson 18 - Serverless and Firebase

In the previous few lessons we have been learning about the development of the front-end application with the libraries React and Angular. We can achieve a lot of functionalities running on the client's side with this kind of application which provides us with almost instant reactions of the user's actions. However these applications are ephemeral and whenever we want to save something for later, we need to connect to the server. As we've learned in the WD1 and in the first part of this course, we do that through a dedicated back-end that offers APIs to interact with our data. Development of that usually takes a lot of time and effort which is why an alternative approach has been offered - **Serverless**.

## What is Serverless

Serverless technology solves the problem of having to manage and maintain servers when building and running applications. Traditionally, developers have to provision servers, handle scaling, and pay for resources even when they weren’t being used. With serverless, the cloud provider automatically **takes care of infrastructure, scaling, and availability**, so developers can focus only on writing code. This can make applications easier to deploy, cheaper to run (since you pay only when functions execute), and able to handle sudden spikes in traffic without extra setup.

This, however is not a magical approach. Serverless architecture usually can’t handle **long-running processes** or maintain in-memory state between requests. **Cold starts** can cause noticeable delays if a function hasn’t been used recently. Costs may grow unexpectedly at scale, and debugging or monitoring is often harder compared to traditional servers. Finally, developers risk **vendor lock-in**, since serverless apps are usually tied to a specific cloud provider’s tools and services.

### Serverless - a misnomer

The term “serverless” is actually a misnomer, because servers are still very much involved. What “serverless” really means is that **developers don’t have to manage the servers themselves**—the cloud provider takes care of provisioning, scaling, and maintaining them behind the scenes. From the developer’s perspective, it feels like there are no servers to worry about, since all they do is write and deploy code. In reality, the servers are just abstracted away, which is why the name can be misleading.

## Firebase

As an example of serverless stack, we'll use Firebase to serve as our backend.

**Firebase** is a **Backend-as-a-Service (BaaS)** platform by Google that provides ready-made tools for building web and  mobile apps without needing to manage servers. It offers features like  real-time databases (Firestore, Realtime Database), authentication,  cloud storage, hosting, and serverless functions (Cloud Functions for  Firebase). Instead of just giving you raw infrastructure like AWS Lambda or Azure Functions, Firebase bundles backend services into an  integrated ecosystem so developers can build and deploy apps quickly.

To learn about Firebase, we'll use our React project - Tic-tac-toe and give the game a backend so that the players can play with each other online.

### Project setup

To set up a new project, navigate to https://firebase.google.com/. There you'll have to sign in with your Google account and then navigate to the **Firebase Console**. There you'll click "Create a new project" and follow the steps in the wizard. For this project we won't be using any advanced AI functionalities or the analytics, but you can explore this on your own later.

After the end of the wizard, the Firebase project is gonna get generated. This might take a minute or two. Once this is done, you'll be redirected to the project overview panel.

Firebase can offer the backend for different kinds of applications; iOS/Android mobile apps, Flutter or Unity apps or - the one applicable for us - web apps. Each of this options offers a developer's kit for your chosen front end. A project can have multiple apps on the same platform such as a web app for general users and a separate web app for admins only. Let's add a web app for our game.

Again, we follow the simple wizard - name the app and choose to set up hosting. The second step offers us instructions to add the Firebase SDK (software development kit) to our project. Let's do that in our project.

```bash
npm install firebase
```

After that we'll add the Firebase configuration object to our project. This object is usually added to a separate configuration file, but since our project is so small, we'll include it in the main component's code:

*src/App.tsx*

```tsx
import { useState } from 'react'
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAo....................",
  authDomain: "test123-....................",
  databaseURL: "https://....................",
  projectId: "test123-....................",
  storageBucket: "test123-....................",
  messagingSenderId: "79161720....................",
  appId: "1:791617...................."
};

function Square({ value, clickHandler }) {
// ...
}

function App() {
      // ...
}
```

To be able to connect to Firebase, we need to initialize the app. This is how the Firebase's SDK is designed and how we use it. We can get more information about the SDK in its [documentation](https://firebase.google.com/docs/reference/js/app.firebaseapp).

In this project, we'll be using Firbase for it's database. Firebase offers many other options such as authentication, analytics, messaging and more, but we'll limit our goals to it's database. Additionally, Firebase offers two flavours of databases; Cloud Firestore and Realtime Database. The first one is aimed towards at the enterprise grade while the second is an older solution aimed at simple projects. For us, the later will suffice so we'll use that.

In the Firebase control panel, navigate to Realtime Database and create a new database. Use *europe-west1* as the preferred region. Use the "Start in testing mode" for the security rules. Click Enable to set up the Realtime database.

### Writing to the db

Back in the code, after initializing the app, we create a database object, through which we'll be accessing the database. We do that with 

```tsx
const db = getDatabase(app);
```

Additionally, we'll create a helper function that will hide some of the complexities of writing into the db. For now we'll keep it as simple as possible:

```tsx
function writeData(state) {
  set(ref(db, 'game/lates'), state)
}
```

With this, we're writing the state of our game to the `game/latest/` path of our database. The state is being overridden every time we write new data. Let's use this function in the mechanics of our game:

```tsx
  function handleClick(id) {
    // ...
    setGameState(newGameState);
    writeData(newGameState);

    const winner = calculateWinner(newGameState);
	// ...
  }

```

Of course we need to import the functions that we're using from the Firebases' SDK:

```tsx
import { getDatabase, set, ref, } from 'firebase/database';
```

also, since we're using the database in Europe, we need to add the `databaseURL` parameter to our `firebaseConfig`. We can find the correct URL in the Realtime Database dashboard in Firebase.

```tsx
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  databaseURL: "https://--database-url-.europe-west1.firebasedatabase.app",
  messagingSenderId: "...",
  appId: "...",
};
```

The entire `App.tsx` now looks like this:

```jsx
import { useEffect, useState } from 'react'
import './App.css';
import { getDatabase, set, ref, } from 'firebase/database';

// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAo....................",
  authDomain: "test123-....................",
  databaseURL: "https://....................",
  projectId: "test123-....................",
  storageBucket: "test123-....................",
  databaseURL: "https://--database-url-.europe-west1.firebasedatabase.app",
  messagingSenderId: "79161720....................",
  appId: "1:791617...................."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function writeData(state) {
  set(ref(db, 'game/latest'), state)
}

function Square({ value, clickHandler }) {

  return (
    <button
      className="square"
      onClick={clickHandler}
    >
      {value}
    </button>
  )
}

function App() {

  const [gameState, setGameState] = useState(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(true);
  const [statusRow, setStatusRow] = useState('X is next');
  const [isGameFinished, setIsGameFinished] = useState(false);

  function handleClick(id) {
    if (gameState[id] || isGameFinished) {
      console.warn('This move is not allowed!');
      return;
    }
    let newGameState = [...gameState];
    newGameState[id] = xIsNext ? 'X' : 'O';
    setStatusRow(!xIsNext ? 'X is next' : 'O is next');
    setXIsNext(!xIsNext);

    setGameState(newGameState);
    writeData(newGameState);

    const winner = calculateWinner(newGameState);
    if(winner!== null){
      setStatusRow(winner + ' won the game!');
      setIsGameFinished(true);
    }
  }

  function calculateWinner(gameState) {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        // winner found
        return gameState[a]
      }
    }
    if (gameState.indexOf('') === -1) {
      return 'No one'
    }
    return null;
  }

  // jsx
  return (
    <>
    <p>{statusRow}</p>
      <div className="board-row">
        <Square value={gameState[0]} clickHandler={() => handleClick(0)} />
        <Square value={gameState[1]} clickHandler={() => handleClick(1)} />
        <Square value={gameState[2]} clickHandler={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={gameState[3]} clickHandler={() => handleClick(3)} />
        <Square value={gameState[4]} clickHandler={() => handleClick(4)} />
        <Square value={gameState[5]} clickHandler={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={gameState[6]} clickHandler={() => handleClick(6)} />
        <Square value={gameState[7]} clickHandler={() => handleClick(7)} />
        <Square value={gameState[8]} clickHandler={() => handleClick(8)} />
      </div>
    </>
  );
}

export default App;

```

At this point we can test the app. Looking at the Realtime Database dashboard while we play, we can see that the state of the database updates every time that we make a move in the game. All of or local data is synced to the database. I don't know about you, but to me, that's pretty cool.

Of course, to have an actual working app, where another player can see the same game from another browser, we need to be able to also read the state of the game into our local application.

### Reading from the db

To do this, we'll use use React's `useEffect()` hook and Firebase's `onValue()` function. The `useEffect` is used to execute a function when a value in a React component's variable changes or - like in our case - when the component is initialized. The `onValue()` is a Firebase function, part of it's SDK, that triggers a callback whenever a value in the dabatase (that is on the BE/server) changes. In this callback we define the behavior that we need.

The code that we add looks like this:

```tsx
function App() {
// ...

  useEffect(() => {
    onValue(ref(db, 'game/latest'), snapshot => {
      const data =  snapshot.val();
      setGameState(data);
    })
  }, []);
 
    // ...
}
```

In the callback we simply extract the value from the database (send as a snapshot variable) and set it as our internal game state.

We should not forget to import the requirements:

```tsx
import { useState, useEffect } from 'react'
import { getDatabase, set, ref, onValue } from "firebase/database";
```

We can now test the game in two browsers. We see that after a player makes a move in one browser, the second browser's game state also updates. Quick testing however reviles some obvious bugs. After the game is finished, there is no way to start it again. Also reloading the page the game does not check who is the next player and if the game is already finished. Let's fix those.

#### Restart game

To restart game, we'll add an action on the "Game over" screen. First, we'll create a button that show only when the game is finished. We do this in the 'template' part of `App.jsx`.

```jsx
function App() {
  // ...
    
  // jsx
  return (
    <>
    <p>{statusRow}</p>
    {isGameFinished ? <button onClick={restartGame}>Restart game</button> : ''}
      <div className="board-row">
        // ...
    )
}
    
```

Then we write the function that restarts the game

```jsx
function restartGame () {
    const emptyBoard = Array(9).fill('');
    setGameState(emptyBoard);
    setIsGameFinished(false);
    setXIsNext(true);
    setStatusRow('X is next');
    writeData(emptyBoard);
  }
```

#### Check the game state on reload

To make sure that the game status sets to the correct value when we refresh the page, we have to rewrite the `handleClick()` function. We'll create a new function that calculates who's turn it is from the game state and update the status row accordingly.

```tsx
  function nextMove(gameState) {
    const winner = calculateWinner(gameState);
    if(winner!== null){
      setStatusRow(winner + ' won the game!');
      setIsGameFinished(true);
      return;
    }
    const isEvenTurn = gameState.filter(s => s !== '').length % 2 == 0;
    setXIsNext(isEvenTurn);
    setStatusRow(isEvenTurn ? 'X is next' : 'O is next');
  }
```

We need to call this function in whenever we get the update from the Firebase, but we can also remove a lot of logic from the `handleClick()` function.

```tsx
  useEffect(() => {
    onValue(ref(db, 'game/latest'), snapshot => {
      const data =  snapshot.val();
      setGameState(data);
      if(data.indexOf('X') == -1) {
        setIsGameFinished(false);
      }
      nextMove(data);
    })
  }, []);

  function handleClick(id) {
    if (gameState[id] || isGameFinished) {
      console.warn('This move is not allowed!');
      return;
    }
    let newGameState = [...gameState];
    newGameState[id] = xIsNext ? 'X' : 'O';

    setGameState(newGameState);
    writeData(newGameState);

    nextMove(newGameState);
  }
```

## Deployment

Additionally to a Realtime database, Firebase offers many other services. One of the useful ones for us is hosting. We can deploy simply from the commandline in our development enviroment.

First we have to install the Firebase tools:

 ```bash
 npm install -g firebase-tools
 ```

After installing the firebase tools, we can login into firebase from our command line:

```bash
firebase login
```

When we run this command we'll be redirected to the browser, where we have to confirm the login with our account. 

To prepare our project to be able to deploy to Firebase, we have to initialize it. Run `firebase init` at the root of your project. The dialog appears. Select  "◯ Hosting". In the next step select "Use the existing project", and than select the Firebase project that we've created at the start of this lesson. Since we're working with **Vite**, our public directory (for the compiled application) is the `dist/`. Enter this when asked. The React app is a single-page application so in the next step we confirm. And for now we don't need the automatic builds from github. After that the initialization should be complete.

To build our application for production we will run a Vite command `npm run build` . This generates the minified code in the `dist/` directory. 

The last step for deployment is to issue a simple command to firebase cli:

```bash
firebase deploy
```

This setup publishes our application to the Firebase hosting and the command line prints out the URL of our live application. You can try it online as soon as it's published.

## Next steps

Of course our application is not yet polished enough for us to be able to brag with it. For one, from a game point-of-view, any user that knows the domain of our game can barge into the game. Also all players on the site can play as both X and O player. Thinking about security, our application allows anyone online to write to our BE database without any authentication, logging on any security measures. This kind of openness is strongly discouraged, but since we're limited with time and this is just a proof of concept, we'll go with it.

## Homework

For the exercise at home, implement the logic that protects the players from switching sides and playing for both X and O. In the real world this would be usually approached through authentication, and you can look into how to implement that. However, it is also possible to make a "hack" and achieve this without the need to authenticate each user.

```jsx
import { useEffect, useState } from 'react'
import './App.css';
import { getDatabase, set, ref, } from 'firebase/database';

// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAo....................",
  authDomain: "test123-....................",
  databaseURL: "https://....................",
  projectId: "test123-....................",
  storageBucket: "test123-....................",
  messagingSenderId: "79161720....................",
  appId: "1:791617...................."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function writeData(id, state) {
  set(ref(db, 'game/lates'), state)
}


function Square({ value, clickHandler }) {

  return (
    <button
      className="square"
      onClick={clickHandler}
    >
      {value}
    </button>
  )
}

function App() {

  const [gameState, setGameState] = useState(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(true);
  const [statusRow, setStatusRow] = useState('X is next');
  const [isGameFinished, setIsGameFinished] = useState(false);

  useEffect(() => {
    onValue(ref(db, 'game/lates'), snapshot => {
      const data =  snapshot.val();
      setGameState(data);
    })
  }, []);


  function handleClick(id) {
    if (gameState[id] || isGameFinished) {
      console.warn('This move is not allowed!');
      return;
    }
    let newGameState = [...gameState];
    newGameState[id] = xIsNext ? 'X' : 'O';
    setStatusRow(!xIsNext ? 'X is next' : 'O is next');
    setXIsNext(!xIsNext);


    setGameState(newGameState);
    writeData(id, newGameState);

    const winner = calculateWinner(newGameState);
    if(winner!== null){
      setStatusRow(winner + ' won the game!');
      setIsGameFinished(true);
    }

  }

  function calculateWinner(gameState) {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        // winner found
        return gameState[a]
      }
    }
    if (gameState.indexOf('') === -1) {
      return 'No one'
    }
    return null;
  }

  // jsx
  return (
    <>
    <p>{statusRow}</p>
      <div className="board-row">
        <Square value={gameState[0]} clickHandler={() => handleClick(0)} />
        <Square value={gameState[1]} clickHandler={() => handleClick(1)} />
        <Square value={gameState[2]} clickHandler={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={gameState[3]} clickHandler={() => handleClick(3)} />
        <Square value={gameState[4]} clickHandler={() => handleClick(4)} />
        <Square value={gameState[5]} clickHandler={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={gameState[6]} clickHandler={() => handleClick(6)} />
        <Square value={gameState[7]} clickHandler={() => handleClick(7)} />
        <Square value={gameState[8]} clickHandler={() => handleClick(8)} />
      </div>
    </>
  );
}

export default App;

```

