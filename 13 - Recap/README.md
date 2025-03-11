# Lesson 13 - Recap

This lesson is intended to solve the student's questions and issues with their coding projects. All kinds of software development questions are welcome and appreciated.

If there are no other questions, there here are some suggestions for this lesson:

## Recap - what have we learned

The instructor can go through the previous lesson's titles and ask a question on some of them to refreash the memory

- JavaScript
  - JavaScript basics - Variables
    - Variable Naming Rules
    - Case Sensitivity and Meaningful Names
    - Primitive types of variables: String, Number, Boolean, Undefined, Null, Symbol, BigInt
    - Reference types of variables: Object, Array, Function, Build-in objects
  - Conditionals: If (Terinary operator, Strict vs loose comparison), Switch
  - Loops: While, For loop, For ... in loop, For ... of loop, Break and continue

- JavaScript advanced 
  - Classes
  - Modules
  - Arrow functions
  - Callbacks
  - Destructuring
  - Spread Operator

- JavaScript and the DOM
  - DOM - Documented Object Model
  - Selecting Elements
  - Traversing the DOM
  - Modifying Elements
  - Creating and Removing Elements
  - Handling Events

- JavaScript pitfalls and gotchas
  - Type conversion
  - Comparison
  - Implicit semicolons
  - typeof null == 'object'
  - Object mutation
  - Wrong use of this

- JavaScript packages and package managers
  - npm
  - CLI use
  - Npm and web development
  - Bundlers - Vite

- TypeScript
  - What Problems Does TypeScript Solve?
  - How is TypeScript Used?
  - Installing TypeScript Globally
  - Initializing a TypeScript Project
  - Writing TypeScript Code
  - Compiling TypeScript to JavaScript
  - Running the Compiled JavaScript Code
  - TS types (Primitive types, Special Types, Complex Types (Reference Types), Custom types, Funcions, Generics)

## Poll - hard parts

What was the most confusing part of the previous section? Create a poll by posting the following command in Slack:

```
/poll "Hardest lecture in the last section?" "JavaScript basics" "JavaScript advanced " "JavaScript and the DOM" "JavaScript pitfalls and gotchas" "JavaScript packages and package managers" "TypeScript" 
```

## Quiz


1. Which of the following is NOT a feature introduced in ES6 (ECMAScript 2015)?
a) Arrow functions
b) Classes
c) Type annotations
d) Template literals

2. What will the following code output?
```javascript
let a = 3;
let b = a;
a = 5;
console.log(b);
```
a) 3
b) 5
c) Undefined
d) Error

3. What is the primary purpose of the requestAnimationFrame method in JavaScript?
a) To delay execution of a function
b) To update the DOM during the next repaint for smoother animations
c) To trigger an event listener
d) To execute a function in a different thread

4. What is the result of the following expression? `[1] == true`
a) true
b) false
c) undefined
d) Error

5. What does the splice() method do in JavaScript?
a) Adds elements to the end of an array
b) Removes elements from an array
c) Adds elements to the beginning of an array
d) Returns a shallow copy of the array

6. Which of the following JavaScript methods is used for asynchronously handling operations?
a) setInterval()
b) setTimeout()
c) Promise()
d) forEach()

7. In TypeScript, which keyword is used to define an optional property in an interface?
a) required
b) optional
c) ?
d) nullable

8. What is the output of the following code snippet? `console.log([1] == true);`
    a) true
    b) false
    c) undefined
    d) Error

9. Which of the following is a best practice for handling memory leaks in JavaScript?
    a) Using var instead of let
    b) Closing event listeners after they're no longer needed
    c) Using synchronous code for all operations
    d) Avoiding the use of JavaScript libraries

10. Which of the following is NOT a front-end JavaScript framework?
    a) Angular
    b) React
    c) Vue
    d) Django

11. What does the npm audit command do?
    a) Installs missing dependencies
    b) Shows the status of the package manager
    c) Lists outdated dependencies
    d) Identifies known vulnerabilities in dependencies

12. What is the main difference between localStorage and sessionStorage?
    a) localStorage persists data only during the session, while sessionStorage stores data indefinitely.
    b) sessionStorage persists data only during the session, while localStorage stores data indefinitely.
    c) localStorage can store larger amounts of data than sessionStorage.
    d) sessionStorage can be accessed across different tabs, but localStorage cannot.

13. When should you use `let` instead of `const` in JavaScript?
    a) When you need to declare a variable that will be reassigned
    b) When you declare a variable that should not be reassigned
    c) When you need to define an object
    d) When the value should always be null

14. In JavaScript, which of the following causes the callback to execute after a specified delay?
    a) setInterval()
    b) Promise
    c) requestAnimationFrame()
    d) setTimeout()

15. Which of the following is a correct statement regarding event delegation?
    a) Event delegation involves attaching event listeners to individual elements in a list.
    b) Event delegation involves attaching event listeners to a common parent element for child elements.
    c) Event delegation is only necessary for handling mouse events.
    d) Event delegation is used to create new events programmatically.




### Answer Key

c) Type annotations
a) 3
b) To update the DOM during the next repaint for smoother animations
a) true
b) Removes elements from an array
c) Promise()
c) ?
a) true
b) Closing event listeners after they're no longer needed
d) Django
d) Identifies known vulnerabilities in dependencies
b) sessionStorage persists data only during the session, while localStorage stores data indefinitely.
a) When you need to declare a variable that will be reassigned
d) setTimeout()
b) Event delegation involves attaching event listeners to a common parent element for child elements.
