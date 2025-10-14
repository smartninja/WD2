# Lesson 22 -  Final project

## App planning

By now the group and the mentor should have decided on what kind of project you'd like to do. If that's not the case have a quick vote or let the benevolent dictator - the mentor - decide.

Depending on an approach, in a real project this step might take hours or days to agree on the functionalities, sometimes even longer. We, however, only have a few hours to finish the coding so don't take too much time for this step.

### The features

The name/description of the project likely already suggests what functionalities the app will offer. Write these ideas down so you and fill you the details. Since this is an MVP (minimal viable product), concentrate on **one core feature** that we can finish - one finished feature is much better that 5 unfinished.

### The stack

In short, **describe the tech stack** you'll be using. No need to go in details here, just think about what you'll be using for your front-end, what for your back-end, will the app be SPA or server-rendered, where it will be hosted/deployed which external services you might need. If you need a back-end and a database, Firebase can save you a lot of time, which is very precious in this setting.

Think about and write down which **data structures** do you need to have to be able to support the functionality that you've set up.

### The design

How the app will look is the least important for a proof of concept app. However it might help you to draw some quick wire-frame  sketches to be able to visualize the screens before you start writing the HTML. For this you could use a tool like Figma, Miro or Canva, but a simple vector graphics editor like Inkscape will do just fine.

For now, don't stress about the CSS. An ugly app that works is better than a beautiful that does not. If there's enough time, you can add a CSS framework or a classless CSS like [Pico](https://github.com/picocss/pico) to your project at the end of the project.

### Readme

When you're done with this preparation, save this file as `README.md`. This can be the first file you commit to your repository. You can add [more information](https://www.makeareadme.com/) to this file later on.

## Work schedule

The steps below are a suggestion how to divide and bound your task. If you notice you're wasting too much on one task, finish it and continue with other steps. There are some suggestions to keep in mind while working:

- **Scope small.** One core feature done well > five half-finished features.
- **Work in vertical slices:** Implement one full user action (e.g. search → results) before adding new ones.
- **Leave styling last** — a working ugly app is better than a broken pretty one.
- **Use dummy data first, API later** if something breaks.
- **Commit every 45 min** so you can revert if needed.

### Lesson 1/3 - today

**Goal**: Get your environment running and the skeleton of your app in place.

**Tasks:**

- Create project:
  - `npm create vite@latest`
  - Set up folder structure (`/components`, `/services`, `/assets`, etc.)
- Add dependencies you’ll need (e.g. Firebase SDK, React Router, etc.)
- Verify everything runs with `npm start` (or equivalent)
- Commit initial version 

- Implement main data feature:
  - Call external API (e.g., weather, movies, quotes) **or**
  - Connect Firebase/Firestore/your backend
- Display the fetched data as a crude text or in a simple layout
- Commit and push to GitHub

When finished the app runs locally, fetches data from the BE and displays it in a simple layout.

------

### Lesson 2/3

**Goal:** Get the main data flow working also for Create, Delete and Update.

**Tasks:**
Commit at each of the following steps

- Write a Create screen with the form
- Connect the form with the create functionality on the BE
- Keep it minimal: one main component doing the core feature
- Add the delete button and it's functionality
- Connect the Create form with the data from the BE to enable the Update functionality

At the end of the lesson you can fetch, view, and interact with real data from the backend.

----

### Lesson 3/3

**Objective:** Make it feel like a usable app and deploy

**Tasks:** 

- Set up the deployment of the app with Firebase, Github Pages, Render or a provider of your choice
- Polish the app
  - Add styling (CSS or Tailwind, simple layout)
  - Add branding (title bar, logo, favicon, colors, ...)
  - Implement component states (empty states, loading states)
  - Clean up console warnings
  - Handle loading error states
- Test key flows
  - Fetch from API
  - Data persisting and updating
  - Error handling

At the end we have a **deployed, working MVP** that demonstrates your skills end-to-end.



## Optional Additional Tasks

During the development you can have a running to-do list in your README file. If you tick of all of your tasks early, here are some ideas what you can do next:

- Add authentication (Firebase Auth)
- Add dark/light theme toggle
- Polish the README, adding more info (name, description, tech stack, how to install and run it, visuals/screen shots, support, roadmap, ...)
- Add tests, linting and/or a CI/CD pipeline for builds
