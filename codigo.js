var pixelation = 40,
	angulo = 0.50,
	movida1 = 0,
	movida2 = -0,
	cant_alfa = 0.7,
	largo_extra= 600,
	laimagen = "imagen2.jpg";




$(document).ready(function(){
canvas = document.getElementById('photo');
canvas1 = document.getElementById('photo1');
context = canvas.getContext('2d');
context1 = canvas1.getContext('2d');

   $("#imgInp").change(function(){
        readURL(this);
    });

	
});





function crear() {
	var img = new Image();
	//alert ('creando');
	//img.crossOrigin = "use-credentials";
	img.src = laimagen;   //// aca quede
	mult = 2;
	img.onload = function () {   //luego de que la imagen se cargo....
		imgancho = (img.width * mult)+largo_extra;	// el ancho de la imagen grande mas el extra para la inclinacion
		imgalto = img.height * mult;			// tengo el alto	
		canvas.width = imgancho+800;   // el adicional es para la segunda copia de la imagen para que no queden espacios en blanco
		canvas.height = imgalto;
		canvas1.width = imgancho+800; // el adicional es para la segunda copia de la imagen para que no queden espacios en blanco
		canvas1.height = imgalto;
		context.globalAlpha = cant_alfa;
		context1.globalAlpha = cant_alfa;
		
		context.drawImage(img, 0, 0, imgancho, imgalto);
		context1.drawImage(img, 0, 0, imgancho, imgalto);

		context.drawImage(img, imgancho, 0, imgancho, imgalto);  // agrego la imagen a la par
		context1.drawImage(img, imgancho, 0, imgancho, imgalto); // agrego la imagen a la par

		

		console.log(canvas.width);
		
		
		
		var imageData = canvas.toDataURL();
		var imageData2 = context1.getImageData(0,0, canvas1.width, canvas1.height);
		
		
		pixelate(context, canvas.width, canvas.height, 0, 0);
		pixelate(context1, canvas1.width, canvas1.height, 0, 0);
		
		
		
		t = document.getElementById('te1');
		t1 = document.getElementById('te2');
		t.width = imgancho+500;// total_ancho+largo_extra;
		t.height = imgalto;
		t1.width = imgancho+500;// total_ancho+largo_extra;
		t1.height = imgalto;
		var ctx = t.getContext('2d');
		var ctx1 = t1.getContext('2d');
		
		ctx.setTransform(1, 0, angulo, 1, -pixelation*13, 0); // esto hace que el skew de la imagen
		//ctx.setTransform(1, 0, angulo, 1, 0, 0); // esto hace que el skew de la imagen
		
		ctx1.setTransform(1, 0, angulo * -1, 1, 0, 0); // esto hace que el skew de la imagen
		
		//ctx1.drawImage(canvas1, imgancho, 0);
		ctx1.drawImage(canvas1, 0, 0);
		ctx.drawImage(canvas, 0, 0);
		
		//ctx.drawImage(canvas, imgancho+1, 0);
		//ctx.drawImage(canvas, -imgancho, 0);




copiar();



 
















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










 jQuery(function($){

    var jcrop_api;

    $('#canvasImgg').Jcrop({
      bgOpacity: 0.5,
      bgColor: 'white',
      addClass: 'jcrop-light',
	  allowResize: true,
	  allowMove: true,
      onChange:   showCoords,
      onSelect:   showCoords,
      onRelease:  clearCoords
    },function(){
      jcrop_api = this;
	  jcrop_api.animateTo([100,100,400,300]);
	  jcrop_api.ui.selection.addClass('jcrop-selection');
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


































// ----------------------------------------------------------------------------------------------------------------

function copiar(){

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

	var dataURL = can3.toDataURL(); // save canvas image as data url (png format by default)
    document.getElementById('canvasImg').src = dataURL; // set canvasImg image src to dataURL in order to be saved as an image
	  document.getElementById('canvasImg').width= can3.width/2;
	  	  document.getElementById('canvasImg').height = can3.height/2;
	  can3=null;
	  ctx3=null;

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
	ctx.drawImage(img, x * 2, y * 2, w * 2, h * 2, 0, 0, w * 2, h * 2);
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

function limpiar() { // cambiar la medida del canvas resetea el canvas
	var w = canvas.width;
	canvas.width = 0;
	canvas.width = w;
	canvas1.width = 0;
	canvas1.width = w;
}

// ----------------------------------------------------------------------------------------------------------------

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#canvasImg').attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}
 
 
 
function redimensione() { 

$("canvasImg").width= "300px";
$("canvasImg").height= "300px";

}
 