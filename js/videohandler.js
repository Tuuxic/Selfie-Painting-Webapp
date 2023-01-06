window.onload = onLoad

const BLANK_IMAGE = new Image;
BLANK_IMAGE.src = "/assets/blank.jpg";

var video_enabled = false;

function onLoad() {
    const video = document.getElementById("webcam");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(function (stream) {

            // Horizontally flip video
            video.style.cssText = "-moz-transform: scale(-1, 1); \
            -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
            transform: scale(-1, 1); filter: FlipH;";

            video.srcObject = stream;
            video.play();
            video_enabled = true;
        }).catch(() => {
            video_enabled = false;
        });
    }

    // Trigger photo take
    document.getElementById("photo-button").addEventListener("click", function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (video_enabled) {
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;

            // Horizontally flip video
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);

            ctx.drawImage(video, 0, 0);
        } else {
            canvas.height = BLANK_IMAGE.naturalHeight;
            canvas.width = BLANK_IMAGE.naturalWidth;
            ctx.drawImage(BLANK_IMAGE, 0, 0);
        }


        const dataURL = canvas.toDataURL("image/png");
        localStorage.setItem("imgData", dataURL);
        // Set playSound to play a snap sound after redirection to editor.html
        localStorage.setItem("playSound", "")
        window.location.href = "/html/editor.html";

    });

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;
    var yDown = null;
    const THRESHOLD = 100;
    var currFacingMode = "user";

    function handleTouchStart(e) {
        const firstTouch = e.touches[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    function handleTouchMove(e) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (Math.abs(xDiff) <= THRESHOLD) {
                return;
            }

            var newFacingMode = currFacingMode;

            if (currFacingMode === "user") {
                newFacingMode = "environment";
            } else {
                newFacingMode = "user";
            }

            const constraints = {
                video: {
                    facingMode: newFacingMode
                }
            }

            const success = turnVideo(constraints, video)

            if (success) {
                currFacingMode = newFacingMode;
            }


            xDown = null;
            yDown = null;
        };


    };

}


function turnVideo(constraints, video) {
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            if (constraints.video.facingMode === "user") {
                video.style.cssText = "-moz-transform: scale(-1, 1); \
                    -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
                    transform: scale(-1, 1); filter: FlipH;";
            }

            video.srcObject = stream
            video.play()
            return true
        }).catch(() => {
            return false
        });

}