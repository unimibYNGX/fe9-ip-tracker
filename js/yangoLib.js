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

function set(id, attr, value) {
  var el = document.getElementById(id);
  el.style.setProperty(attr, value);
}

function setByClass(class_id, attr, value) {
  var els = document.getElementsByClassName(class_id);
  for (let i = 0; i < els.length; i++) {
    const element = els[i];
    element.style.setProperty(attr, value);
  }
}

function checkSize(request, query) {
  var x = window.matchMedia("(" + query + ")");
  switch (request) {
    case "device":
      x.matches ? mobile() : desktop();
      break;
    case "font-size":
      x.matches ? small() : big();
      break;
    default:
      console.log("request not recognized");
      break;
  }
}

function mobile() {
  hideByClass("vl");
  set("input", "width", "67.75vw");
  set("card", "top", "130px");
  set("card", "width", "70vw");
  set("card", "flex-wrap", "wrap");
  setByClass("block", "width", "100%");
  setByClass('block', 'text-align', 'center')
  setByClass("res", "height", "30px");
  setByClass("txt", "text-align", "center");
  set('isp', 'height', '19px')
}

function desktop() {
  showByClass("vl");
  set("input", "width", "350px");
  set("card", "top", "auto");
  set("card", "width", "fit-content");
  set("card", "flex-wrap", "no-wrap");
  setByClass("block", "width", "120px");
  setByClass('block', 'text-align', 'left')
  setByClass("res", "height", "60px");
  setByClass("txt", "text-align", "left");
  set('isp', 'height', '60px')
}

window.addEventListener("resize", function (event) {
  checkSize("device", "max-width: 645px");
});
checkSize("device", "max-width: 645px");
