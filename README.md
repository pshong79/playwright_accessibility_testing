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
See the **Reporting** section to see how to generate a consolidated report.

See the **Troubleshooting** section if there are any test failures.

### Customizing
There are a few places to customize the test.
1. `pageUrl.csv` - Specify the urls to be tested in this file.
2. Accessibility standard - Specify the standards to test against by updating the values in the array under `runOnly`:

    Example:
    ```
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
    ```

## Reporting
### HTML format
Currently, the test returns individual reports for each individual url in `html` format using the defaul `axe` reporting inside the ``test-results/${testDate}_accessibility-test-results_html` directory.

A script (`scripts/consolidate_html_reports.js`) was created to consolidate all of the individual reports into one `html` report. This script can be executed with:
```
$ node scripts/consolidate_html_reports.js
```

This should create a file named `consolidated-accessibility-report_html.html` inside the `test-results` directory. This file will need to be opened using a browser to view in a user-friendly view. When opened, the report pulls from all the individual reports from the test run so the report needs to be shared with others, **both** the `consolidated-accessibility-report_html.html` **and** the folder containing the individual reports will need to be shared.

**#FIXME: Generally, it works well; however, there is still a few things to iron out:**
1. It seems like there is a limit to the length of the individual report name that allows it to load properly in the `consolidated-accessibilty-report_html.html` file. The do, however, load if opened individually. (Possible solution: rethink how it is naming the individual test result files.)
2. Sometimes, the initial loading of the individual report when it is expanded within the `consolidated-accessibility-report_html.html` could be a little slow. Not sure if this is can be improved.

### CSV format
The ability to produce a `csv` report that was used previously has been added. The test, `csv report - accessibility testing for: ${record.url}`, will output a `csv` file for each url in the `pageUrls.csv` file into the `test-results/${testDate}_accessibility-test-results_csv` directory. The reports can then be consolidated using an external script.

**TODO: Add csv consoliation script.**

## Troubleshooting
1. All of the `html report` tests *should* pass.
   * If any of the test runs fail, attempt to re-run the tests again, especially if the failures are in a non-production environment. Most likely, it was caused by the server shutting down due to being idle and it needed to be woken up again. If the same tests fail a second time, then more investigation may be needed.
   * For the `csv report` tests, there will be tests that fail. This is intended. Failed tests mean there are accessibility violations.
