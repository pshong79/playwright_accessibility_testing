// @ts-check
import path from 'path';
import fs from 'fs';
const { test } = require('@playwright/test');
const { parse } = require('csv-parse/sync');
const { injectAxe, getViolations } = require('axe-playwright');


const records = parse(fs.readFileSync(path.join(__dirname, '../data/pageUrls.csv')), {
  columns: true,
  skip_empty_lines: true
})

for (const record of records) {
  test(`accessibility testing for: ${record.url}`, async ({ page }) => {
    await page.goto(record.url);
  
    await injectAxe(page);

  // This returns all violation regardless of impact
  // const violations = await getViolations(page);
  
  // This returns only violations for the specified standardards (which seem to be only serious impacts)
  const violations = await getViolations(page, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      // values: ['wcag2a'],
    },
  })
  
  // const violationArray = await violations.map((violation, index) => {
  await violations.map((violation, index) => {
    const violationsCount = violations.length;

    if (index < violationsCount) {
      const violationNodes = violation.nodes;
      violationNodes.map((node, nodeIndex) => {
        const nodesCount = violationNodes[0].any.length;

        if (nodeIndex < nodesCount) {
          const anyArray = node.any;
          anyArray.map((offense, offenseIndex) => {
            const offenseCount = anyArray.length;

            if (offenseIndex < offenseCount) {
              // NOTE: offense.id, offense.impact are not needed. They are the same values as violation.id, violation.impact.
              // console.log('offense.id: ' + offense.id);
              // console.log('offense.impact: ' + offense.impact);
              // NOTE: offense.message may not be needed. It is similar to violation.description.
              console.log('offense.message: ' + offense.message);
            }
            console.log('node.html: ' + node.html);
            console.log('node.target: ' + node.target);
            console.log('node.failureSummary: ' + node.failureSummary);
          }
        )}
      })
      console.log('violation.id: ' + violation.id);
      console.log('violation.impact: ' + violation.impact);
      console.log('violation.description: ' + violation.description);
      console.log('violation.help: ' + violation.help);
      console.log('violation.helpUrl: ' + violation.helpUrl);
      console.log('');
      console.log('---------------------------------------------------------------------');
      console.log('');
    }
  })
  // TODO: convert all the console.logs into variables and shove them into an array in desired order:
  //       1. violation.id
  //       2. violation.impact
  //       3. violation.description
  //       4. violation.help
  //       5. violation.helpUrl
  //       6. node.html (not sure if this is needed.)
  //       7. node.failureSummary (not sure if this is needed.)
  //
  //       after shoving into array, shove into csv / excel file.
})}
