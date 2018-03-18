![alt text](http://gdurl.com/x7zB "Cherry Hill East Auton Planner")
<p align="center">
  <b>Cherry Hill East Auton Planner<br/></b>
  Auton planner based on Electron with the goal of making assembling autons quicker and more intuitive.<br/>
  Developed by team 2616E.
</p>

[![Build Status](https://travis-ci.org/Cameronlund4/auton-planner-electron.svg?branch=master)](https://travis-ci.org/Cameronlund4/auton-planner-electron)
[![Maintainability](https://img.shields.io/codeclimate/maintainability/Cameronlund4/auton-planner-electron.svg?style=flat-square&maxAge=600)](https://codeclimate.com/github/Cameronlund4/auton-planner-electron)

---

**This project is a WIP. Please excuse any lacking features and report any issues you find. Also, use this code at your own risk. Do not trust the generated auton to be perfect; always be ready to shut your robot off when first testing.**

---

![alt text](https://i.imgur.com/3mfyORN.png "Page Example")

---
## Features

* ✔️ Create auton in sets of easy to understand actions
* ✔️ Easily customizable for personal codebase
* ✔️ Easily updatable for new games
* ✔️ Default actions draw hitboxes to show where the robot will hit
* ✔️ Cross-Platform, working on any system
* ✔️ Automatically scales to any size window
* ✔️ Supports and easily switches between many units of measurements
* ❌⏳ Save autons to a file and load at a later date
* ❌⏳ Change robot starting position and angle (Can be done [here](https://github.com/Cameronlund4/auton-planner-electron/blob/master/src/main/react/field.jsx#L84); percent of field (x,y), angle w/ 0 up)
* ❌ Click to move to point
* ❌ Interactable game objects
* ❌ Support customizable robot sizes
* ❌ Full usability with only keyboard
* ❌💤 Autosaving to make sure autons are not lost
* ❌💤 Live debugging of autons
* ❌💤 Support non-square fields for other programs like FIRST

---
## Setup
**Getting started with CHEAP is relatively easy, and can be done in 5 simple steps:**

1) Download the repository by typing the following in [git bash](https://git-scm.com/downloads) or anywhere else you have git shell access:

    `git clone https://github.com/Cameronlund4/auton-planner-electron.git`

2) Next, you'll need to be sure you have node.js installed on your system. It can be downloaded [here](https://nodejs.org/en/download/).

3) Using node, we need to install the [electron package](https://electron.atom.io/) globally:

    `npm install -g electron --save-dev`

4) We also need to install the [electron forge package](https://electronforge.io/) globally:

    `npm install -g electron-forge`

5) Now, in the directory of the downloaded source, the following command needs to be run to install dependencies for the project:

    `npm install`

That's it! Now make any changes to the code in your preferred editor (we suggest [atom](https://atom.io/)) and run the code using either `npm start` or `electron-forge start` in your root directory.

---
## Custom Actions

#### The Basics
Writing custom actions for autons is all done under the [impl/current/actions](https://github.com/Cameronlund4/auton-planner-electron/tree/master/src/impl/current/actions) directory. Every action needs a `_Action.jsx` file as well as a `_GUI.jsx` file, where _ is whatever you wish to name your action. (This naming scheme is not *required*, however is highly suggested).  The action file must extend `AutonAction`, and is used for the general management of the action, including drawing on the mock field as well as the code generation. The GUI file should be a [React](https://reactjs.org/) componenet, and will be displayed in the panel above the action list when the action is selected.

*More documentation is coming soon. Please refer to the examples currently in the [impl/current/actions](https://github.com/Cameronlund4/auton-planner-electron/tree/master/src/impl/current/actions) directory.*

#### Register the Action
All actions must be registered in the [ActionProvider.jsx](https://github.com/Cameronlund4/auton-planner-electron/blob/master/src/impl/current/ActionProvider.jsx) file. This is how the program detects your actions and loads them into code. Simply import the action object from your `_Action.jsx` file, and add it into the `this.actionTypes` object, with the key being the display value of your action object, and the value being your imported action object.

---
