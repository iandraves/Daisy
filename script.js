//Ian Draves Copyright 2017 (C)

//Defining global variables
var rgbStr;
var drop = false;
var brwsimg = document.getElementById("brwsimg");
var canvas = document.getElementById("color");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height / 2;
ctx.font = "20px Arial";

//Function for image processing
function processImage(image) {
  var rgbval = document.getElementById("rgbval");
  var img = document.getElementById('image');
  var color = document.getElementById('color');
  var hidden = document.getElementById('hiddenstuff');

  //Unhiding elements
  img.className = 'unhiddenimg';
  hidden.className = 'unhidden';

  //Clearing the canvas and setting it's attributes
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';

  if (drop) {
    img.src = URL.createObjectURL(image);
    //Making sure the slected file is an image
    if (!image.name.match(/.(jpg|jpeg|png|gif)$/i)) {
      alertify.error("The selected file is not an image!");
      img.className = 'hidden';
      hidden.className = 'hidden';
      return;
    }
  } else
      img.src = image;

  img.onload = function() {
    var rgb = getAverageColor(img);
    rgbStr = rgb.r + ', ' + rgb.g + ', ' + rgb.b;
    color.style = "background-color: rgb(" + rgbStr + ");";
    color.className = 'unhidden';

    //Showing user RGB value
    var totalRGB = rgb.r + rgb.g + rgb.b;
    if (totalRGB >= 0 && totalRGB <= 225) { //Adjusting text color if color is dark
      ctx.fillStyle = 'white';
    }
    ctx.textAlign = "center";
    ctx.fillText("RGB Value: " + rgbStr, x, y);
    drop = false;
  };
}

//Function to get average rgb
function getAverageColor(img) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var width = canvas.width = img.naturalWidth;
  var height = canvas.height = img.naturalHeight;

  ctx.drawImage(img, 0, 0);

  var imageData = ctx.getImageData(0, 0, width, height);
  var data = imageData.data;
  var r = 0;
  var g = 0;
  var b = 0;

  for (var i = 0, l = data.length; i < l; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  r = Math.floor(r / (data.length / 4));
  g = Math.floor(g / (data.length / 4));
  b = Math.floor(b / (data.length / 4));

  return {
    r: r,
    g: g,
    b: b
  };
}

//When user hovers over page with image
document.ondragover = function(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
};

//When user drops image on page
document.ondrop = function(event) {
  event.preventDefault();
  var images = event.dataTransfer.files;
  for (var i = 0; i < images.length; i++) {
    drop = true;
    processImage(images[i]);
  }
};

brwsimg.onchange = function() {
  files = this.files;
  var binaryData = [];
  binaryData.push(files[0]);
  file = window.URL.createObjectURL(new Blob(binaryData, {
    type: "images/*"
  }))
  processImage(file);
}
