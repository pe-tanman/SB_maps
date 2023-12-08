var marker = '';
var simulationMarker;
var map = L.map('map');
var latLng = [34.69996700000007, 138.9754790000003];
var altitude = 0;
var time = 0;
var fallTime = 0;
const horizontalMeterPerSec = 5;//水平方向の秒速
const moveUpMeterPerSec = 4;//鉛直方向の秒速
const landingMeterPerSec = 1.8;
const goalAltitude = 35000;
const parachuteOpenAltitude = 500;
const latitudePerSec = horizontalMeterPerSec * 360 / 4 / 10 ** 7 * 0.3;//一秒間に進む緯度
const longtitudePerSec = horizontalMeterPerSec * 360 / 4 / 10 ** 7 * 0.7;//経度

const simulatedLandingLatLng = [latLng[0] + latitudePerSec * (goalAltitude / moveUpMeterPerSec + Math.sqrt(2 * (goalAltitude - parachuteOpenAltitude) / 9.8) + parachuteOpenAltitude / landingMeterPerSec),
latLng[1] + longtitudePerSec * (goalAltitude / moveUpMeterPerSec + Math.sqrt(2 * (goalAltitude - parachuteOpenAltitude) / 9.8) + parachuteOpenAltitude / landingMeterPerSec),];

const altitudeText = document.querySelector("#altitude");
const timerText = document.querySelector("#timer");
const chaseCheckbox = document.querySelector("#chaseCheckbox");

var interval_fall;
var interval_landing;

var doChase = false;


//地理院タイルを使用
L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
}).addTo(map);
map.setView(latLng, 14);




function moveUp() {
    latLng[0] += latitudePerSec;
    latLng[1] += longtitudePerSec;
    altitude += moveUpMeterPerSec - Math.random() + 0.5;
    update(latLng);
    time++;
    //落下開始
    if (goalAltitude < altitude) {
        window.alert("落下開始");
        clearInterval(interval_rise);
        interval_fall = setInterval(fall, 1000);
    }
}

function fall() {
    latLng[0] += latitudePerSec;
    latLng[1] += longtitudePerSec;
    altitude -= 9.8 * fallTime;
    update(latLng);
    time++;
    fallTime++;
    //パラシュート展開時
    if (parachuteOpenAltitude > altitude) {
        window.alert("パラシュート展開");
        clearInterval(interval_fall);
        interval_landing = setInterval(landing, 1000);
    }
}

function landing() {
    latLng[0] += latitudePerSec;
    latLng[1] += longtitudePerSec;
    altitude -= moveUpMeterPerSec - Math.random() + 0.5;
    update(latLng);
    time++;
    //着地
    if (landingMeterPerSec > altitude) {//高度がマイナスにならないように
        window.alert("着地");
        clearInterval(interval_landing);
    }
}


function update(latLng) {
        marker.setLatLng(latLng);
    if (doChase) {
        map.setView(latLng);
    }
    
    altitudeText.textContent = `高度:${altitude.toFixed(2)}m`;
    document.getElementById('altitude-meter').value = altitude;
    
    //経過時間表示
    var hour = Math.trunc(time / 3600);
    var min = Math.trunc((time - hour * 3600) / 60);
    var sec = time - hour * 3600 - min * 60;
    timerText.textContent = `経過時間 ${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`; 

}

chaseCheckbox.addEventListener("click", () => {
    doChase = chaseCheckbox.checked;
});

// optionを指定
function opt(title, position) {
    option =
    {
        position: 'topright',
        strings: {
            title: title,
            popup: `${title}\n${position}`
        },
        locateOptions: {
            maxZoom: 16
        }
    };
    return option;
}



//MAIN//
var interval_rise = setInterval(moveUp, 1000);
marker = L.marker(latLng, title="気球位置").addTo(map);
simulationMarker = L.marker(simulatedLandingLatLng, title = "予測落下地点").addTo(map);
var simulatedOrbit = L.polyline([latLng, simulatedLandingLatLng], { "color": "red", "weight": 10, "opacity": 0.2 }).addTo(map);
marker.bindPopup(`気球位置\n${latLng}`);
simulationMarker.bindPopup(`予測落下地点\n${simulatedLandingLatLng}`);
//var currentMarker = L.control.locate(opt("現在位置")).addTo(map);
