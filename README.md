# Medina Workflow
Personal, automated workflow with Grunt for page building and other common design-to-code tasks.

## Introduction
Medina Workflow is a Grunt-based workflow for automatizing tasks, in order to make new pages and projects on the go. It is my personal method of setting a initial project that works fine with every new project based on HTML, CSS and Javascript.

### Specification
Medina Workflow uses the following Grunt plugins within its settings:

- grunt-sass
- grunt-contrib-concat
- grunt-contrib-copy
- grunt-contrib-uglify
- grunt-contrib-watch
- grunt-browser-sync
- grunt-postcss

Be sure to have Node, NPM and Sass(Libsass) already installed.

### How to use
Medina Workflow was originally built thinking about how projects could be started more quickly.
In order to use Medina Workflow as your project base, follow the steps below:

1. Clone or download this Github repository: 
```git clone https://github.com/lucas-medina/medina-workflow.git```
2. Install the project dependencies through command line: ```npm install```
3. Execute the tasks through these simple commands: 
	- `grunt`: used to set every new file into the /build folder, that will be created for your project.
	- `grunt update`: used to enable connection to *localhost:2208* and also watch for new changes on your /src folder, updating previews and soon as changes are made.
	- `grunt finish`: which will set your files on the /build folder and remove logs from your Javascript file.

Current version is **0.6.4**. More information will be coming in time.
