# Description
This project is a prototype for executing `accessibility testing` using Playwright.

Playwright has the ability to perform accessibility testing by leveraging the [`axe-core` npm](https://github.com/dequelabs/axe-core-npm) library. However, this project takes advantage of the [`axe-playwright`](https://github.com/abhinaba-ghosh/axe-playwright) library that is a custom library built on top of `axe-core`.

It also take advangtage of the [`csv-parser`](https://github.com/adaltas/node-csv/tree/master/packages/csv-parse) to read in `pageUrls` from a csv file and perform accessibilty testing on each page.

## Prerequisites
These tools must be installed before completing the following `Setup` steps:
* Git
* Playwright

## Setup
To get this project running locally, follow these steps:

1. Clone the repositiory.
2. `cd` into the project directory.
3. Install `axe-playwright`:
    ```
    $ npm i -D axe-playwright
    $ npm i -D playwright
    ```
4. Install `csv-parse`:
   ```
   $ npm install csv-parse
   ```

## Data
The test is basically one test that executes over and over for each `url` in the `pageUrl.csv` file. 

Update the `urls` in the file to specify all the pages the accessbility test should be executed on.

## Execution
Run the command to execute Playwright tests as usual.
```
$ npx playwright test
```

### Customizing
There are a few places to customize the test.
1. `pageUrl.csv` - Specify the urls to be tested in this file.
2. Accessibility standard - Specify the standards to test against by updating the values in the array under `runOnly`:

    Example:
    ```
    values: ['wcag2a']
    ```

## Reporting
#### #TODO - There is still work to be done to come up with a better solution for reporting. One option is to export the results into an Excel file so that the data can be massaged to generate custom reports using PivotTables.

Currently the default reporting is displayed like this:
```
[chromium] › example.spec.js:15:5 › accessibility testing for: https://.../
┌─────────┬──────────────────┬────────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬───────┐
│ (index) │ id               │ impact     │ description                                                                                                       │ nodes │
├─────────┼──────────────────┼────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────┤
│ 0       │ 'color-contrast' │ 'serious'  │ 'Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds' │ 2     │
│ 1       │ 'empty-heading'  │ 'minor'    │ 'Ensures headings have discernible text'                                                                          │ 1     │
│ 2       │ 'link-name'      │ 'serious'  │ 'Ensures links have discernible text'                                                                             │ 1     │
│ 3       │ 'region'         │ 'moderate' │ 'Ensures all page content is contained by landmarks'                                                              │ 2     │
│ 4       │ 'role-img-alt'   │ 'serious'  │ 'Ensures [role="img"] elements have alternate text'                                                               │ 1     │
└─────────┴──────────────────┴────────────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴───────┘
  1) [chromium] › example.spec.js:15:5 › accessibility testing for: https://.../ 

    AssertionError: 5 accessibility violations were detected
    ```