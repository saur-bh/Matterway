# Matterway application testing using cypress and cucumber (Gherkin syntax) -RunBook

The test was conducted on web browser ( Chrome v91  and Electron v89)

## Pre-Condition 
Install node.js and npm on the system
* Windows https://phoenixnap.com/kb/install-node-js-npm-on-windows
* Mac https://www.newline.co/@Adele/how-to-install-nodejs-and-npm-on-macos--22782681
* Linux(ubantu) https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/


## Tech Stack 
- javaScript 
- puppeteer
- jasmine
- Python to run local server

## UseCase which are automated 
1. Displays of the skill launcher.
2. Displays a sidebar with a “Run Automation” button.
3. On click on Run Automation ,Google search bar with the following text “Automation did run!”.

## Demo 
https://youtu.be/ns02rddZRCw ( unlisted :Person with link can view )


## Setup

* Must have NodeJS and NPM installed (https://nodejs.org/en/)
* Install dependencies by running `npm install`

## Running Tests
* Make sure to run python -m SimpleHTTPServer 8000 ( Local server) from location where test will be executed i.e. Matterway folder 
* To run all  or indiviual tests, run `npm test` 

## Enhancement
  * Integration with CI tool i.e. Jenkins
  * Autostart of local server and move out of manual start 
  * Alternative way to find elemnet if could not be located
  * Use of page Object model with cumcumber 

## Limitation 
* Test will not run in headless mode.
* Test will be done on chormium browser still need to figure out how to do it for firefox and other browser.



