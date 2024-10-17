# Lesson 07 - JavaScript basics



## About JavaScript

JavaScript was developed in **1995** by Brendan Eich at Netscape, and remarkably, it was **created in just 10 days**. Initially, it was given the working name "Mocha," which was quickly changed to "LiveScript." However, for **marketing reasons, it was soon renamed to "JavaScript"**, a decision that created confusion, as JavaScript has no direct relation to the Java programming language. The name was a strategic move to capitalize on the popularity of Java at the time.

JavaScript was designed with simplicity in mind, making it easy to learn and use, even for beginners. Its primary goal was to be a lightweight, dynamic language that could enhance web pages and allow for interactive content. Originally, JavaScript was **intended to run solely within web browsers**, where different engines like SpiderMonkey (Firefox), V8 (Chrome), and WebKit/JavaScriptCore (Safari) executed the language.`

**In 2009**, a significant development occurred when Ryan Dahl took Chrome’s V8 engine and **created Node.js**, a standalone runtime environment that allowed JavaScript to be executed outside of browsers. This innovation opened up new possibilities for JavaScript, enabling it to be used for server-side development and other applications.

JavaScript is based on the ECMAScript specification, which provides the standardized guidelines for how the language should work. ECMAScript serves as the blueprint, while JavaScript is the most well-known implementation of that standard.



## Try JavaScript in browser

In a browser open developer console by right-clicking on the web page, selecting *Inspect* and then selecting *Console* tab. There you can execute any valid JavaScript. Try some statements

```javascript
console.log('Hello world');
```

```javascript
console.log(16 + 26);
```

```javascript
console.log(7 * 6);
```

```javascript
console.log(126 / 3);
```

```javascript
console.warn("Don't panic");
```

Note that we're using double quotes (`"`) here. Why is that, what is the difference to single quotes (`'`)?

```javascript
console.error('Something went wrong');
```

```javascript
confirm('Do you like JavaScript');
```

```javascript
alert('Aaaaaaaa! Panic!');
```

All statements in JavaScript should end with a semicolon (`;`). However since JS was designed to be forgiving, it's engine tries to infer where the semicolon should be if we forget to put it in. In some edge cases this can lead to bugs or errors.



Even though we'll be running our JS in the browser, we'll install Node.js engine to be able to run it as a stand-alone engine. This will enable us to use a wide array of tools, libraries and frameworks that help us build more complex and better front-end applications.

## Node.js setup

**Install Node.js** by downloading it from https://nodejs.org/en. Follow the instructions for your operating system.

If you don't have it yet, **install VS Code**, a popular code editor, from [code.visualstudio.com](https://code.visualstudio.com/).

In a folder where you want to work, create a new file called **`index.html`**. Open it in VS Code.

Inside the file, type `!` and press **Enter**. This will automatically generate a basic HTML structure using the **Emmet** shortcut.

In VS Code, install the **Live Server** extension (from the Extensions tab). This will allow you to preview your website in real time.

Add a **`<script>`** tag at the end of the `<body>` section in your HTML file. Write some simple JavaScript, like:

```html
<script>
  console.log("Hello, world!");
</script>
```

### Move Javascript to seperate file

- create `main.js`
- change `<script>` tag, add `src='main.js'`
- test it it's working in the browser
- test the same file in node

## JavaScript basics

### Variables

In JavaScript, variables are used to store and manipulate data. There are three main ways to declare a variable:

- **`var`**: The original way to declare a variable. Variables declared with `var` can be reassigned and have function-level scope.
- **`let`**: Introduced in ES6, `let` is similar to `var` but has block-level scope, meaning it is limited to the block in which it is defined (such as inside loops or conditionals).
- **`const`**: Used to declare a constant variable, meaning it cannot be reassigned once initialized. Like `let`, it also has block-level scope.

#### Variable Naming Rules

When naming variables, there are some important rules and best practices to follow:

- **Reserved words**: Variable names cannot be reserved words like `if`, `for`, `let`, or `function`, as they are used by JavaScript for specific functions.
- **No starting with numbers**: Variable names cannot start with a number. For example, `2cats` is not valid, but `cats2` is.
- **No spaces or hyphens**: Variable names cannot contain spaces or hyphens (`-`). Instead of using spaces, JavaScript developers commonly use *camelCase*, where the first word is lowercase and subsequent words are capitalized. Example: `myFavoriteColor`.

#### Case Sensitivity and Meaningful Names

- JavaScript variables are **case-sensitive**, so `myVar` and `myvar` would be two different variables.
- It's a good practice to use **meaningful names** that describe the data stored in the variable. For example, instead of using `x`, use `userAge` or `productPrice` to make your code more readable.

#### JavaScript is Dynamically Typed

JavaScript is a **dynamically typed** language, which means the type of a variable is determined at runtime and can change. You don't need to specify whether a variable is a number, string, or other type when declaring it, and the type can change as needed.

```javascript
let age = 25; // age is a number
age = "twenty-five"; // now age is a string
```

You can check the type of a variable using the **`typeof`** operator:

```javascript
let name = "Alice";
console.log(typeof name); // Output: "string"

let count = 10;
console.log(typeof count); // Output: "number"
```

#### Primitive types of variables

Primitive types are the simplest kinds of data. There are 7 primitive data types in JavaScript:

##### String

Used to represent text. Strings are enclosed in quotes—either single (') or double (").

```javascript
let name = "Alice";
let greeting = 'Hello';
```

##### Number

Represents both integers and floating-point numbers (decimals). JavaScript doesn’t differentiate between the two.

```javascript
let age = 25;
let price = 19.99;
```

##### Boolean

Represents logical values: **true** or **false**. Note that compared to Python these values are not capitalized 

```javascript
let isStudent = true;
let isEmpty = false;
```

##### Undefined

A variable that has been declared but not yet assigned a value is automatically given the value undefined.

```javascript
let myVariable; // undefined
```

##### Null

Represents an intentional absence of any value. It is explicitly set to null by the developer.

```javascript
let result = null;
```

##### Symbol

A unique and immutable data type introduced in ES6, primarily used for object property keys to avoid name collisions. This type is not used very often, more so when learning JS.

```javascript
let uniqueID = Symbol("id");
```

##### BigInt

A newer type used to represent integers larger than `Number.MAX_SAFE_INTEGER (2^53 - 1)`. Declared by appending n to the number.

```javascript
let largeNumber = 123456789012345678901234567890n;
```



#### Reference types of variables

Non-primitive types refer to objects that can store multiple values or complex data structures. These include:

##### Object

An object is a collection of key-value pairs, where the values can be of any type.

```javascript
let person = {
  name: "Alice",
  age: 25,
  isStudent: true
};
```

###### Accessing object properties

There are two different ways for accessing object properties: see differences below:

**Dot notation**
Example:

```javascript
console.log(person.name)
```

This way is preferable and you should use it in most cases. It is faster to write, cleaner and more concise.

**Bracket notation**

```javascript
console.log(person['name'])
```

There are some benefits for using this way, but are edge-cases and should be avoided if possible.

With this method you can access dynamic properties. See example below:

```javascript
let person = {
	name: 'Janez',
	age: 42,
};
let property = 'name';
cosole.log(person[prperty])
```

With this method you can also access properties with non-ASCII or  prohibited characters.
````javascript
person['👪']
person['name[]']
````

In reality you should never do that. If you do choose to ignore this advice, don't be surprised if your coworkers gang-up and tar and feather you.

##### Array

An array is an ordered list of values, which can be of any type. Arrays are a special kind of object. They are analogues to lists in Python

```javascript
let towns = ['Reka', 'Postojna', 'Ljubljana']

console.log(towns);
console.log(towns[2]);

// js is dynamic language, type of a variable or array element can be changed
towns[3] = null;
towns[] = 'Maribor';

console.log(towns);
typeof towns;
console.log(towns.length)
```
##### Function

As in Python, functions contain some logic, they can have parameters with or without a default value, they can return a value or have side-effects.

```javascript
// function defenition of a funct with parameter
function say_hello(name = 'World') {
	console.log('Hello ' + name + '!')
}
// function call with an argumet
say_hello('Janez')
```

In JavaScript, functions are also objects and can be assigned to variables.

```javascript
calculate_range = function (consumption_l_per_100_km, gasVolume_l) {
    return gasVolume_l / consumption_l_per_100_km * 100
}
```

##### Build-in objects

`Date`, `RegExp`, `Math`, `Map`, `Set` are some of the built-in JavaScript objects. There are other built-in objects that fall under reference types, used for handling specific data or behaviors.

### Conditionals

#### If

```javascript
const MIN_AGE = 18;
let age = prompt('What\' your age again?', '99') * 1;
if (age >= MIN_AGE) {
	console.log("Sex, drugs and rock'n'roll!!!");
} else {
	console.log("Rock'n'Roll only!?");
}
```

##### Terinary operator

```javascript
agree = confirm('Do you consent with bad humor');
agree ? console.log('Q: Why is 6 afraid of 7? A: Because 7 eight 9') : console.log('No joke for you!')
```

##### Strict vs loose comparison

In JavaScript, `==` and `===` are both used for comparison, but they differ in how they check equality. The `==` operator compares two values for equality **after performing type conversion** if necessary. The `===` operator compares both the **value** and the **type** of the variables.

```javascript
console.log(5 == "5"); // true, because "5" (string) is converted to 5 (number)
console.log(true == 1); // true, because true is converted to 1

console.log(5 === "5"); // false, because one is a number and the other is a string
console.log(true === 1); // false, because true is a boolean and 1 is a number
```

In most cases, it's better to use **`===`** for comparisons to avoid unintended type conversions and make your code more reliable.

#### Switch

A **`switch`** statement in JavaScript evaluates an expression and compares its result against multiple possible cases,  executing the matching case's block of code. If no cases match, an  optional **`default`** block can be executed.

```javascript
switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Workonday";
    break;
  case 2:
     day = "Workesday";
    break;
  case 3:
    day = "Workednesday";
    break;
  case 4:
    day = "Workrsday";
    break;
  case 5:
    day = "Friday woooohooo!";
    break;
  case 6:
    day = "Saturday";
}
```

In Python this would usually be implemented with `if` - `elif` - `else` blocks.

**Common code blocks and default**

```javascript
switch (new Date().getDay()) {
  case 4:
  case 5:
    text = "Just a bit more ...";
    break;
  case 0:
  case 6:
    text = "Wooho, weekend";
    break;
  default:
    text = "Urrrggghhhhhh!";
}
```

Switch uses strict comparison (`===`).

### Loops

#### While

The `while` loop is the simplest of loops. It repeats a block of code as long as the specified condition is `true`. It checks the condition before executing the block.

```javascript
let i = 99;
while (i > 0) {
  console.log(i + ' bottles of beer on the wall ' + i + ' bottles of beer, ...');
  i--;
}
```

In modern JavaScript a while loop is not often used.

#### For loop

The `for` loop is used when you know how many times you want to loop through a block of code. It consists of three parts:  initialization, condition, and increment.

```javascript
let hills = ['Boč', 'Nanos', 'Krim', 'Plešivec', 'Krvavec', 'Kum']

for (let i = 0; i < hills.length; i++) {
  text += cars[i] + "<br>";
} 
```

#### For ... in loop

The `for...in` loop iterates over the properties of an object. It is used primarily to loop through an object's **keys**.

```javascript
let person = { name: 'Janez', born: 1958, gender: 'male', happy: false };

for (let key in person) {
  console.log(key + ": " + person[key]);
}
```

#### For ... of loop

The `for...of` loop is used to iterate over **iterable objects**, like arrays or strings, and returns the values of the iterable.

```javascript
let numbers = [1.414, 2.718, 3.141, 4.359];

for (let num of numbers) {
  console.log(num);
}
```

#### Break and continue

You can stop any of the loops mentioned above wit a keyword `break`. The program will continue after the loop's closing brace. You can skip one iteration with the `continue` keyword.

## Homework

### Rock-paper-scissors game

Create a simple rock, paper, scissors game where the user plays against the computer. The code should be run in the browser, using `prompt()`, `confirm()` and `alert()` functions. The results can be written to the console.

### Hangman game

Write a simple word guessing game similar to Hangman, where the user guesses letters to reveal a hidden word. Again, make the game run in the browser using the same functions for user input.
