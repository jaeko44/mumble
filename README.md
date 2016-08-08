# mumble

Mumble is a self hosted secure chat application meant for businesses and teams to collaborate. 

## HTML Demo
[Mumble chat demo](http://philipos.me/mumble)

## Front-End Dependancies:
```
* Bootstrap
* Font Awesome
* jQuery
* AureliaJS
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
* NPM >= 3
    * This will automatically be installed with node, if it is already installed then make sure it is updated to >= version 3.

Once you have the prerequisites installed, you can install the Aurelia CLI itself. From the command line, use npm to install the CLI globally:

```
npm install aurelia-cli -g

```

N̶o̶w̶,̶ ̶n̶a̶v̶i̶g̶a̶t̶e̶ ̶t̶o̶ ̶t̶h̶e̶ ̶'̶f̶r̶o̶n̶t̶'̶ ̶D̶i̶r̶e̶c̶t̶o̶r̶y̶ ̶&̶ ̶i̶n̶s̶t̶a̶l̶l̶ ̶i̶t̶'̶s̶ ̶d̶e̶p̶e̶n̶d̶a̶n̶c̶i̶e̶s̶ ̶(̶t̶h̶i̶s̶ ̶m̶i̶g̶h̶t̶ ̶t̶a̶k̶e̶ ̶a̶ ̶w̶h̶i̶l̶e̶)̶ (Bug):  [Github - Aurelia CLI issue #253](https://github.com/aurelia/cli/issues/253)

```
n̶p̶m̶ ̶i̶n̶s̶t̶a̶l̶l̶  (Currently there is a bug with trying to run apps that you have installed it's dependancies through NPM)

```
Instead, create a new aurelia project and then copy it's tempProj/node_modules folder into the front DIR. You can then delete the tempProj folder.
```
au new
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

# License

|                      |                                          |
|:---------------------|:-----------------------------------------|
| **Author:**          | Jonathan Phillipos [jaeko44](https://github.com/jaeko44)
| 	                   | Geoffrey Grundy [geoffreygrundy](https://github.com/geoffreygrundy)
| 	                   | Morgan A. Grice [morgangrice84](https://github.com/morgangrice84)
| 	                   | Dan [s3573667](https://github.com/s3573667)
| **Copyright:**       | Copyright (c) 2016 RMIT
| **License:**         | *to be decided after a discussion with team

Licensed * either opensource release after completion or kept private.