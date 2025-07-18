// @ts-check
import path from 'path';
import fs from 'fs';
const { test, expect, chromium } = require('@playwright/test');
const { parse } = require('csv-parse/sync');
const { injectAxe, checkA11y, getViolations } = require('axe-playwright');
const TestHelper = require('../helpers/test_helper');
const ObjectsToCsv = require('objects-to-csv');

// This parses the pageUrls.csv file and returns an array of objects
const records = parse(fs.readFileSync(path.join(__dirname, '../data/pageUrls.csv')), {
  columns: true,
  skip_empty_lines: true
})

let page, browser;

for (const record of records) {
  test(`html report - accessibility testing for: ${record.url}`, async () => {
    browser = await chromium.launch();
    page = await browser.newPage();

    // Formatting the date to a readable format
    // This will be used to create a unique folder for each test run
    // const testDate = await new Date().toLocaleDateString().replaceAll('/', '-');
    const testDate = TestHelper.getDateReformatted();

    await page.goto(record.url);
    await injectAxe(page);

    // Checks for accessibility violations
    // See https://github.com/abhinaba-ghosh/axe-playwright?tab=readme-ov-file#examples for usage details
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: { 
        html: true 
      },
      axeOptions: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
        },
      },
    }, true, 'html', {
      outputDirPath: 'test-results',
      outputDir: `${testDate}_accessibility-test-results_html`,
      reportFileName: `${record.url.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`
    });

    await browser.close();
  });

  test(`csv report - accessibility testing for: ${record.url}`, async ({ page }) => {
    await page.goto(record.url);
  
    await injectAxe(page);

    // This returns all violation regardless of impact
    // const violations = await getViolations(page);
    // NOTE: testDate is currently not in use. The idea is to create a folder with the date to better organize the results
    //       but it is currently throwing an error so that will need to be investigated.
    const testDate = TestHelper.getDateReformatted();
    const csvDir = `${testDate}_accessibility-test-results_csv`


    // This returns only violations for the specified standardards (which seem to be only serious impacts)
    const violations = await getViolations(page, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
        // values: ['wcag2a'],
      },
    })
    await TestHelper.createDirectory(csvDir);
    new ObjectsToCsv(violations).toDisk(`test-results/${testDate}_accessibility-test-results_csv/${record.url.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.csv`, {});
    
    await expect(violations.length).toBe(0);
  });
};
