module.exports ={
  reformatPageUrl,
  getDateReformatted
}

function reformatPageUrl(pageUrl) {
  let tempString; 
  let removeHttps = pageUrl.slice(8);
  const stringLength = removeHttps.length;
  let lastChar = removeHttps.slice(-1);

  if (lastChar == '/') {
    tempString = removeHttps.substring(0, stringLength - 1);
  } else {
    tempString = removeHttps;
  }
  
  let replaceBackSlashString = tempString.replaceAll('/', '-');
  let finalString = replaceBackSlashString.replaceAll('.', '-');
  
  return finalString;
}

function getDateReformatted() {
  const currentDate = new Date().toLocaleDateString();
  let reformattedDate = currentDate.replaceAll('/', '-');

  return reformattedDate;
}
