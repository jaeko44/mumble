# mumble
<<<<<<< HEAD

Mumble is a self hosted secure chat application meant for businesses and teams to collaborate inspired by Slack.

## HTML Demo
[Mumble chat demo](http://mumble.philipos.me:9000)

## Front-End Dependancies:
```
* Bootstrap
* Font Awesome
* jQuery
* AureliaJS
* Firebase
* nprogress
```

## Development Dependancies:
```
* SASS
* Gulp (Optional)
```


## Front-End Setup

At the current stage I am experimenting with AureliaJS for client-side interaction, it uses Vanilla ES2016 JavaScript so development doesn't
include 'framework' explicit code. 

* Install NodeJS >= 4.x
    * You can [download it here](https://nodejs.org/en/).
* NPM latest version
    * This will automatically be installed with node, if it is already installed then make sure to update it via npm install npm -g.

Once you have the prerequisites installed, you can install the Aurelia CLI itself. From the command line, use npm to install the CLI globally also ensure that NPM is up to date:

```
npm install aurelia-cli npm -g

```
Now, navigate to the 'front' Directory and install it's dependancies (this might take a while)

```
npm install
```

Finally, we need to compile the scss files into css:
```
cd front
sass --update scss:css
```

## Running the App

Now run the following command inside the 'front' directory.

```
au run 
```

> Note: It should now be running in localhost:9000, 

> (optional with --watch flag): Updating code will automatically build and refresh your browser. Good for development
```
au run --watch
```

## Failed to Launch/Load in Browser

If you get an error in the console when typing 'au run', please report it.

> failed to load in the browser after launching

However, sometimes trying to load the app in the browser will result in a blank screen. Right click and click 'Inspect'.
Navigate to the 'console' tab, if you see an error at the top saying 'jQuery' cannot be detected. OR you scroll down and it says (0, bootstrap).*.... is not a function. 

Then follow these steps: 

1. Navigate to /front/node_modules/jquery/dist
2. Open the jquery.js file with a text editor.
3. Comment or remove lines 7 through 9 (which starts with = 'if (typeof jQuery === 'undefined') {')
4. Save
5. Launch the application again.

This happens as sometimes JQuery is not detected and ends up cancelling out bootstrap (as bootstrap can't operate without JQuery) resulting in an unhandled error which 
cancels the rendering of the UI.

> failed to launch in a linux environment

This is caused due to a bug in the Aurelia-CLI not being able to correctly find the dependancies, in order to fix this replace all '\\' in the front/aurelia_project/aurelia.json file into '/'.


# License

|                      |                                          |
|:---------------------|:-----------------------------------------|
| **Author:**          | Jonathan Phillipos [jaeko44](https://github.com/jaeko44)
| 	                   | Geoffrey Grundy [geoffreygrundy](https://github.com/geoffreygrundy)
| 	                   | Morgan A. Grice [morgangrice84](https://github.com/morgangrice84)
| **Copyright:**       | Copyright (c) 2016 RMIT
| **License:**         | Apache License, Version 2.0

