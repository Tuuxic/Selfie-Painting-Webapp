window.onload = init;
window.onresize = resizeCanvas;


const CANVAS_IMAGE_TOKEN = "imgData";
const PLAY_AUDIO_FLAG = "playSound";
const SNAP_SOUND_PATH = "/assets/snap.mp3";

function init() {
    
    playSnapSound();
    var takenPicture = localStorage.getItem(CANVAS_IMAGE_TOKEN);
    drawImageOnCanvas(takenPicture);
    drawOnCanvas();

}

function playSnapSound() {
    // Only play sound when sound when "playSound" is set
    if (localStorage.getItem(PLAY_AUDIO_FLAG) != null) {
        const audio = new Audio(SNAP_SOUND_PATH);
        audio.play()
        localStorage.removeItem(PLAY_AUDIO_FLAG)
    }

}

function drawImageOnCanvas(imgURL) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var img = new Image;
    img.src = imgURL;

    // Set image as canvas background to edit
    img.onload = function () {
        const heightScale = 0.25;
        const widthScale = 0.1;
        canvas.height = window.innerHeight - heightScale * window.innerHeight;
        canvas.width = window.innerWidth - widthScale * window.innerWidth;

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


    // Setup of pencil tools:

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


    // Bordersize of canvas element
    const borderSize = 1;

    
    const drawStart = (e) => {
        const topScroll = document.documentElement.scrollTop
        isDrawing = true;
        ctx.beginPath();
        ctx.lineWidth = size;
        ctx.strokeStyle = color;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        // You cave to subtract the size of the border (in our case 1) and scrollposition to correctly draw on the canvas
        newXPos = e.clientX - canvas.offsetLeft - borderSize;
        newYPos = e.clientY - canvas.offsetTop - borderSize + topScroll;
        
        ctx.moveTo(newXPos, newYPos);

    }

    const drawMove = (e) => {
        const topScroll = document.documentElement.scrollTop
        if (isDrawing) {
            ctx.lineWidth = size;
            ctx.strokeStyle = color;

            // You cave to subtract the size of the border (in our case 1)  and scrollposition to correctly draw on the canvas
            newXPos = e.clientX - canvas.offsetLeft - borderSize;
            newYPos = e.clientY - canvas.offsetTop - borderSize + topScroll;
            
            ctx.lineTo(newXPos, newYPos);
            ctx.stroke();
        }
    };

    const drawEnd = () => {
        isDrawing = false;
        ctx.closePath();
    };

    // Mouse and Touch Event Handling:

    canvas.onmousedown = drawStart;
    canvas.addEventListener("touchstart", (e) => {
        e.preventDefault();
        if (e.touches.size > 1) {
            drawEnd();
            return;
        }
        drawStart(e.touches[0]);
    }, { passive: false } );

    canvas.onmousemove = drawMove;
    canvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        if (e.touches.size > 1) {
            drawEnd();
            return;
        }
        drawMove(e.touches[0]);
    }, { passive: false } );

    canvas.onmouseup = drawEnd;
    canvas.addEventListener("touchend", (e) => {
        e.preventDefault();
        drawEnd();
    }, { passive: false } );
    

}

function saveImage() {
    var canvas = document.getElementById("canvas");
    var image = canvas.toDataURL("image/png");

    // Create downloader element to download image file from canvas
    const downloader = document.createElement('a');
    downloader.href = image;
    downloader.download = "EditedPicture";
    downloader.click();
    downloader.remove();
}

function clearCanvas() {
    drawImageOnCanvas(localStorage.getItem(CANVAS_IMAGE_TOKEN));
}

function resizeCanvas() {
    drawImageOnCanvas(canvas.toDataURL("image/png"));
}