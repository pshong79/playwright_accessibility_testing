//@ts-check

module.exports = {
  createDirectory,
  getDateReformatted
}

import fs from 'fs';

function createDirectory(dirName) {
  const path = `./test-results/${dirName}`;

  fs.access(path, (error) => {

    // To check if given directory 
    // already exists or not
    if (error) {
      // If current directory does not exist then create it
      fs.mkdir(path, { recursive: true }, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("New Directory created successfully !!");
        }
      });
    } else {
      console.log("Given Directory already exists !!");
    }
  });
}

function getDateReformatted() {
  const currentDate = new Date().toLocaleDateString();
  let reformattedDate = currentDate.replaceAll('/', '-');

  return reformattedDate;
}

// function setExpireDate() {
//   const oneMonthInMilliseconds = 1000 * 60 * 60 * 24 * 30;
//   const todayDateTime = Date.now();
//   const expireDate = new Date(todayDateTime + oneMonthInMilliseconds);

//   console.log('Expire Date:', expireDate.toString());
//   console.log('Expire Date in milliseconds:', expireDate.valueOf());
//   return expireDate.valueOf();
// }