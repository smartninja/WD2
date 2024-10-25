# Lesson 09 - JavaScript and the DOM

## DOM - Documented Object Model

The DOM is an interface that  represents the structure of a webpage as a tree of objects (nodes). It  allows JavaScript to access, modify, or delete elements on a webpage  dynamically.

In developer tools we can see how the HTML structure is reflected in a tree with parent,  child, and sibling nodes, which is how the browser "sees" the webpage.

In DOM there are different types of nodes, such as elements (`<div>`, `<p>`), attributes, and text nodes. We can navigate through them and manipulate them through DOM Interfaces

## Selecting Elements

There are several different way of selecting DOM elements from JavaScript.

- `document.getElementById()`: Selects an element by its `id`. An `id` attribute should uniquely define one element in a HTML document. Returns an `Element` object.
- `document.getElementsByClassName()`: Selects multiple elements by class name. Returns a live `HTMLCollection` which means the result can change if DOM changes.
- `document.getElementsByTagName()`: Selects elements by tag name. It also returns a live `HTMLCollection`.
- `document.querySelector()` and `document.querySelectorAll()`: More flexible, CSS-style selectors. The first one returns an `Element` while the second returns a (static) `NodeList`.

**Exercise:** Select elements in a web page and display them in the console. Check what kind of properties do these elements have. Log `innerHTML`, try using `click()` method `scrollIntoView()` and others.

## Traversing the DOM

We can use different methods on DOM `Node`s to move around the DOM tree. To select a parent node there is a `.parentNode` method, for selecting nodes on the same level (siblings), use `.previousSibling` and `.nextSibling` and for selecting child nodes, we use `.children`, `.firstChild` and `.lastChild` methods.

This kind of traversing is useful to know, but in practice not used very often.

## Modifying Elements

We can change the elements through it's methods and properties:

**Change the text**

Use the `element.textContent` to modify or retrieve the text inside an element.

Use `element.innerHTML` to set or get HTML inside an element. :warning: This can be dangerous if we let the user control what is inserted here. It opens our page to a possible XSS (Cross-site-scripting) attack.

**Changing Attributes**

Methods `element.setAttribute()`, `element.getAttribute()`, and `element.removeAttribute()` are used to manipulate element attributes like `src`, `href`, etc. 

**Modifying Styles**

Using `element.style` we can to directly change inline styles of an element.

Methods `classList.add()`, `classList.remove()`, and `classList.toggle()` allow us to add, remove, or toggle CSS classes dynamically.

**Exercise:** Using what we've learned, change the headings on your favorite news site to be in all capital letters. Change it's color as well.

## Creating and Removing Elements

We can also programmaticly create and destroy elements. There are different methods to do that.

For creating elements use `document.createElement()`. This method returns a new `Element`, but does not yet insert it into the DOM. 

Methods `parentElement.appendChild()` or `parentElement.append()`  are used to add a newly created element or node to the DOM. We can use `element.insertBefore()` to insert an element before a specific child.

When we want to get rid of an element, we use `parentElement.removeChild()` or `element.remove()` methods.

## Handling Events

To be able to have some interactivity in our web page, we need to be able to listen and respond to user events. Events in this context can be whatever a user does on a web site such as move a mouse, click, double-click, scroll, press a key on a keyboard, focus an input, submit a form or many more.

To be able to react to events on the web page, we need to add `eventListener`s. We could do that by adding the `onclick` (or similar) attribute to the element in-line, but we want to separate the concerns and define this behavior in JavaScript. That's why we use `element.addEventListener()`. With this method we add a listener for events such as clicks or keypresses.

This method takes (at least) 2 parameters: 

- *type*
  Defines the type of the event we're listening to. This can be any of the long list of events, but the most common are `click`, `dblclick `, `mouseover`, `mouseout`, `focus`, `blur` and similar. The entire list can be found in [mdn documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element#events) or elsewhere.
- *callback*
  A function that defines what happens on the event. This function receives an `event` parameter when called. In this parameter an object describing all of the event details (such as click location, target element and similar). It can be a normal function or an in-line arrow function.

For performance reasons we don't want to put event listeners on too many elements. If we need to listen for events of many elements, add a listener on their parent and use `element.target` to detect the source of the event.

## Homework

Create and add a front-end to the Task manager logic that we created in the previous lesson. In HTML you can define the layout, then create a form for adding a new task, listen for `submit` event on the `<form` element and save the new task in the collection.

To disable the form from sending a request use the `event.preventDefault()` method in the top of the callback.

**Alternative**

Build *Jerry's game*, a game where balloons appear randomly in the screen and the user has to pop them by clicking on them. Use ` element.getBoundingClientRect() ` to get the size of the elemet, `Math.random` to generate random coordinates and use `setInterval()` to run a function for creating balloons on a regular interval. You can position balloons absolutely.

## See also

- https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model

