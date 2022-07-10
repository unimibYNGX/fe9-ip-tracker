function httpGet(url) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function searchIP() {
  if (!document.getElementById("input").value == "") {
    var url =
      "https://geo.ipify.org/api/v2/country,city?apiKey=at_RwNW71G1oSdJ4Xd0M2o0I3AIwl3LX&ipAddress=" +
      document.getElementById("input").value;
    var content = httpGet(url);
    var parsed = JSON.parse(content);
    console.log(parsed);

    set(parsed);
  }
}

var map = L.map("map").setView([0, 0], 13);
function createMap(lat, lng) {
  map.off();
  map.remove();
  map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lng]).addTo(map).openPopup();
}

function set(data) {
  setIPAddress(data.ip);
  setLocation(data.location.city, data.location.region, data.location.country);
  setTimezone(data.location.timezone);
  setISP(data.isp);
  createMap(data.location.lat, data.location.lng);
  showByClass("res");
}
function setIPAddress(ip) {
  document.getElementById("ip-address").innerHTML = ip;
}
function setLocation(city, region, country) {
  document.getElementById("location").innerHTML =
    city + ", " + region + ", " + country;
}
function setTimezone(timezone) {
  document.getElementById("timezone").innerHTML = "UTC " + timezone;
}
function setISP(isp) {
  document.getElementById("isp").innerHTML = isp;
}

function add(name, id) {
  document.getElementById(id).classList.add(name);
}

function remove(name, id) {
  document.getElementById(id).classList.remove(name);
}

function show(id) {
  remove("hide", id);
}

function hide(id) {
  add("hide", id);
}

function hideByClass(class_id) {
  var arr = document.getElementsByClassName(class_id);
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    element.classList.add("hide");
  }
}
function showByClass(class_id) {
  var arr = document.getElementsByClassName(class_id);
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    element.classList.remove("hide");
  }
}

hideByClass("res");
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchIP();
  }
});
