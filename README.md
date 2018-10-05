# mumble

Mumble is a Chat Application (inspired by Slack) built on tomorrow's Web Standards (JavaScript [ES6], HTML, CSS), It's a thick client based application, instead of servers for the back-end it utilizes a Cloud Back-end as a Service (Firebase by Google) to host it's data. 
We are currently in the process of migrating Firebase into a Self-Hosted Server Alternative - FeatherJS. To avoid lockins yet maintain the same features from Firebase.

Mumble showcases the web of tomorrow, combining the power of NodeJS Real-Time applications with a thick client based application that relies on One Code base in order to be truly Cross Platform. 

### Login page
![Login page - Mumble](http://i.imgur.com/ATp7TC7.png)

### Contacts

Adding Contact Step 1:
![Adding Contact Step 1 - Mumble](http://i.imgur.com/ehhvGmj.png)

Adding Contact Successful: 
![Adding Contact Successful - Mumble](http://i.imgur.com/2ZK0Ytp.png)

### Homepage
![](http://i.imgur.com/NuBtZMS.png)

## Support

Web Client
Desktop Client (Linux, Windows, Mac) - Coming Soon with Electron
Mobile Clients (Apple, Windows, Android) - Coming Soon with PhoneGap

## HTML Demo
[Mumble chat demo](http://mumble.netlify.com)

## Front-End Dependancies:
```
* Bootstrap
* Font Awesome
* jQuery
* AureliaJS
* Firebase
* nprogress
```

## Server Dependancies: 
```
* Node.JS
* FeatherJS
* Socket.io
* neDB - a NodeJS Database
```

## Development Dependancies:
```
* NPM
* Node
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

