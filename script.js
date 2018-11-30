// https://jscompress.com/

// Check Chrome
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (!isChrome) {
    alert('Please be aware this site only officially supports Chrome on Desktop.\nFor best performance and reliability please use this site via Chrome.');
}

// Do the timer
var played = 0;
setInterval(function () {
    var d = new Date();
    var date = "";
    date += (d.getHours() > 12 ? d.getHours() - 12 : d.getHours());
    date += ":";
    date += (d.getMinutes().toString().length == 1 ? "0" + d.getMinutes() : d.getMinutes());
    date += ":";
    date += (d.getSeconds().toString().length == 1 ? "0" + d.getSeconds() : d.getSeconds());
    date += (d.getHours() > 12 ? " pm" : " am");
    document.getElementById("time").innerHTML = date;
    var time = d.getMinutes() % 5;
    if (time == 0 && d.getSeconds() <= 3) {
        if (played <= 1) {
            played += 1;
            var audio = document.createElement('audio');
            audio.style.display = "none";
            audio.src = 'ding.mp3';
            audio.volume = 1;
            audio.autoplay = true;
            audio.onended = function () {
                audio.remove()
            };
            document.body.appendChild(audio);
        }
        document.body.className = "change";
        document.getElementById("timeTill").innerHTML = "Change!";
    } else {
        document.body.className = "";
        played = 0;
        var secondsTill = (60 - d.getSeconds());
        secondsTill = (secondsTill.toString().length == 1 ? "0" + secondsTill : secondsTill);
        var timeTill = (4 - time) + ":" + secondsTill;
        document.getElementById("timeTill").innerHTML = timeTill + " remaining";
    }
}, 100); //0.1s
