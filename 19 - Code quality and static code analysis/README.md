# Lesson 19 - Code quality and static code analysis

In the first course, WD1 we've learned about automatic testing as a way to insure the quality of our code. While automatic testing is an important tool also in Javascript and/or in front-end applications, we won't have a deep dive into it this time. You're encouraged to check it out yourself, ask the instructor to give you pointers or answer any questions you might have. This time however, we'll check another tool that we use to make our code better. This techniques can be used also in Python and on the back-end, but the actual tools will probably differ.

## What is code quality

Code quality refers to how “good” the code in a program is. High-quality code is written in a way that all of the functionalities are **bug-free**, but it is also **easy to understand, change, and use**. Good code helps developers work faster and with fewer mistakes. It ensures the program runs well now and can be improved later without breaking anything.

Code quality is a subjective measure that, among others includes coding style, readability, maintainability, scalability, and performance of the code. Since a code base of a poor quality can make development difficult and slow we sometimes call this **technical debt**.

Some of the attributes of well written software project are the following:

- **Clarity**: Clear variable, function, class and other names. When naming things, always avoid ambiguity.
- **Consistency**: Following a coding standard or style guide. All of the code should be written in a consistent manner. This includes the naming conventions, indentation style, code organization, file and folder structure ets.
- **Efficiency**: Avoiding unnecessary computations or redundant code. Every task in software development can be achieved in many different ways. Different implementations can vary drastically in its efficiency. This has to be a consideration when developing a procedure.
- **Reliability**: Writing code that performs as expected under different conditions. Good programming code must be reliable and predictable. It should always produce the expected results, and not crash or malfunction.

Since software developers like to automate tasks - and because teaching people is harder than writing software, we have developed tools that help us with maintaining a decent level of code quality in a given project.

### Static Code Analysis

Static Code Analysis is a process of analyzing source code without executing it. This process helps us detect errors, code smells, and enforce coding standards early in the development life-cycle.

With a set of often free and open source tools we are able to detect potential bugs and vulnerabilities in our code, enforce coding standards, support secure coding practices which in turn reduces debugging and maintenance costs for our application.

Static Code Analysis tools often focus on these aspects of the code:

- **Code Smells**
  *Code smell* refers to any characteristic in the source code of a program that possibly indicates a deeper problem. It's a feeling that something isn't right when you look at the code base of a project.

  For example long methods, large classes, duplicated code, and overly complicated structure often signals that the code base isn't at it's highest quality.

- **Common Static Analysis Rules**

  - Unused variables and imports.
  - Cyclomatic complexity and code duplication.
  - Security vulnerabilities (e.g., SQL injection risks, improper data handling).
  - Style inconsistencies.

- **Categories of Issues**

  - **Bugs:** Logical errors that may cause unexpected behavior.
  - **Vulnerabilities:** Security risks, such as unsanitized inputs.
  - **Maintainability:** Code that is difficult to understand or modify.
  - **Style Violations:** Deviations from the agreed coding standards.

### Tools for Static Code Analysis

Since different software developers work with different languages and on different parts of the applications, there are also different sets of tools. Depending on the language we're developing with, these might take slightly different approaches, but the common thread is the same: ensure that the code you're writing adheres to good practices, is styled well and consistently. Here are some of the tools we might be using in different environments:

- **JavaScript/TypeScript**
  - ESLint: Linting for JavaScript and TypeScript.
  - TypeScript Compiler: Type-checking for enhanced safety.
- **CSS/HTML**
  - Stylelint: Linting for CSS and pre-processors like Sass.
  - HTMLHint: Linting for HTML files.
- **Backend (Node.js, Python, etc.)**
  - SonarQube: Comprehensive static analysis and code quality management.
  - PyLint or Bandit (Python): For Python code.
- **Security-Focused Tools**
  - Dependency-checking tools like Snyk or npm audit.
  - Static Application Security Testing (SAST) tools, e.g., Veracode.

Above we've mentioned the term linting. You might also come across the term prettifying. So what are these?

Linting checks code for errors, bad practices, and potential bugs to improve quality and maintainability. Prettifying, however only standardizes how code looks—things like indentation, spaces, or quotes—without affecting correctness. Often, both are used together: the formatter keeps code visually consistent, while the linter ensures it follows best practices.

## Practice: Set up static code analysis for a project

Use a project from previous lessons - we'll choose Tic-Tac-Toe code that we wrote in react. Similar process should be taken also when using different framework.

First we'll install **eslint**. This is the most used linting library for JavaScript. `npm init @eslint/config@latest`

Select the following options when the CLI tool asks you for settings:
```
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · javascript
✔ Where does your code run? · browser
```

Eslint will ask us to install some dependencies, let's allow them and use *npm* to do so:

```
The config that you've selected requires the following dependencies:

eslint, globals, @eslint/js, eslint-plugin-react
✔ Would you like to install them now? · Yes
✔ Which package manager do you want to use? · npm
```

If we run `git diff` after the installation, we can see which files have been changed. In *package.json* we can see that all of these dependencies were installed as devDependencies. This is because these packages will only be used in development environment.

### Configuration

We notice the installation has generated another file: *eslint.config.mjs*. Let's look at that:

```javascript
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
```

After importing statements we have export an array of configuration objects. In the second-to-last line, we can see that the React plug-in was added to the configuration. If we dig a bit deeper, ctrl-clicking on this line takes us to it's index.js script, where we can find the rules for our react app. If we create an app that violates these rules, eslint will let us know.

So let's test that. Let's build some components that have bad coding practices in them:

**badComponent.jsx**

```jsx
// Violates several React rules and best practices
import React from 'react';
import ReactDOM from 'react-dom';

const BadComponent = () => {
  // Undefined variable usage
  const undefinedVariable = undefinedVariable;

  // Unescaped apostrophe
  const unescapedString = "This string contains an apostrophe: John's";

  return (
    <div class="container">

      {/* Duplicate props */}
      <button type="button" type="submit">Click Me</button>

      {/* Unsafe usage of target="_blank" without rel="noopener noreferrer" */}
      <a href="https://example.com" target="_blank">Visit Example</a>

      {/* Passing children and using dangerouslySetInnerHTML */}
      <div dangerouslySetInnerHTML={{ __html: '<p>Unsafe HTML</p>' }}>Text content</div>
    </div>
  );
};

// Another component with issues
const MyButton = (props) => {
  return <button>{props.label}</button>; // Missing prop-types validation
};

export default BadComponent;
```

Include this component into a running React app. Then run eslint:

```
eslint src/*
```

The output should be something like this:

```
src/eslintBadComponent.jsx
   7:29  warning  'undefinedVariable' was used before it was defined                 no-use-before-define
  10:9   warning  'unescapedString' is assigned a value but never used                     no-unused-vars
  29:29  warning  No duplicate props allowed                                 react/jsx-no-duplicate-props
  32:7   warning  Using target="_blank" without rel="noreferrer" (which implies rel="noopener") is a security risk in older browsers: see https://mathiasbynens.github.io/rel-noopener/#recommendations  react/jsx-no-target-blank
  38:7   warning  Only set one of `children` or `props.dangerouslySetInnerHTML`
```

This output clearly states that we have some issues with our code. It tells us also where the issues are and of what type they are. After seeing this we can go back to the code and fix it so that it follows the rules that we've set for ourselves.

## Integrate into the workflow

After setting up static code analysis, the real value comes from **integrating it into the development workflow**. The goal is to make code quality checks a natural and continuous part of development rather than an afterthought. By embedding static analysis into the tools and processes developers already use, potential issues can be detected and fixed earlier, reducing costs and keeping the codebase healthier over time. There are several ways to integrate static analysis, each with its own strengths and trade-offs.

One approach is **editor (IDE) integration**. Here, static analysis tools are plugged directly into the development environment so that feedback is provided instantly as the developer types. This offers the fastest turnaround and helps catch mistakes early, but it relies on individual developers to pay attention to warnings. Since configuration may differ across machines, consistency between team members can also be a challenge.

Another option is **pre-commit hooks**. These run the static analysis automatically when a developer tries to commit code to version control. If the checks fail, the commit is blocked until issues are resolved. This ensures that problematic code never enters the repository. However, if the rules are too strict or the checks too slow, this can frustrate developers and interrupt their workflow.

Finally, **CI/CD integration** runs static analysis as part of the automated build or pull request pipeline. This guarantees that every change is checked in a uniform environment before being merged. It provides team-wide consistency and acts as a safety net even if local checks are skipped. The downside is that feedback comes later in the process, sometimes requiring developers to rework code after they’ve moved on.

In practice, these approaches are not mutually exclusive. **Editor integration** is great for fast feedback during coding, **pre-commit hooks** enforce quality at the individual level, and **CI/CD integration** ensures team-wide consistency. A balanced workflow often uses all three, combining early detection with strong enforcement and centralized control.

Let's see how to implement each of the approaches.

### **Editor Integration**

Most editors (like VS Code, WebStorm) have ESLint extensions. For VS Code, install **ESLint** from the Extensions Marketplace, then add (or eddit) a `.eslintrc.json` config in your project root:

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}

```

And in `.vscode/settings.json` optionally add the following lines. These ensure auto-fixing on save:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### **Pre-commit Hooks**

Use [Husky](https://github.com/typicode/husky) + [lint-staged](https://github.com/okonet/lint-staged) to enforce ESLint before committing.

Install dependencies:

```bash
npm install --save-dev husky lint-staged
npx husky install
```

Add a Husky hook:
```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

And in `package.json` add the folllowing:

```json
{
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "git add"
    ]
  }
}
```

###  **CI/CD Integration**

Another way to integrate the linting into your workflow is through CICD. We will talk about this in the next lesson.

## Conclusion

In summary, **code quality and static code analysis** are essential practices for building reliable, maintainable software. By catching errors, enforcing standards, and highlighting potential issues early, static analysis tools help teams reduce technical debt and improve collaboration. We’ve seen that integration is key: running analysis in the **editor** provides instant feedback, **pre-commit hooks** prevent bad code from entering the repository, and **CI/CD pipelines** ensure consistency across the entire team. Each approach has trade-offs, but together they form a powerful safety net that keeps codebases clean and sustainable.

Ultimately, the goal isn’t just to satisfy a tool, but to build a culture of **quality and accountability** in software development. When static analysis is seamlessly woven into the workflow, it becomes less about fixing mistakes after the fact and more about continuously writing better code from the start.
