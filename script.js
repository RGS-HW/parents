/**
 *  parents: The timer projected for Parents’ Evenings in the main hall.
 *  <https://github.com/rgshw/parents/>
 *  Copyright (C) 2018 Matt Cowley (MattIPv4) (me@mattcowley.co.uk)
 *
 *  This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Affero General Public License as published
 *   by the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *  This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *  You should have received a copy of the GNU Affero General Public License
 *   along with this program. If not, please see
 *   <https://github.com/rgshw/parents/blob/master/LICENSE> or <http://www.gnu.org/licenses/>.
 **/
/* https://jscompress.com/ */

// Handle no audio request
function getParams(lowercase) {
    var params = {};
    if (location.search) {
        var parts = location.search.substring(1).split('&');

        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            if (!nv[0]) continue;
            if (lowercase) nv[0] = String(nv[0]).toLowerCase();
            params[nv[0]] = nv[1] || true;
        }
    }
    return params;
}

var urlParams = getParams(true);
var noAudio = (urlParams && urlParams.hasOwnProperty('noaudio'));

// Do the timer
var played = 0;

function timer() {
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
            if (!noAudio) document.getElementById("ding").play();
        }
        document.documentElement.className = "change";
        document.getElementById("timeTill").innerHTML = "Change!";
    } else {
        document.documentElement.className = "";
        played = 0;
        var secondsTill = (60 - d.getSeconds());
        secondsTill = (secondsTill.toString().length == 1 ? "0" + secondsTill : secondsTill);
        var timeTill = (4 - time) + ":" + secondsTill;
        document.getElementById("timeTill").innerHTML = timeTill + " remaining";
    }
    setTimeout(timer, 100); //0.1s
}


// Start the timer (user interact for audio)
if (noAudio) {
    timer();
} else {
    var a = document.createElement("a");
    a.onclick = function () {
        a.parentElement.removeChild(a);
        timer();
    };
    a.style.zIndex = "10000";
    a.style.position = "absolute";
    a.style.width = "100%";
    a.style.height = "100%";
    a.style.top = "0px";
    a.style.left = "0px";
    a.style.display = "flex";
    a.style.alignItems = "center";
    a.style.justifyContent = "center";
    a.style.background = "rgba(255, 255, 255, 0.5)";
    var span = document.createElement("span");
    span.innerText = "Please click on the page to start the Parents' Evening Timer.";
    a.appendChild(span);
    document.body.insertBefore(a, document.body.firstChild);
}
