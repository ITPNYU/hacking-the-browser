/* global PIXI */
console.log('Animated Browser Action Background Script version 1');

chrome.browserAction.onClicked.addListener(function() {
  console.log('clicked browser action', arguments);

  // This is added by the `renderPixi` function below
  var canvas = document.getElementById('pixi-canvas');
  var canvasContext = canvas.getContext('2d');

  // For i from 0 to 10, rotate the icon that amount and update the
  // browser action's icon
  for (var i = 0; i < 11; i++) {
    setTimeout((function(i) {
      // Because JavaScript's scoping rules are weird, you have to
      // create a new function inside a function in the setTimeout
      return function() {
        var percent = i / 10;
        rotateItem(item, percent);
        var imageData = canvasContext.getImageData(0, 0, 19, 19);
        chrome.browserAction.setIcon({imageData: imageData});
      };
    })(i), i*50);
  }
});

// This will render the initial pixi scene when the document loads
document.addEventListener('DOMContentLoaded', function() {
  renderPixi();
});

var renderer, stage, item;

function rotateItem(item, percent) {
  // Pixi.js rotation is in radians, so convert percent to a percentage of
  // a full circle (2*PI radians)
  item.rotation = percent * Math.PI * 2;
  renderer.render(stage);
}

function renderPixi() {
  console.log('renderPixi!');

  // Set up the renderer
  renderer = new PIXI.CanvasRenderer(19, 19,{backgroundColor : 0xFFFFFF});
  renderer.view.id = 'pixi-canvas';
  document.body.appendChild(renderer.view);

  // create the root of the scene graph
  stage = new PIXI.Container();

  // create a texture from an image path
  var texture = PIXI.Texture.fromImage('rose-19x19.png');

  // create a new Sprite using the texture
  item = new PIXI.Sprite(texture);

  // center the sprite's anchor point
  item.anchor.x = 0.5;
  item.anchor.y = 0.5;

  // move the sprite to the center of the screen
  item.position.x = 19/2;
  item.position.y = 19/2;

  stage.addChild(item);

  renderer.render(stage);
}
