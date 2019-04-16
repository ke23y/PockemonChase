"use strict";
// App constructor
const App = function(canvas, overlay) {
  this.canvas = canvas;
  this.overlay = overlay;

  // obtain WebGL context
  this.gl = canvas.getContext("webgl2");
  if (this.gl === null) {
    throw new Error("Browser does not support WebGL2");
  }

  // serves as a registry for textures or models being loaded
  this.gl.pendingResources = {};
  // create a simple scene
  this.scene = new Scene(this.gl);

   //keyboard event handling 
   this.keysPressed = {}; 
   //this.keyboardMap = {};


  document.onkeydown = (event) => {
    this.keysPressed[keyboardMap[event.keyCode]] = true};


  document.onkeyup = (event) => {
   this.keysPressed[keyboardMap[event.keyCode]] = false};
  
  this.resize();
};

// match WebGL rendering resolution and viewport to the canvas size
App.prototype.resize = function() {
  this.canvas.width = this.canvas.clientWidth;
  this.canvas.height = this.canvas.clientHeight;
  this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
};

App.prototype.registerEventHandlers = function() {
 // document.onkeydown = (event) => {
    //jshint unused:false
  //};
  //document.onkeyup = (event) => {
    //jshint unused:false
  //};
  this.canvas.onmousedown = (event) => {
    this.scene.camera.mouseDown(event);
    //jshint unused:false
  };
  this.canvas.onmousemove = (event) => {
    this.scene.camera.mouseMove(event);
    //jshint unused:false
    event.stopPropagation();
  };
  this.canvas.onmouseout = (event) => {
    //jshint unused:false
  };
  this.canvas.onmouseup = (event) => {
    this.scene.camera.mouseUp(event);
    //jshint unused:false
  };
  window.addEventListener('resize', () => this.resize() );
  window.requestAnimationFrame( () => this.update() );
};

// animation frame update
App.prototype.update = function() {

  const pendingResourceNames = Object.keys(this.gl.pendingResources);
  if (pendingResourceNames.length === 0) {
    // animate and draw scene
    this.scene.update(this.gl,this.keysPressed);
    this.overlay.innerHTML = "Ready.";
  } else {
    this.overlay.innerHTML = "Loading: " + pendingResourceNames;
  }

  // refresh
  window.requestAnimationFrame( () => this.update() );
};

// entry point from HTML
window.addEventListener('load', function() {
  const canvas = document.getElementById("canvas");
  const overlay = document.getElementById("overlay");

  const app = new App(canvas, overlay);
  app.registerEventHandlers();
});