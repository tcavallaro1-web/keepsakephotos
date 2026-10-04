/* Legacy /buy and /download URLs: forward to the home page, keeping ?edition= */
(function () {
  var s = document.currentScript, t = (s && s.getAttribute("data-target")) || "/";
  var hash = t.indexOf("#") >= 0 ? t.slice(t.indexOf("#")) : "";
  var base = t.split("#")[0] || "/";
  location.replace(base + location.search + hash);
})();
