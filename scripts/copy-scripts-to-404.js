const fs = require('fs');
const path = require('path');

// Read the built index.html
const buildDir = path.join(__dirname, '..', 'build');
const indexHtmlPath = path.join(buildDir, 'index.html');
const html404Path = path.join(buildDir, '404.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('Error: build/index.html not found. Run npm run build first.');
  process.exit(1);
}

if (!fs.existsSync(html404Path)) {
  console.error('Error: build/404.html not found.');
  process.exit(1);
}

// Read both files
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
let html404 = fs.readFileSync(html404Path, 'utf8');

// Extract script and link tags from index.html
// Match script tags with defer attribute and link tags for CSS
const scriptMatch = indexHtml.match(/<script[^>]*src="[^"]*"[^>]*><\/script>/g);
const linkMatch = indexHtml.match(/<link[^>]*href="[^"]*\.css"[^>]*>/g);

if (!scriptMatch || scriptMatch.length === 0) {
  console.error('Error: No script tags found in index.html');
  process.exit(1);
}

// Find the position to insert scripts (before </head>)
const headEndIndex = html404.indexOf('</head>');
if (headEndIndex === -1) {
  console.error('Error: </head> tag not found in 404.html');
  process.exit(1);
}

// Remove any existing script or link tags from 404.html
html404 = html404.replace(/<script[^>]*><\/script>/g, '');
html404 = html404.replace(/<link[^>]*href="[^"]*\.css"[^>]*>/g, '');

// Insert scripts and links before </head>
const scriptsToInsert = [...(linkMatch || []), ...scriptMatch].join('\n');
html404 = html404.slice(0, headEndIndex) + '\n' + scriptsToInsert + '\n' + html404.slice(headEndIndex);

// Write the updated 404.html
fs.writeFileSync(html404Path, html404, 'utf8');
console.log('✓ Successfully copied scripts from index.html to 404.html');

