// Description:
// This script consolidates multiple accessibility test reports into a single HTML file.
// It can be executed by running `node scripts/consolidate_reports.js` from the command line.

import fs from 'fs';
import path from 'path';

const testDate = new Date().toLocaleDateString().replaceAll('/', '-');
const reportsDir = path.join('test-results', `${testDate}_accessibility-test-results_html`);
const outputFile = path.join('test-results', `consolidated-accessibility-report.html`);

const files = fs.readdirSync(reportsDir).filter(file => file.endsWith('.html'));

let htmlSections = files.map(file => {
  const filePath = path.join(reportsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Wrap each report in a collapsible section
  return `
    <details style="margin-bottom: 20px;">
      <summary><strong>${file}</strong></summary>
      <iframe src="${path.join(`${testDate}_accessibility-test-results_html`, file)}" style="width: 100%; height: 800px; border: 1px solid #ccc;"></iframe>
    </details>
  `;
}).join('\n');

const finalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Consolidated Accessibility Report</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 2em;
    }
    summary {
      font-size: 1.2em;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Accessibility Report – ${testDate}</h1>
  ${htmlSections}
</body>
</html>
`;

fs.writeFileSync(outputFile, finalHtml);
console.log(`Consolidated report created: ${outputFile}`);
