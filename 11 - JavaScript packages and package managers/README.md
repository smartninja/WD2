# Lesson 11 - JavaScript packages and package managers

## About packeage managers

Package managers are tools that automate the process of installing, updating, and managing libraries and dependencies for a project. They simplify sharing and organizing code, helping developers avoid manual dependency tracking and compatibility issues. As we've seen in Web Development 1, in Python we're using **pip** as a package manager. This enables us to install libraries from the Python Package Index (PyPI).

Similarly, the default package manager for Node.js, is **npm**. It is used to manage JavaScript packages from the npm registry. Both pip and npm streamline project setup by allowing developers to specify required packages in configuration files (`requirements.txt` for pip, `package.json` for npm), which the package managers then use to install everything automatically.

Although npm has a huge majority in use, there are some alternatives:

- **Yarn**: Developed by Facebook, Yarn offers faster installs and better dependency handling. Yarn also supports offline installations through caching.
- **pnpm**:  Is known for its efficient disk space usage and installation speed. By using hard links it avoids duplicating files.
- **Bun**: Additionally to being a package manager it's a full JS runtime environment. It handles bundling, transpiling, and installing packages — all with performance in mind.

## Install npm

**npm** typically comes bundled with **Node.js** by default. When you install Node.js from the [official Node.js website](https://nodejs.org/), npm is included in the installation. This is because npm is the default package manager for Node.js, and they are designed to work together.

## CLI use

### Install a package with npm

Try a simple library that writes to the console:

```bash
npm install cowsay
npx cowsay "Hello world!"
```

After installing a package with `npm install`, we can find a folder called `node_modules` and two new files in our current directory: `package.json` and `package-lock.json`. These are the minimal components for managing and tracking dependencies in a Node.js project.

- **`node_modules` folder**: This folder contains all installed packages and their dependencies in your project. It’s where npm downloads and stores the actual files needed to run the packages you’ve installed. This folder can become quite large, but can be deleted if we're not working on a project since we can always recreate it by running `npm install`. This folder should **not** be committed to the project's repository.
- **`package.json` file**: This file is the main configuration file for a Node.js project. It defines basic information about the project, such as its name, version, description, and author. Most importantly, it lists all the **dependencies** and **devDependencies** the project requires, along with their versions. The `package.json` file allows npm to know which packages to install if the project is shared or moved to another system. It also supports custom scripts (like `npm start` or `npm test`) that can help automate tasks within the project. It should be committed to the repository.
- **`package-lock.json` file**: This file is an automatically generated file that “locks” the exact versions of each dependency and their sub-dependencies installed in `node_modules`. Unlike `package.json`, which only specifies major and minor versions, `package-lock.json` records the exact version of every package and sub-package used, ensuring that installations are consistent across different environments and preventing unexpected changes. This file should also be committed to the project's repository.

Let's try installing another library and using it in code.

### cli-chart - A CLI graphing tool

Install cli-chart with the command `npm install cli-chart`. This installs the library in `node_modules` and adds the dependencies to `package.json` and their exact versions to `package-lock.json`. Find `cli-chart/` folder in `node_modules` , explore it's `package.json` and check it's dependencies.

To use the library we will create a new file and import the library. Since this module uses the old-style node.js module syntax, we have to import it with the `require()` function.

We'll create our program in  **main.js**:

```javascript
var Chart = require('cli-chart');
var chart = new Chart({
    xlabel: 'snausages/hr',
    ylabel: 'dog\nhappiness',
    direction: 'y',
    width: 40,
    height: 10,
    lmargin: 15,
    step: 4
});
 
chart.addBar(3, 'red');
chart.addBar(9).addBar(13).addBar(15).addBar(16);
chart.draw(); 
```

The code above is just a configuration of the graph that we want to create. This can be seen in the documentation of a package. The package developers are responsible for it's documentation. On larger projects this is usually verbose and well maintained, but on smaller libraries that are developed by a single developer documentation can often be scarce or even non-existent. In these cases we can always explore the functioning of the library by jumping into it's source code.

Using the `node main.js` command we run our short program that uses the installed library that prints the graph in the console.

## Npm and web development

Package managers play a crucial role also in web development. They are used for managing external libraries, tools, and frameworks that we use to build, optimize, and  maintain applications. They simplify the process of adding, updating,  and removing dependencies (external pieces of code), allowing us to work more efficiently and maintain consistency across projects.

We'll look into bundlers, which we use as a base and tool set for developing our project.

## Bundlers

JavaScript bundlers **streamline and optimize the development process** for web applications. They are crucial in modern web development because they allow developers to write modular code split across multiple files, which these tools then combine into a single or several optimized files for production. This bundling process helps reduce load times and improves performance by minimizing file size and organizing dependencies. Some examples are  **Webpack**, **esbuild** and **Vite**. Additionally to JavaScript they both handle other assets, like CSS, images, and fonts, often through plugins or extensions, which makes them versatile tools for a full-stack front-end workflow.

Webpack, one of the earliest popular bundlers, offers extensive plugins  and configuration options that provide **fine-grained control** over complex build processes, supporting features like code splitting, live  reloading, and dependency management. In contrast, esbuild focuses on  **speed and efficiency** with a highly optimized Go-based build process,  making it popular for fast development and production builds. Vite, a newer tool combines the speed of esbuild for quick start-up and hot module replacement with Rollup for optimized  production builds. Designed for **simplicity and compatibility** with frameworks like Vue and React, Vite provides a streamlined, fast  alternative for modern web development that balances ease of use and  performance.

We'll try Vite since it's the simplest to set up.

### Vite

Using `npm create` command we can create run a 'wizard' to create the basic setup of a specific project. We'll create the latest vite setup using the following command:

```bash
npm create vite@latest
```

The script will ask us what kind of project we want to start. For the **project name** we can select the default `vite-project`, select our own or use `.` (dot) to use the current directory as the name. The files will get installed in the selected directory.

In case that the folder is not empty Vite will ask you if he can remove the files. Often it makes sense to put a fresh project into an empty directory.

Next we have to **select a framework**. Vite supports many JS frameworks but since we're not yet learning about frameworks, we should choose **Vanilla** (which means plain) JavaScript.

In the **variant** question we'll choose **JavaScript**. We'll be learning about TypeScript in the next lesson.

Vite then creates the files for a super simple demo project. It also asks us to run `npm instal` and `npm run dev`. Let's install the packages first and look at the files created.

```js
.
├── node_modules          // place for our dependencies
├── package.json          // package information
├── package-lock.json     // dependency versions information
├── index.html            // the default starting point where vite starts building the project
├── main.js               // the main javascript file - the root of our program
├── counter.js            // a module whit functionality that main.js imports and uses
├── javascript.svg        // a vector image that gets used in the application
├── public                // a folder with files that get published in production unchanged
│   └── vite.svg          // another vector image file
└── style.css             // a style information that is imported in main.js
```

On further inspection we can see that the list of dependencies (and the `node_modules` folder) is shorter/smaller than in our *cli-chart* example. Vite development team makes sure that the list of their dependencies is as minimal as possible since this makes Vite more 'independent' and therefore more stable.

We've now set up our project's basic build environment. It would make sense to create a git repository and create the initial commit right here.

#### Development environment

When we're working on/developing our application we'll be using the development server. We'll use the `npm run dev` command to start a local development server. This command allows us to preview and test our code in the browser. It offers code bundling and the HTTP server with real-time updates. Run the command and open a browser at `http://localhost:4173/`, as suggested by the server's output.

When we change the project files we can notice that the server auto-refreshes the page. When we have some errors in the code, Vite will give us an error message in the browser.

#### Building our app

At a point where we're satisfied with the state of our app and we want to publish it to the web, we'll use the `npm run build` command. This will create an **optimized production build** of your web application.  This command prepares the application for deployment by bundling and  compressing the code.

1. **Bundling**:
   Running `npm run build` bundles your code, transforming it into a format that is optimized for  browsers. This typically involves combining multiple files into fewer  files to reduce HTTP requests.

2. **Minifying and Optimizing Assets**:

   Vite compresses JavaScript, CSS, and other assets to reduce file sizes,  improving loading times for users. This process includes minification  (removing unnecessary whitespace and comments) and tree-shaking (removing unused code).

3. **Output to a `dist` Folder**:

   The final build files are placed in a `dist` (distribution) folder. This folder contains all the necessary files for deploying the application on a web server.

After the files are build we can check the `dist` folder. We can see that all of the JavaScript files are combined into one and that it's name is appended with a short hash string. This is used for cache-busting.

## Homework

For this lesson's homework, implement an additional functionality on this demo project. When you're done, make sure to build the app for production and test the bundled version of the code. Here are several suggestions what to do:

### Background color switcher

Add a functionality that will add an `eventListener` on the `<body>` tag of the document. When the user clicks on the body tag, the document's background color should be changed to a random color.

To generate a random color you can use `Math.random()` and set the color with `style` attribute on the `<body>` tag. You can use `rgb()` function in CSS so you can use decimal numbers (0-255), not hexadecimal (00-FF).

### Link to a Document

Add a link to the app to dowload a .pdf document. The document's name much be unchanged when the user opens it.

### Additional style on a component

Create a new folder in the app's root directory with a `additional.css` stylesheet file in it. Add some styles to this file. Import this css file into a JavaScript module file and make sure that the styles are applied in the app.

Check how the css is loaded after the app is bundled for production.
