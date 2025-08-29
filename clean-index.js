const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "./dist/pricing-element/browser");
const indexPath = path.join(distDir, "index.html");
const pricingPath = path.join(distDir, "pricing.html");

// Read index.html
let html = fs.readFileSync(indexPath, "utf8");

// Remove <script src="main.js"> and <link rel="stylesheet" href="styles.css">
html = html.replace(/<script[^>]*src="main\.js"[^>]*><\/script>/, "");
html = html.replace(/<link[^>]*href="styles\.css"[^>]*>/gi, "");
html = html.replace(/<noscript>\s*<\/noscript>/gi, ""); // clean empty <noscript>

// Write to pricing.html
fs.writeFileSync(pricingPath, html, "utf8");

// Remove original index.html
fs.unlinkSync(indexPath);

console.log("✅ index.html cleaned and renamed to pricing.html");
