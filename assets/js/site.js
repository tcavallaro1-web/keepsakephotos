/* Keepsake Photos: small, dependency-free site script. */
(function () {
  "use strict";
  var C = window.KEEPSAKE_CONFIG || {};
  var doc = document.documentElement;

  /* Phone / tablet detection (CSS also hides downloads on narrow screens). */
  var ua = navigator.userAgent || "";
  var isMobile = (navigator.userAgentData && navigator.userAgentData.mobile) ||
    /Android|iPhone|iPad|iPod|Mobile|Silk|Kindle/i.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  /* Only touch <html> when CSS media queries don't already cover it (avoids a full restyle on phones). */
  var cssPhone = window.matchMedia && window.matchMedia("(max-width: 640px), (pointer: coarse) and (max-width: 1024px)").matches;
  if (isMobile && !cssPhone) doc.classList.add("is-mobile");

  function isPlaceholder(v) { return !v || /GITHUB_USER|PLACEHOLDER|TODO/.test(v); }

  /* Product facts */
  var facts = {
    version: C.version,
    fileSize: C.fileSize,
    platform: C.platform,
    releaseDate: C.releaseDate || "Coming soon",
    supportEmail: C.supportEmail,
    publisher: C.publisher,
    sha256: C.sha256,
    downloadFileName: C.downloadFileName
  };
  Array.prototype.forEach.call(document.querySelectorAll("[data-config]"), function (el) {
    var v = facts[el.getAttribute("data-config")];
    if (v) el.textContent = v;
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-mailto]"), function (el) {
    if (C.supportEmail) { el.href = "mailto:" + C.supportEmail; if (!el.textContent.trim()) el.textContent = C.supportEmail; }
  });

  /* Download links: plain anchors. JS only sets the href once; the browser does the rest. */
  var dlReady = !isPlaceholder(C.downloadUrl);
  Array.prototype.forEach.call(document.querySelectorAll("a[data-download]"), function (a) {
    if (dlReady) {
      a.href = C.downloadUrl;
      a.setAttribute("download", C.downloadFileName || "");
    } else {
      a.href = "#download";
      a.classList.add("is-pending");
      a.setAttribute("aria-disabled", "true");
      var label = a.querySelector("[data-download-label]");
      if (label) label.textContent = "Download available soon";
    }
  });

  /* Pricing / checkout */
  var eds = C.editions || {};
  function money(p) { return "$" + (String(p).replace(/\.00$/, "")); }
  /* Site root, worked out from the manifest link, so PayPal returns buyers to whichever host serves the site
     (github.io preview now, keepsakephotos.net later) unless the config pins a URL. */
  var root = (function () {
    var m = document.querySelector('link[rel="manifest"]');
    return m ? m.href.replace(/site\.webmanifest$/, "") : location.origin + "/";
  })();
  function paypalUrl(id) {
    var e = eds[id], p = C.paypal || {};
    if (!e || !p.business) return "";
    var q = {
      cmd: "_xclick",
      business: p.business,
      item_name: (C.product || "Keepsake Photos") + " " + e.name + " lifetime serial",
      item_number: "keepsake-" + id,
      amount: e.price,
      currency_code: C.currency || "USD",
      quantity: "1",
      no_shipping: "1",
      no_note: "1",
      "return": p.returnUrl || root + "thanks/",
      cancel_return: p.cancelUrl || root + "#pricing",
      rm: "1"
    };
    return "https://www.paypal.com/cgi-bin/webscr?" + Object.keys(q).filter(function (k) { return q[k]; })
      .map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(q[k]); }).join("&");
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-price]"), function (el) {
    var e = eds[el.getAttribute("data-price")];
    if (e) el.textContent = money(e.price);
  });
  Array.prototype.forEach.call(document.querySelectorAll("a[data-buy]"), function (a) {
    var id = a.getAttribute("data-edition"), method = a.getAttribute("data-buy");
    var url = method === "paypal" ? paypalUrl(id) : ((C.square || {})[id] || "");
    if (url && !isPlaceholder(url)) {
      a.href = url;
      a.rel = "noopener";
    } else {
      a.removeAttribute("href");
      a.classList.add("is-pending");
      a.setAttribute("role", "link");
      a.setAttribute("aria-disabled", "true");
      a.setAttribute("tabindex", "0");
      a.textContent = method === "paypal" ? "PayPal coming soon" : "Card checkout coming soon";
    }
  });

  /* ?edition= : honor home / family / studio (aliases: personal = home, pro = studio). */
  var aliases = { home: "home", personal: "home", family: "family", studio: "studio", pro: "studio" };
  var param = null;
  try { param = new URLSearchParams(location.search).get("edition"); } catch (e) { /* old browser */ }
  var chosen = param ? aliases[String(param).toLowerCase()] : null;
  if (chosen) {
    var card = document.getElementById("plan-" + chosen);
    if (card) {
      card.classList.add("is-selected");
      var tag = card.querySelector(".plan-selected");
      if (tag) tag.hidden = false;
      var heroBuy = document.querySelector("[data-hero-buy]");
      if (heroBuy && eds[chosen]) {
        heroBuy.textContent = "Buy " + eds[chosen].name + " \u2013 " + money(eds[chosen].price);
        heroBuy.href = "#plan-" + chosen;
      }
    }
  }

  /* Year in footer stays 2026 per brand guidelines; nothing else to do. */
})();
