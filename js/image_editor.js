window.onload = init;
const audio = new Audio("/assets/snap.mp3");
audio.play()

function init() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var imgURL = localStorage.getItem("imgData");
    var img = new Image;
    img.src = imgURL;

    // Set image as canvas background to edit
    img.onload = function () {
        canvas.height = window.innerHeight - 0.25 * window.innerHeight;
        canvas.width = window.innerWidth;

        var hRatio = canvas.width / img.naturalWidth;
        var vRatio = canvas.height / img.naturalHeight;
        var ratio = Math.min(hRatio, vRatio);
        canvas.width = img.naturalWidth * ratio;
        canvas.height = img.naturalHeight * ratio;

        //canvas.height = window.innerHeight;
        //canvas.width = window.innerWidth;

        ctx.drawImage(img, 0, 0, img.naturalWidth * ratio, img.naturalHeight * ratio);
    };
}

function openNav() {
    document.getElementById("rightSidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("rightSidenav").style.width = "0";
}



/*
var flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false,
    color = "#000000",
    video_width = 0,
    video_height = 0;


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
*/