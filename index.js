const fs = require("fs");
const readme = './README.md';
const fetch = require('node-fetch');
const colors = require('colors');
const path = require('path');

const routeAbs = (file) => {
  if (path.isAbsolute(file) === true) {
      console.log(file);
  } else {
      pathAbs = path.resolve(file);
      return pathAbs;    
  };
};
routeAbs(readme);

const printData = (res) => {

  const allResponse = {
      page: res.url,
      pageStatus: res.status,
      pageMessage: res.statusText
  };
   if (allResponse.pageStatus !== 200){
     const notFound = `PATH ${pathAbs} ${allResponse.page} ${allResponse.pageStatus} ${allResponse.pageMessage}`;
    console.log(notFound.red);
  }else{
    const linkFound = `PATH ${pathAbs} ${allResponse.page} ${allResponse.pageStatus} ${allResponse.pageMessage}`;
    console.log(linkFound.cyan);
  }
  
};
const getRes = (link) => {
   //console.log(result);
  fetch(link).then((res) => {
      console.log(res);
      printData(res);
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
          getRes(result);
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