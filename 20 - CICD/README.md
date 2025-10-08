# Lesson 20 - CI/CD and environments

CI/CD stands for Continuous Integration and Continuous  Deployment/Delivery. It is a set of practices that automate the  development, testing, and deployment processes in software projects.

**Continuous Integration** happens when developers push code changes into a shared repository, where automated builds and tests are run to make sure that the new code is complaint with the set rules.

**Continuous Deployment/Delivery** extends this process  by automating the release of tested code to production or staging environments. CI/CD is essential in web development because it accelerates the development life cycle, reduces the risk of bugs in  production, and ensures a consistent, repeatable deployment process. By improving code quality, and enabling rapid delivery of new features, CI/CD empowers teams to respond faster and with more quality to users' needs.

### Tools and Platforms

There are several different tools available for configuring and running the CI/CD workflows. Among the most popular are the following:

**GitHub Actions**
Made by and tightly integrated with GitHub, allowing developers to define workflows using YAML files directly in their repositories. It is beginner-friendly, and has strong community support. Can become expensive for larger teams.

**GitLab CI/CD**
Is part of the broader GitLab ecosystem, offering an all-in-one platform for source control, issue tracking, and CI/CD. It allows extensive customization and self-hosting options for greater control and cost management. Its pipelines are defined in a YAML file. GitLab is often used in enterprise settings but some things can be bit harder to learn.

**Jenkins**
An open-source automation server that supports building CI/CD pipelines. It can be self-hosted, however it can be more complex to use than the former two. It was among the earlier projects for build automation.

**CircleCI**
Also among the first CICD platforms, it is focusing on fast builds and simple setup. CircleCI is fast and scalable, but it can also get expensive.

**Travis CI**
Travis CI, once a popular choice, provides simple CI/CD for open-source and private projects. It supports multiple programming languages and integrates well with GitHub. However, its popularity has declined in favor of competitors like GitHub Actions and CircleCI, which offer more robust feature sets.

#### **Comparison**

- **Ease of Use:** GitHub Actions and CircleCI are user-friendly for beginners, while Jenkins and Kubernetes require more expertise.
- **Customization:** Jenkins and GitLab CI/CD are highly customizable, while GitHub Actions offers flexibility with prebuilt actions.
- **Cost:** Open-source tools like Jenkins are cost-effective for large teams but require maintenance, whereas cloud-based options like CircleCI are easier to manage but may incur higher costs.
- **Integration:** GitHub Actions shines for GitHub users, while GitLab CI/CD is best for teams using GitLab.



## Pipeline setup

In this lesson we'll set up a CI/CD pipeline using Github Actions. We'll be using the linting setup, that we have prepared in the previous lesson. We could, however, include other steps in the pipeline, such as automatic testing, building, deploying, ets.  The purpose is to show how to set up the pipeline, what kind of jobs do we include in it we usually decide on every project based on it's needs.

To start, we'll create a new repository in Github and upload the code from the previous lesson into it. The code includes the setup for linting, that we can run with `npx eslint src/*`. We'll run that as a CI/CD task.

To create a CI/CD pipeline in Github we'll go to the actions tab of the repository. Search for **Node.js** in the Continuous Integration section and Click Configure.

### Configure the workflow

This opens an editor for the file in the `.github/workflows/` folder. The file name is up to us, but we should give it a sensible name. Let's name it **test-and-build.yml**. To make it clear; these steps only created a plain text file in a special location of our repository (see above). We could have done this localy in our code editor.

The file that we've created should look something like this:

```yaml
name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  lint:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [22.x, 23.x, 24.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: npx eslint

```

The contents of the file is in the [YAML](https://en.wikipedia.org/wiki/YAML) format. This format is a human-readable format similar to JSON, The list items are lines starting with a hyphen (-) and objects have `value: key` pairs. Lines beginning with # character are comments. If you need help understanding the format, you can use an [on-line YAML to JSON converter](https://www.geeksforgeeks.org/yaml-to-json-converter/) or Learn [YAML in Y minutes](https://learnxinyminutes.com/yaml/)

The workflow is [organized as follows](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions):

- The name of the workflow is defined by the **name**
- The **on** keyword configures when this workflow will run. In our case, we want to run this on 2 occasions: When a commit is **push**ed to this repository or when a **pull_request** is created in this repository. Additionally we add the **branches filter** to trigger this workflow only on pushes and pull requests on **main branch**
- The workflow consists of several different **jobs**. These run in parallel by default to speed up the processing, but if the jobs are co-dependent, this can be changed 
- The **lint** line is **not a keyword**, but the **identifier of a job**. Inside this keyword, the job is defined
  - with **runs-on** we define that this job will be run on the latest version of the Ubuntu Linux distribution. With this we will be able to use all of the Ubuntu's commands and tools.
  - The **steps** keyword, defines which actions we will take in this workflow. In our example these will be:
    - Clone this current repository using an action defined in `actions/checkout` repository. We'll be using the 4th version of this action. You can check how this action works at the [github.com/actions/checkout](https://github.com/actions/checkout/blob/main/action.yml) repository.
    - Install and set up the Node.js environment using npm cache
    - Install our repository's npm packages. `npm ci` stands for "clean install" which does not modify `package*.json` files, but just installs the requirements.
    - `npx eslint src/*` will run the linting that we defined in the previous lesson
  - in our case, we run 3 jobs in paralel, trying to lint on 3 different versions of Node.js

Let's commit the file to the main branch. Use the button in the top right to do so.

## See the workflow running

Go again to the Actions tab. The screen has now changed and we can see that the workflow we have defined is now running. This is because we used `on: push` trigger for branch `main` to which we committed the new file.

Click on it and explore it. In the interface we can see the summary of the pipeline. If it passes correctly, the status is **Success** otherwise, the status is **Failure** and the icon is a red cross. This means that something in our pipeline failed. If any of the steps in the workflow fails, the entire workflow will be marked as failed as well.

Let's now check the linting errors and warnings and fix them so that we see how the working workflow looks like.

After we've fixed all the problems in the code for eslint to pass, commuted and pushed the code, we can see that the workflow runs through successfully. Now, we can chain additional jobs to our workflow

### Add build job

```yaml
  build:
    name: Build
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Checout repo
        uses: actions/checkout@main
      - name: Install dependencies
        run: npm ci
      - name: Build dependecies
        run: npm run build
      - name: Archive production artifact
        uses: actions/upload-artifact@main
        with:
          name: build
          path: dist
```

The build job works similarly than the lint one. Here we create a bundle of code, as we do when we run `npm run build` locally. When we do that, we get the minified code that's ready for deployment in the dist folder on our local machine. Since the CI/CD process runs on stateless containers, that get destroyed after the job is completed, we have to explicitly save the build. We do that with the last step of the job: Archive. This step/action was written by GitHub developers and is one of the actions available in their library.

If we now check the build job's log, we can find the link to this archive. We'll use this in our next step.

### Add deploy job

```yaml
  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@main
      - name: Download artifact
        uses: actions/download-artifact@main
        with:
          name: build
          path: dist
      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting --project intercontinental-tic-tac-toe   
        env:
          GCP_SA_KEY: ${{ secrets.GCP_SA_KEY }}
```

In the last job, we'll deploy our created build. We'll do that with the action that some other user created. This is the line that starts with `uses:` and is followed by the address of the action that the user `w9jds` created. We give it some arguments, but we also have to give it our authentication secrets.

#### Secrets

To be able to upload our code to Firebase, GitHub Actions of course needs to authenticate. We do that through a GPC key.

You can get the `GCP_SA_KEY` in Firebase settings. Go to the project's settings (gear icon next to "Project overview"), then select **Service account** tab and click **Generate new private key**. It should download as a .json file.

We need to save this key securely in GitHub. For this we can use secrets. In GitHub we'll add them by going to our repository and then  `settings/secrets/actions` . Here we should create a new repository secret with the key **GCP_SA_KEY**. This is stored encrypted and is used on every CI/CD run. It's value should be the entire contents of the JSON file that we've downloaded.

## Conclusion

Today we've showed how to set up a tree-staged CI/CD pipeline in GitHub Actions. Other CI/CD platforms may differ a bit, but the underlying logic is the same across all of them. In the CI/CD pipelines we usually include lining, testing, extracting and publishing release notes, building, deploying, and other tasks. We've seen how to make jobs depended on one another and/or how to run them in parallel. We've also seen how to save the secrets for authentications outside our our source code which is an important good practice.

