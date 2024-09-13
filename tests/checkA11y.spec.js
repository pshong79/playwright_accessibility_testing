// @ts-check
import path from 'path';
import fs from 'fs';
const { test } = require('@playwright/test');
const { parse } = require('csv-parse/sync');
const { injectAxe, checkA11y } = require('axe-playwright');


  const records = parse(fs.readFileSync(path.join(__dirname, '../data/pageUrls.csv')), {
    columns: true,
    skip_empty_lines: true
  })

  for (const record of records) {
    test(`accessibility testing for using checkA11y: ${record.url}`, async ({ page }) => {
      await page.goto(record.url);
    
      await injectAxe(page);

      // await checkA11y(page);
      await checkA11y(page, {
        axeOptions: {
          runOnly: {
            type: 'tag',
            // values: ['wcag2a']
            values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
          }
        }
      });
    })
  }
