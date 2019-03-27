var pixelation = 80,
    angulo = 0.50,
    movida1 = 0,
    movida2 = 0,
    cant_alfa = 0.7,
    laimagen = "imagen.jpg";

var timer;


$(document).ready(function() {

    canvas = document.getElementById('photo');
    canvas1 = document.getElementById('photo1');
    context = canvas.getContext('2d');
    context1 = canvas1.getContext('2d');

    $("#imgInp").change(function() {
        readURL(this); // read the path of the image for mosaic creation
        console.log("reading file...");
    });
});


function crear() {

    var img = new Image();

    img.src = $('#originalImg').attr('src');
    mult = 2;

    img.onload = function() { // after the image is loaded ....
        imgancho = (img.width * mult); // the extra space is to give extra room while skewing
        imgalto = img.height * mult; // height set	
        canvas.width = imgancho + 1800; // the extra space is to give extra room while skewing
        canvas.height = imgalto;
        canvas1.width = imgancho + 1800; // the extra space is to give extra room while skewing
        canvas1.height = imgalto;
        context.globalAlpha = cant_alfa;
        context1.globalAlpha = 1; // the background pixelated image needs to be with no pacity;

        context.drawImage(img, 0, 0, imgancho, imgalto);
        context1.drawImage(img, 0, 0, imgancho, imgalto);

        context.drawImage(img, imgancho, 0, imgancho, imgalto); // agrego la imagen a la par
        context1.drawImage(img, imgancho, 0, imgancho, imgalto); // agrego la imagen a la par

        pixelate(context, canvas.width, canvas.height, 0, 0);
        pixelate(context1, canvas1.width, canvas1.height, 0, 0);


        t = document.getElementById('te1');
        t1 = document.getElementById('te2');
        t.width = imgancho + 500;
        t.height = imgalto;
        t1.width = imgancho + 500;
        t1.height = imgalto;
        var ctx = t.getContext('2d');
        var ctx1 = t1.getContext('2d');

        ctx.setTransform(1, 0, angulo, 1, -pixelation, 0); // skew tje image
        ctx1.setTransform(1, 0, angulo * -1, 1, 0, 0); // skew tje image


        ctx1.drawImage(canvas1, 0, 0);
        ctx.drawImage(canvas, 0, 0);

        copiar();

        $("#canvasImg").removeClass("hidden");
        $("#canvasinfo").text($("#canvasImg")[0].naturalWidth + " x " + $("#canvasImg")[0].naturalHeight + "pixels");
    }
}

// ----------------------------------------------------------------------------------------------------------------

function copiar() {

    var can = document.getElementById('te1');
    var ctx = can.getContext('2d');

    var can2 = document.getElementById('te2');
    var ctx2 = can2.getContext('2d');

    // in memory canvas
    var can3 = document.createElement('canvas');
    can3.width = can.width; // tamano de la imagen final
    can3.height = can.height; // tamano de la imagen final

    var ctx3 = can3.getContext('2d');

    ctx3.drawImage(can2, movida2, 0);
    ctx3.drawImage(can, movida1, 0);

    var dataURL = can3.toDataURL(); // save canvas image as data url (png format by default)
    document.getElementById('canvasImg').src = dataURL; // set canvasImg image src to dataURL in order to be saved as an image
    document.getElementById('canvasImg').width = can3.width / 2;
    document.getElementById('canvasImg').height = can3.height / 2;
    can3 = null;
    ctx3 = null;
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

function cleanCanvas() { // changing the canvas size reset its contents
    var w = canvas.width;
    console.log("limpiar");
    canvas.width = 0;
    canvas.width = w;
    canvas1.width = 0;
    canvas1.width = w;
}

// ----------------------------------------------------------------------------------------------------------------

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#originalImg').attr('src', e.target.result);
            $("#originalImg").removeClass("hidden");
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// ----------------------------------------------------------------------------------------------------------------



var slider1 = document.getElementById("myRange1");
var output1 = document.getElementById("myRangeVal1");
output1.innerHTML = slider1.value; // Display the default slider value

// Update the current slider1 value (each time you drag the slider handle)
slider1.oninput = function() {
    output1.innerHTML = this.value;
    movida1 = this.value;
}


var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("myRangeVal2");
output2.innerHTML = slider2.value; // Display the default slider value

// Update the current slider2 value (each time you drag the slider handle)
slider2.oninput = function() {
    output2.innerHTML = this.value;
    movida2 = this.value;
}


var sliderSize = document.getElementById("myRangeSize");
var outputSize = document.getElementById("myRangeValSize");
outputSize.innerHTML = sliderSize.value; // Display the default slider value

// Update the current sliderSize value (each time you drag the slider handle)
sliderSize.oninput = function() {
    outputSize.innerHTML = this.value;
    pixelation = parseInt(this.value);
}