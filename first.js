var marker = '';
var icon_balloon = L.icon({ iconUrl: "icon_balloon.png", iconAnchor: [15, 15] });
var map = L.map('map');

//地理院タイルを使用
L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
}).addTo(map);

map.setView([32.453287, 139.767809], 15);

//GPSの監視を開始
watch_id = navigator.geolocation.watchPosition(
    updateMarker, null, { "enableHighAccuracy": true, "timeout": 20000, "maximumAge": 10000 }
);


function updateMarker(position) {
    var latLng = [position.coords.latitude, position.coords.longitude]
    if (marker == "") {
        marker = L.marker(latLng, { icon: icon_balloon }).addTo(map);
        map.setView(latLng, 18);
    }
    else {
        marker.setLatLng(latLng);
    }
}