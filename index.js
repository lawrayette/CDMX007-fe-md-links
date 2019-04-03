const fs = require("fs");
const readme = './README.md';
const fetch = require('node-fetch');
const colors = require('colors');
const path = require('path');

const resolveRoute = (file) => {
  if (path.isAbsolute(file) === true) {
      console.log(file);
  } else {
      pathAbs = path.resolve(file);
      return pathAbs;    
  };
};
resolveRoute(readme);

const printResults = (res) => {

  const allResponse = {
      page: res.url,
      pageStatus: res.status,
      pageMessage: res.statusText
  };
   if (allResponse.pageStatus !== 200){
     const notFound = `PATH ${pathAbs} ${allResponse.page} ${allResponse.pageStatus} ${allResponse.pageMessage}`;
    console.log(notFound.red);
     //console.log( pathAbs +"LinkCheck:".red +' '+ allResponse.page +' '+ "Status:".yellow +' '+ allResponse.pageStatus + ' ' + "networkMessage:".magenta +' '+ allResponse.pageMessage);
  }else{
    const linkFound = `PATH ${pathAbs} ${allResponse.page} ${allResponse.pageStatus} ${allResponse.pageMessage}`;
    console.log(linkFound.cyan);
    //console.log( pathAbs +"LinkCheck:".cyan +' '+ allResponse.page +' '+ "Status:".yellow +' '+ allResponse.pageStatus + ' ' + "networkMessage:".magenta +' '+ allResponse.pageMessage);
  }
  
};
const getResponse = (result) => {
  // console.log(result);
  fetch(result).then((res) => {
      // console.log(res);
      printResults(res);
  });
};
const getLinks = (err, string) => {
  if (err) {
      console.log(err.message);
  } else {
      const regEx = /(http:\/\/|https:\/\/|www\.)[^\s][^)]+/g;
      const links = string.match(regEx);
      for (let i = 0; i < links.length; i++) {
          const cutLink = links[i].split(')');
          const result = cutLink[0];
          // console.log(result);
          getResponse(result);
      };
  };
};

const mdLinks = (readme) => {
  fs.readFile(readme, 'utf-8', getFile = (err, str) => {
      if (err) {
          console.log(err.message);
      } else {
         getLinks(err, str);
      };
  });
};
mdLinks(readme);

module.exports = {mdLinks};