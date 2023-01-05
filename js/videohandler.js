window.onload = onLoad



function onLoad() {
    const video = document.getElementById("webcam");
    

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log("Access to camera granted")
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(function (stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        });
    }

     // Trigger photo take
    document.getElementById("photo-button").addEventListener("click", function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;

        ctx.drawImage(video, 0, 0);


        const dataURL = canvas.toDataURL("image/png");
        localStorage.setItem("imgData", dataURL);
        window.location.href = "/html/editor.html";
    });
    
};