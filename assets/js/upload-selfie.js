$(document).ready(function () {
    $("button[name=submit_upload_selfie]").click(function () {
        if ($("input[name=selfie]").val() == "") {
            $("#video").addClass("camera_err");
            return false;
        } else {
            // Disable the submit button.
            $('#submit_upload_selfie').prop('disabled', true);
            $('#uploadSelfieForm').submit();
        }
    });
});

(function () {
    var width = 200;
    var height = 0;
    var streaming = false;
    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo1');
        startbutton = document.getElementById('startbutton');

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
            })

        video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);
                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function (ev) {

            takepicture();
            ev.preventDefault();
            document.getElementById("photo1").style.display = "block";
        }, false);

        clearphoto();
    }

    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function takepicture() {
        var context = canvas.getContext('2d');
        var hitme = document.getElementById("outside");
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        } else {
            clearphoto();
        }
    }
    window.addEventListener("load", function () {
        startup();
    });
    document.getElementById("myBtn").addEventListener("click", function () {
        startup();
        document.getElementById("display").style.display = "none";
    });
    document.getElementById("myBtn2").addEventListener("click", function () {
        startup();
        document.getElementById("display").style.display = "none";
        document.getElementById("myBtn2").style.display = "none";
        document.getElementById("uploadSelfie").value = "";
    });

    document.getElementById("startbutton").addEventListener("click", function () {
        takepicture();
        document.getElementById("display").style.display = "block";
        document.getElementById("myBtn2").style.display = "block";
        document.getElementById("uploadSelfie").value = document.getElementById("photo1").src;
    });

})();