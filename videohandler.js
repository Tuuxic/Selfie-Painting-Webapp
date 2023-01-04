
window.onload = onLoad

var flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false,
        color = "#000000",
        video_width = 0, 
        video_height = 0;


function onLoad() {
    var colorPicker = document.getElementById("colorpicker");
    var video = document.getElementById("webcam");
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d")

    context.canvas.width = window.innerWidth - 0.2 * window.innerWidth;
    context.canvas.height = window.innerHeight - 0.2 * window.innerHeight;
    


    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log("Access to camera granted") 
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });

    // Trigger photo take
    document.getElementById("photo-button").addEventListener("click", function() {
        var hRatio = context.canvas.width / video_width  ;
        var vRatio = context.canvas.height / video_height;
        var ratio  = Math.min ( hRatio, vRatio );
        context.canvas.width = video_width*ratio;
        context.canvas.height = video_height*ratio;

        context.drawImage(video, 0, 0, video_width*ratio, video_height*ratio);
    });
    video.addEventListener( "loadedmetadata", function (e) {
            video_width = this.videoWidth,
            video_height = this.videoHeight;
            console.log("Width: " + video_width + " Height: " + video_height)
    }, false );

    console.log("Width: " + video_width + " Height: " + video_height)

    document.addEventListener("input", function (e) {
        color = e.target.value;
    }, false);

    document.addEventListener("change", function (e) {

    }, false);
    /*
    canvas.addEventListener("click", function(e) {
        var canvLeft = canvas.offsetLeft + canvas.clientLeft;
        var canvTop = canvas.offsetTop + canvas.clientTop;
        var x = e.pageX - canvLeft;
        var y = e.pageY - canvTop;
        context.fillRect(x, y, 10, 10);

    }, false);
    */

    canvas.addEventListener("mousemove", function (e) {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                draw(context);
            }
        
    }, false);


    canvas.addEventListener("mousedown", function (e) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            context.beginPath();
            context.fillStyle = "black";
            context.fillRect(currX, currY, 2, 2);
            context.closePath();
            dot_flag = false;
        }
    }, false);


    canvas.addEventListener("mouseup", function (e) {
        flag = false;
    }, false);


    canvas.addEventListener("mouseout", function (e) {
        flag = false;
    }, false);
}
    
};


function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

function draw(context) {
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(currX, currY);
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.stroke();
    context.closePath();
}