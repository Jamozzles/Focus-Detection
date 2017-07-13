window.onload = function() {
  function drawImage(imgObj) {
    //Creates Canvas
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');

    //Image diensions and position
    var imageY = 0;
    var imageX = 0;
    var imageHeight = imgObj.height;
    var imageWidth = imgObj.width;

    //?
    var image =  [];
    var values =  [];

    var valueImage = [];
    var imgData = context.createImageData(imageWidth, imageHeight);

    var count = 0;

    //Draws image to canvas
    context.drawImage(imgObj, imageX, imageY);

    //Gets data from the images
    var imageData = context.getImageData(imageX, imageY, imageWidth, imageHeight);

    //Indexs for each color in image data array
    var iterations = 0;
    var red = 0;
    var green = 1
    var blue = 2;

    //Creates array with data for each pixel in the image
    CreateValuesArray();

    //Gets data of surrounding pizels for each pixel
    for (var h = 0; h < imageHeight; h++) {
      for (var w = 0; w < imageWidth; w++) {
        var surrounding = GetSurroundingElements(values, h, w);
        var min = Math.min.apply(Math, surrounding);
        var max = Math.max.apply(Math, surrounding);
        var range = max - min;
        valueImage.push(range);
        console.log(range);
        /*for (var i = 0; i < surrounding.length; i++) {
          console.log(surrounding[i]);
        }*/
      }
    }

    //Creates values array
    function CreateValuesArray() {
      for (var h = 0; h < imageHeight; h++) {
        for (var w = 0; w < imageWidth; w++) {
          if(!values[h]) {
            values[h] = [];
          }

          var r = imageData.data[iterations];
          var g = imageData.data[iterations+1];
          var b = imageData.data[iterations+2];

          values[h][w] = Math.max(r, g, b);
          ///console.log("value: " + values[h][w]);

          //RGBtoHSV(image[h][w].red, image[h][w].green, image[h][w].blue);
          //console.log(imageData.data[iterations]);
          iterations = iterations + 4;
        }
      }
       ///console.log(values);
    }

    function GetSurroundingElements(array, h, w) {
      //console.log();
      //if(h > 1 && w > 1 & h < imageHeight && w < imageWidth) {

      if(h > 1 && w > 1 & h < imageHeight-1 && w < imageWidth-1) {
        //var pixels = {TL:array[h-1][w-1], TM:array[h-1][w], TR:array[h-1][w+1], ML:array[h][w-1], MM:array[h][w], MR:array[h-1][w+1], BL: array[h+1][w-1], BM: array[h+1][w], BR: array[h+1][w+1]};
        //var pixels = [array[h-1][w-1], array[h-1][w], array[h-1][w+1], array[h][w-1], array[h][w], array[h-1][w+1]/*, array[h+1][w-1], array[h+1][w], array[h+1][w+1]*/];
        var pixels = [array[h-1][w-1], array[h-1][w], array[h-1][w+1], array[h][w-1], array[h][w], array[h][w+1], array[h+1][w-1], array[h+1][w], array[h+1][w+1]];
        return(pixels);
        count++;
        //console.log("Bottom Left " +  pixels.BL);
      }
      //else {
        //return(false);
      //}
      ///console.log(count);
    }

    function RGBtoHSV(r, g, b) {
      return(Math.max(r, g, b));
      //console.log(Math.max(r, g, b));
    }

    /*var j = 0;
    for (i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i+0] = valueImage[j];
      imgData.data[i+1] = valueImage[j];
      imgData.data[i+2] = valueImage[j];
      imgData.data[i+3] = 255;
      j++
    }*/

    var i;
    var j = 0;
    for (i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i+0] = valueImage[j];
        imgData.data[i+1] = 0;
        imgData.data[i+2] = 0;
        imgData.data[i+3] = 255;
        j++;
    }

    context.putImageData(imgData, 300, 0);
  }

  var imgObj = new Image();
  imgObj.onload = function() {
    drawImage(this);
  }

  imgObj.crossOrigin = "Anonymous";
  //Out of focus
  //imgObj.src = "https://at-cdn-s01.audiotool.com/2012/09/15/documents/out_of_focus-cb0mrP/1/cover256x256-9be4911d157b4800974807166928781a.jpg";

  //Noise
  //imgObj.src = "noise2d.gif";

  //Mixed
  //imgObj.src = "Mixed.jpg";

  //DSLR
  imgObj.src = "Max.jpg";
}
