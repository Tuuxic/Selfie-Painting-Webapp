window.onload = init;
window.onresize = resizeCanvas;

function init() {
    
    playSnapSound();
    var takenPicture = localStorage.getItem("imgData");
    drawImageOnCanvas(takenPicture);
    drawOnCanvas();
}

function playSnapSound() {
    // Only play sound when sound when "playSound" is set
    if (localStorage.getItem("playSound") != null) {
        const audio = new Audio("/assets/snap.mp3");
        audio.play()
        localStorage.removeItem("playSound")
    }

}

function drawImageOnCanvas(imgURL) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

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

        ctx.drawImage(img, 0, 0, img.naturalWidth * ratio, img.naturalHeight * ratio);
    };
}

function drawOnCanvas() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var slider = document.getElementById("size-slider");
    var colorpicker = document.getElementById("colorpicker");

    var size = slider.value;
    var color = colorpicker.value;
    var isDrawing = false;

    colorpicker.addEventListener("change", (e) => {
        if (e.target.value != null) {
            color = e.target.value;
        }
    });

    slider.addEventListener("change", (e) => {
        if (e.target.value != null) {
            size = e.target.value;
        }
    })

    const borderSize = 1;

    canvas.onmousedown = (e) => {
        isDrawing = true;
        ctx.beginPath();
        ctx.lineWidth = size;
        ctx.strokeStyle = color;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        // You cave to subtract the size of the border (in our case 1) to correctly draw on the canvas
        ctx.moveTo(e.clientX - canvas.offsetLeft - borderSize, e.clientY - canvas.offsetTop - borderSize);

    }


    canvas.onmousemove = (e) => {
        if (isDrawing) {
            ctx.lineWidth = size;
            ctx.strokeStyle = color;
            // You cave to subtract the size of the border (in our case 1) to correctly draw on the canvas
            ctx.lineTo(e.clientX - canvas.offsetLeft - borderSize, e.clientY - canvas.offsetTop - borderSize);
            ctx.stroke();
        }
    };

    canvas.onmouseup = () => {
        isDrawing = false;
        ctx.closePath();
    };


}

function openNav() {
    document.getElementById("rightSidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("rightSidenav").style.width = "0";
}

function saveImage() {
    var canvas = document.getElementById("canvas");
    var image = canvas.toDataURL("image/png");
    const downloader = document.createElement('a');
    downloader.href = image;
    downloader.download = "EditedPicture";
    downloader.click();
    downloader.remove();
}

function clearCanvas() {
    drawImageOnCanvas(localStorage.getItem("imgData"));
}

function resizeCanvas() {
    drawImageOnCanvas(canvas.toDataURL("image/png"));
}