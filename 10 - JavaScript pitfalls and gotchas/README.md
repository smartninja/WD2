# Lesson 10 - JavaScript pitfalls and gotchas

As we have learned, JavaScript has been developed by one person in 10 days. At that point no one realized that it could ever be as prevalent as it is now. Because of this short deadline and it's intended limited use, there were some "questionable decisions" made while developing the language. This can lead to misunderstanding and confusion while programming in JavaScript.

Watch a legendary [short video, Wat](https://www.destroyallsoftware.com/talks/wat) by Gary Bernhardt. It's about Ruby (you can skip this part) and about some JavaScript.

Inconsistencies like these like these can lead to inaccurate expectations from the developers and can cause errors and bugs in the code. Let's check some other examples:

## Type conversion

With the following examples we get an unexpected results:

```javascript
[] + [] // => ''
[] + 1 // => '1'
{} + [] // => [object Object] (or 0 in some cases)
[] + {} // => [object Object]
{} + {} // => [object Object] (or NaN in some cases)

```

With all of these examples the issue is the same. When using the addition operand (+), both values need to be converted to primitive values. This is [defined strictly](https://262.ecma-international.org/5.1/#sec-11.6.1) in the ECMAScript Language Specification. In all of these cases both sides of the expression are converted to primitive values, but depending on the context this conversion can be to Number or to String. Additionally, different JavaScript engines process this differently.

As the consequence of the above note that you should **never use** addition, subtraction and other **mathematical operands on Arrays and Objects** (unless you really know what you're doing).

In the following examples Type coercion is again at play.

```javascript
0 == []; // => true
0 == "0"; // => true
"0" == [] // => false !!!!	
```

In the first line, first the array `[]` gets changed to primitive, which transforms it into empty string `''`. Then because the left operand is a Number, right side also gets transformed to a Number, which turns it to `0`. And finally, `0 == 0` evaluates to true.

The second and the third line have a similar process, only in the last row, the `[]` is transformed to an empty string `''`, which is **not** equal to `'0'`.

The lesson here is **know what types you're working with**. And anyway, you shouldn't ever need to compare an Array to a Number. You might want to compare `[].length()` to a Number, but this is a Number to Number comparison and no type coercion happens.



Read more about what is happening here in a [blog post](https://2ality.com/2012/01/object-plus-object.html) by Dr. Axel Rauschmayer.

## Comparison

Check the following examples of comparison statements in JavaScript

```javascript
// All of these evaluate to 'true'!
console.log(false == '0');
console.log(null == undefined);
console.log(" \t\r\n" == 0);
console.log('' == 0);

// And these do too!
if ({}) // ...
if ([]) // ...
```

Again in all of these cases type conversion is happening. Think about what is happening here and why do we get these results.

A good practice when comparing values is to **use an equality operator `===`**. Again if you know what you're doing, Type coercion can be useful, but think twice before you use it.

### Comparing variable to NaN

A similar thing is when we want to make sure a value in a variable is a number:

```javascript
NaN == NaN // false
NaN === NaN // false


typeof NaN == 'number'
```

To make sure a variable is `NaN` we should always use `Number.isNaN()` function to test if a value is not a number.

### Comparing objects

```javascript
a = new Boolean(true)
b = new Boolean(true)

a == b //returns false
```

Even if two separate objects hold the same values, the comparisons among them will always return `false`. This is because the objects are stored in different places in memory. A 'hack' to compare objects wold be to stringify them to JSON, but this is also not fool-proof.

**It is best to avoid object comparison in JavaScript.** If this can not be achieved, a library like Lodash can provide such a functionality.

## Implicit semicolons

JavaScript engine automatically inserts semicolons (`;`) at the end of the line. Most of the time this works well, there are only a few notable execptions to this rule. The following code (without semicolons) will **not work correctly**:

```javascript
let name = 'janez'
('->' + name.charAt(0)).toUpperCase()
```

Here, the semicolon doesn't get inserted at the end of the first line and the engine thinks that the expressions continues with the bracket `(`. This also happens if we'd have square bracket `[` for an Array. We could avoid this by adding a a semicolon only in this cases. Mislav Marohnić [argues](https://mislav.net/2010/05/semicolons/) that this kind of code is fine. Most developers would disagree and just recommend that you should **always use semicolons** in your JavaScript programs. 



## typeof null == 'object'

This is regarded as a mistake in JavaScript and doesn't have a reasonable explanation (like other iregularities above might have). Be careful when using `typeof` operator.



## Object mutation

The following code can also be confusing to some junior developers

```javascript
const original = { name: "Alice", age: 25 };
const copy = original; // This is a reference, not a copy!

copy.age = 30; // Changes the age in the original object too

console.log(original.age); // 30 (unexpectedly changed)
```

Objects in JavaScript variables are stored  as references to a place in memory. If we change the copied object, the original changes as well. This goes for all levels of the nested objects.

```javascript
const original = { name: "Bob", address: { city: "New York", zip: 10001 } };
const shallowCopy = { ...original }; // Shallow copy

shallowCopy.address.city = "Los Angeles"; // Modifies the nested object

console.log(original.address.city); // "Los Angeles" (unexpected change)
```



## Wrong use of this

```javascript
const Game = function() {
    this.clearLocalStorage = function() {
        console.log("Clearing local storage...");
    };
    this.clearBoard = function() {
        console.log("Clearing board...");
    };
};

Game.prototype.restart = function () {
    this.clearLocalStorage();
    this.timer = setTimeout(function() {
        this.clearBoard();    // What is "this"?
    }, 0);
};

const myGame = new Game();
myGame.restart();
```

The `this` keyword is referencing the curenet object. But if it's referenced outside of the scope of the Object, `this` can be undefined.



## Learn more

Javascript is weird - javascript compiled to 10 characters: https://www.youtube.com/watch?v=sRWE5tnaxlI



## Homework

In a short paragraph explain what happens when we do `[] - []` and what kind of 
