/*
 * Keepsake Photos: site configuration. THE ONLY FILE YOU SHOULD NEED TO EDIT.
 *
 * Anything marked PLACEHOLDER still needs a real value from Troy.
 * Leave a value empty ("") and the site shows a polished fallback instead
 * of developer text.
 */
window.KEEPSAKE_CONFIG = {
  product: "Keepsake Photos",
  publisher: "KC Clutterfree, LLC",
  supportEmail: "support@keepsakephotos.net",   // CONFIRM: this mailbox must exist and be monitored

  // Product facts shown in the info row
  version: "1.3.11",           // final build, confirmed by App Builder
  fileSize: "299 MB",          // 313,149,353 bytes (298.6 MiB)
  releaseDate: "October 6, 2026",
  sha256: "6ab62d01c197da9c00fd7bff15b6ba01a93b8b00e28fec880784b556bf166d4b",
  platform: "Windows 10 & 11 (64-bit)",

  // One-click installer download: GitHub Release asset (302 to a signed URL, served as an attachment).
  downloadUrl: "https://github.com/tcavallaro1-web/keepsakephotos/releases/download/v1.3.11/Keepsake-Photos-Setup-1.3.11.exe",
  downloadFileName: "Keepsake-Photos-Setup-1.3.11.exe",

  // Editions (one-time lifetime serials). Names and prices come from the original site
  // (Home / Family / Studio).
  editions: {
    home:   { name: "Home",   price: "29.95" },
    family: { name: "Family", price: "37.45" },
    studio: { name: "Studio", price: "149.00" }
  },
  currency: "USD",

  // PayPal "Buy Now" (standard _xclick). Payments go to this PayPal account.
  paypal: {
    business: "tcavallaro1@gmail.com",
    returnUrl: "",   // empty = <current site>/thanks/ (works on github.io now and keepsakephotos.net later)
    cancelUrl: ""    // empty = <current site>/#pricing
  },

  // Square checkout links (Square Dashboard > Online Checkout > Payment links).
  // PLACEHOLDER: paste one link per edition. Empty shows "Card checkout coming soon".
  square: {
    home: "https://square.link/u/ZJEniXjd",
    family: "https://square.link/u/L86YVCPp",
    studio: "https://square.link/u/TvtvD2LI"
  }
};
