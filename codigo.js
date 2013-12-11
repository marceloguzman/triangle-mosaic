

var pixelation = 40,
	angulo = 0.50,
	movida1 = 0,
	movida2 = -0,
	cant_alfa = 0.5,
	laimagen = "imagen.jpg";




$(document).ready(function(){
canvas = document.getElementById('photo');
canvas1 = document.getElementById('photo1');
context = canvas.getContext('2d');
context1 = canvas1.getContext('2d');
});





function crear() {
	var img = new Image();
	//img.crossOrigin = "use-credentials";
	img.src = laimagen;
	mult = 2;
	img.onload = function () {
		imgancho = img.width;
		imgalto = img.height;

		total_ancho = (imgancho * mult)+300;
		canvas.width = total_ancho;
		canvas.height = imgalto * mult;
		canvas1.width = total_ancho;
		canvas1.height = imgalto * mult;
		context.globalAlpha = cant_alfa;
		context1.globalAlpha = cant_alfa;
		context.drawImage(img, 0, 0, total_ancho, imgalto * mult);
		context1.drawImage(img, 0, 0, total_ancho, imgalto * mult);



		/*
context.setTransform(1,0,angulo,1,0,0);  // esto hace que el skew de la imagen
context1.setTransform(1,0,angulo*-1,1,0,0);  // esto hace que el skew de la imagen
*/
		/*
var t = document.createElement('canvas');
var t1 = document.createElement('canvas');

var ctx = t.getContext('2d');
var ctx1 = t1.getContext('2d');


t1.width = imgancho*mult;
t1.height = imgalto*mult;
t.width = imgancho*mult;
t.height = imgalto*mult;

*/
		console.log(canvas.width);
		pixelate(context, canvas.width, canvas.height, 0, 0);
		pixelate(context1, canvas1.width, canvas1.height, 0, 0);
		t = document.getElementById('te1');
		t1 = document.getElementById('te2');
		t.width = total_ancho+500;
		t.height = imgalto * mult;
		t1.width = total_ancho+500;
		t1.height = imgalto * mult;
		var ctx = t.getContext('2d');
		var ctx1 = t1.getContext('2d');
		ctx.setTransform(1, 0, angulo, 1, -100, 0); // esto hace que el skew de la imagen
		ctx1.setTransform(1, 0, angulo * -1, 1, -100, 0); // esto hace que el skew de la imagen
		ctx1.drawImage(canvas1, 0, 0);
		ctx.drawImage(canvas, 0, 0);





copiar();



/*
  jQuery(function($){

    var jcrop_api;

    $('#canvasImg').Jcrop({
      onChange:   showCoords,
      onSelect:   showCoords,
      onRelease:  clearCoords
    },function(){
      jcrop_api = this;
    });

    $('#coords').on('change','input',function(e){
      var x1 = $('#x1').val(),
          x2 = $('#x2').val(),
          y1 = $('#y1').val(),
          y2 = $('#y2').val();
      jcrop_api.setSelect([x1,y1,x2,y2]);
    });

  });

  // Simple event handler, called from onChange and onSelect
  // event handlers, as per the Jcrop invocation above
  function showCoords(c)
  {
    $('#x1').val(c.x);
    $('#y1').val(c.y);
    $('#x2').val(c.x2);
    $('#y2').val(c.y2);
    $('#w').val(c.w);
    $('#h').val(c.h);
  };

  function clearCoords()
  {
    $('#coords input').val('');
  };



*/


















		/*
context1.drawImage(t1,0,0);
context.drawImage(t,0,0);

*/
		/*
t = context.getImageData(0,0, canvas1.width, canvas1.height);
t1 = context1.getImageData(0,0, canvas1.width, canvas1.height);

t.setTransform(1,0,angulo,1,0,0);  // esto hace que el skew de la imagen
t1.setTransform(1,0,angulo*-1,1,0,0);  // esto hace que el skew de la imagen


context.putImageData(t,0,0); 
context1.putImageData(t1,0,0); 
*/
		/*
ctx1.drawImage(t1,0,0);
ctx.drawImage(t,0,0);
*/
		/*
context.drawImage(canvas, 0, 0,imgancho*mult, imgalto*mult);
context1.drawImage(canvas1, 0, 0,imgancho*mult, imgalto*mult);
*/
	}
}

// ----------------------------------------------------------------------------------------------------------------

function copiar(){


console.log("copiando");

var can = document.getElementById('te1');
var ctx = can.getContext('2d');

var can2 = document.getElementById('te2');
var ctx2 = can2.getContext('2d');

// in memory canvas
var can3 = document.createElement('canvas');
can3.width = can.width;  // tamano de la imagen final
can3.height = can.height;  // tamano de la imagen final

var ctx3 = can3.getContext('2d');

    ctx3.drawImage(can2, movida2, 0);
	ctx3.drawImage(can, movida1, 0);
	
   // ctx3.drawImage(can2, 0, 0);
	//ctx3.drawImage(can, 0, 0);
	
    //ctx.drawImage(can3, 0, 0); // draw the image combined
    
	var dataURL = can3.toDataURL(); // save canvas image as data url (png format by default)
    document.getElementById('canvasImg').src = dataURL; // set canvasImg image src to dataURL in order to be saved as an image
	  document.getElementById('canvasImg').width= can3.width/2;
	  	  document.getElementById('canvasImg').height = can3.height/2;
	  can3=null;
	  ctx3=null;

}



// ----------------------------------------------------------------------------------------------------------------

function recorte() {
	crop($('#x1').val(), $('#y1').val(), $('#w').val(), $('#h').val());
}

// ----------------------------------------------------------------------------------------------------------------

function crop(x, y, w, h) {
	var canvas = document.getElementById("canvas01");
	var ctx = canvas.getContext("2d");
	var img = document.getElementById("canvasImg");
	canvas.width = w * 2;
	canvas.height = h * 2;
	// this takes a 105x105px crop from img at x=149/y=4
	// and copies that crop to the canvas
	ctx.drawImage(img, x * 2, y * 2, w * 2, h * 2, 0, 0, w * 2, h * 2);
	// this uses the canvas as the src for the cropped img element
	document.getElementById("canvasImg2").src = canvas.toDataURL();
}

// ----------------------------------------------------------------------------------------------------------------

function pixelate(context, srcWidth, srcHeight, xPos, yPos) {
	var sourceX = xPos,
		sourceY = yPos;



		imageData = context.getImageData(sourceX, sourceY, srcWidth, srcHeight);
		data = imageData.data;


	for (var y = 0; y < srcHeight; y += pixelation) {
		for (var x = 0; x < srcWidth; x += pixelation) {
			var red = data[((srcWidth * y) + x) * 4],
				green = data[((srcWidth * y) + x) * 4 + 1],
				blue = data[((srcWidth * y) + x) * 4 + 2];
			for (var n = 0; n < pixelation; n++) {
				for (var m = 0; m < pixelation; m++) {
					if (x + m < srcWidth) {
						data[((srcWidth * (y + n)) + (x + m)) * 4] = red;
						data[((srcWidth * (y + n)) + (x + m)) * 4 + 1] = green;
						data[((srcWidth * (y + n)) + (x + m)) * 4 + 2] = blue;
					}
				}
			}
		}
	}
	context.putImageData(imageData, xPos, yPos); // overwrite original image
}

// ----------------------------------------------------------------------------------------------------------------

function config(estado) {
	if (estado == 'd1me') {
		movida1 -= 10;
		copiar();
	}
	if (estado == 'd1ma') {
		movida1 += 10;
		copiar();
	}
	if (estado == 'd2me') {
		movida2 -= 10;
		copiar();
	}
	if (estado == 'd2ma') {
		movida2 += 10;
		copiar();
	}
	if (estado == 'tame') {
		pixelation--;
		limpiar();
	}
	if (estado == 'tama') {
		pixelation++;
		limpiar();
	}
	console.log("pixelation: " + pixelation);
	console.log("m1: " + movida1);
	console.log("m2: " + movida2);
}


// ----------------------------------------------------------------------------------------------------------------

function limpiar() {
	// cambiar la medida del canvas resetea el canvas
	var w = canvas.width;
	canvas.width = 0;
	canvas.width = w;
	canvas1.width = 0;
	canvas1.width = w;
//	document.getElementById('canvasImg').src = null;
}