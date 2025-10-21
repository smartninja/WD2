# Lesson 08 - JavaScript advanced topics

In this lesson we'll look at some of the more advanced JavaScript functionality. We'll do that by building the logic for a to-do application.

We'll be writing our code in a setup similar that we had in the previous lesson, a HTML document that we can view with a VS Code's live server. However we can also run the code with node.js by executing `node main.js` in our console.

## Classes

First we'll create a JS class that represents a single to-do object.

Create **main.js** write the following code:

```javascript
class Task {
    constructor(description, isCompleted = false) {
      this.description = description;
      this.isCompleted = isCompleted;
    }
  
    toggleCompletion() {
      this.isCompleted = !this.isCompleted;
    }
  }

let todo = new Task('Wash the trash');

console.log(todo);
```

The `class` keyword was introduced to JavaScript relatively lately, in ES6 (2015). Compared to Python we define the logic of the object creation in the `constructor` method as opposed to the `__init__` magic method in Python. Also note that the methods in JS aren't defined with a specific keyword like `function` for functions or `def` in Python classes. The `this` keyword is analogous to `self` in Python though there are some differences.

## Modules

Another functionality that came to JavaScript later and that Python had from the beginning are Modules. In the early days the JS code could not have been split into different independent libraries. All of code shared the global scope and was therefore very difficult to maintain for sizable applications. The code could have been split into different files and imported with different `<scirpt>` tags, but this did not provide any encapsulation.

In 2009 the JS community was growing rapidly because of the popularity of **Node.js**. The growing use of JS demanded the code to be organized into modules that are separate to each other. The solution was the `require()` function and the **CommonJS Module Syntax** through which you could import a certain function from another file. This enabled JS packages that have later been hosted and managed by NPM.
This solution was, however, not perfect. It was not part of the ECMAScript standard and was therefore not implemented across all of the platforms. Most notably **browsers did not support** this kind of code splitting. The feature was also synchronous, which in not good for the browser environment.

In 2015 ES6 was released and it has brought the new syntax that supported modules out-of-the-box. The syntax was made clear and simple, and it supported asynchronous loading by default. Here is the basic syntax of the ES6 module:

In **my_module.js** we define the functionality

```javascript
export function myFunction() {
    console.log("Hello, ES6 Modules!");
}
```

And in **main.js** we can import and use it

```javascript
import { myFunction } from './my_module.js';

myFunction(); // Hello, ES6 Modules!
```



If you're running your code in **node.js**, you have to configure it to use ES6 modules. In **package.json** file add the following parameter: `"type": "module"`. If this file does not yet exist, you can create it with `npm init`.

If you're referencing your **main.js** from HTML, make sure you add the html attribute `"type"="module"` in the `<script>` tag:

```html
<script src="main.js" type="module"></script>
```

**Todo app**

Move the Task class to a seperate module and call it from **main.js**. In this file create the logic for holding multiple todos:

```javascript
import Todo from "./todo.js";

class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo(description) {
        const todo = new Todo(description);
        this.todos.push(todo);
    }

    removeTodo(index) {
        this.todos.splice(index, 1);
    }

    getAllTodos() {
        return [...this.todos];
    }
}
```

## Arrow functions

Functions in JavaScript are "first-class citizens" which means that  they can be assigned to a variable, passed as an argument to another function,  returned from a function, and has properties and methods assigned to it. In ES6 a new version of defining function was added. This is called Arrow function.

```javascript
const sum = (a, b) => a + b;

const getFistElement = (arr) => {
    const first = arr[0];
    if(first === undefined) {
        return null;
    }
    return first;
}
```

Note that when arrow function is defined in a single line, there's no need for curly brackets, the result of the expression is automatically returned. However, if the function is multi-line, braces are required and so is the `return` keyword.

## Callbacks

A **callback** in JavaScript is a **function that is passed as an argument** to another function and is **executed after some operation is completed**. Callbacks are an important aspect of JavaScript, especially in  asynchronous programming, where operations like I/O (input/output),  fetching data, or timers are often non-blocking. This allows the  JavaScript engine to continue executing other code while waiting for these operations to complete.

The `setTimeout` function is an example of a function that takes a callback function as a parameter. After the set time runs out, the callback function gets called. See the example below:

```javascript
function makeBoom(){
    console.warn('BOOOOM!!!!');
}

setTimeout(makeBoom, 60); // calls the makeBoom() function with the 60s delay
```

The callbacks are also often used in event-driven programming where we don't know when the event will happen - it's asynchronous - but we do know what we want to do in that case. 

### Callback hell

Often a result of one asynchronous call is required to run another call. For example first we want to fetch the data of the user, then we want to get all of their posts and from that we want all of the comments. This would look something like this:

```javascript
getUserData(function (userData){
    getBlogPosts(userData.id, function (blogPosts){
        getComments(blogPosts, function logComments(comments){
            consonsole.log(comments);
        });
    });
});
```

This is called **callback hell** since it is very difficult to read and maintain this kind of code. One way to avoid this is using **Promises** which are a better way of structuring async code. An even better way is a new `async/await` code. The above code could look something like the following when rewritten with `async/await`

```javascript
async function logComments() {
    const userData = await getUserData();
    const blogPosts = await getBlogPosts(userData);
    const comments = await getComments(blogPosts);
    
    console.log(comments);
}
```

When calling an `async` function we have to use the `await` keyword and each function that has a call to an asynchronous function is itself also `async`ronous.

Asynchronous programming with callbacks, promises and async/await is important part of JavaScript, however it can get quite complex so we'll leave it at this. However if you're serious about programming in JavaScript, I encourage you to delve deeper into this. A good place to start is MDN's [Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS).

**Todo app**

Let's use this knowledge to further our Todo Application. Simulate adding todo as if we were sending it to the server.

```javascript
addTodo(description, callback) {
    setTimeout(() => {
        const todo = new Todo(description);
        this.todos.push(todo);
        // call callback when finished
        callback()
    }, 1000);
}
```

Let's check two more operators that are often found in modern JavaScript.

## Destructuring

Destructuring is a feature in JavaScript that allows you to **unpack values from arrays or properties from objects** into distinct variables. It makes extracting data from complex structures easier and more readable.

Example with Arrays

```javascript
const colors = ['red', 'green', 'blue'];
const [firstColor, secondColor] = colors;
console.log(firstColor); // Output: "red"
console.log(secondColor); // Output: "green"
```

Example with Objects

```javascript
const person = { name: 'Alice', age: 25 };
const { name, age } = person;
console.log(name); // Output: "Alice"
console.log(age); // Output: 25
```

## Spread Operator

The spread operator (`...`) expands or "spreads" elements from an array or object. It’s useful for  copying arrays or objects, passing elements as arguments, or combining  arrays and objects.

Example with Arrays:

```javascript
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5];
console.log(moreNumbers); // Output: [1, 2, 3, 4, 5]
```

Example with Objects:

```javascript
const person = { name: 'Alice', age: 25 };
const updatedPerson = { ...person, age: 26 };
console.log(updatedPerson); // Output: { name: 'Alice', age: 26 }
```



## Conclusion

In this lesson we have touched on some important JavaScript features.

- **Classes** to organize data and behavior.
- **Modules** for cleaner code and organization.
- **Arrow functions** for event listeners and callbacks.
- **Callbacks** for asynchronous actions.
- **Destructuring** to pull out specific properties.
- **Spread operator** for merging and copying arrays.







