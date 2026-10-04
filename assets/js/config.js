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
  version: "1.0.0",            // CONFIRM: from the app's package.json; update with each release
  fileSize: "118 MB",          // 123,972,567 bytes (latest Drive copy). Re-check if a new build is released
  releaseDate: "",             // PLACEHOLDER: e.g. "October 2026". Empty shows "Coming soon"
  platform: "Windows 10 & 11 (64-bit)",

  // One-click installer download (GitHub Release asset, one file, served as an attachment).
  // Release asset in tcavallaro1-web/keepsakephotos (release v1.0.0 must exist with this exact file name).
  // "releases/latest/download/<file>" always points at the newest release.
  downloadUrl: "https://github.com/tcavallaro1-web/keepsakephotos/releases/download/v1.0.0/Keepsake-Photos-Windows11-24H2.zip",
  downloadFileName: "Keepsake-Photos-Windows11-24H2.zip",

  // Paid processing tiers. Names and prices are the ONLY prices on the original site
  // (its Home / Family / Studio lifetime serials). CONFIRM with Troy before launch.
  editions: {
    home:   { name: "Home",   price: "29.95" },
    family: { name: "Family", price: "37.45" },
    studio: { name: "Studio", price: "149.00" }
  },
  currency: "USD",

  // PayPal "Buy Now" (standard _xclick). Payments go to this PayPal account.
  paypal: {
    business: "tcavallaro1@gmail.com",
    returnUrl: "https://keepsakephotos.net/thanks/",
    cancelUrl: "https://keepsakephotos.net/#pricing"
  },

  // Square checkout links (Square Dashboard > Online Checkout > Payment links).
  // PLACEHOLDER: paste one link per edition. Empty shows "Card checkout coming soon".
  square: {
    home: "https://square.link/u/ZJEniXjd",
    family: "https://square.link/u/L86YVCPp",
    studio: "https://square.link/u/TvtvD2LI"
  }
};
