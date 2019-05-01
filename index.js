//Declara módulos
const fs = require("fs");
const readme = './README.md';
const fetch = require('node-fetch');
const colors = require('colors');
const path = require('path');

//Obtiene ruta absoluta de README
const routeAbs = (file) => {
  if (path.isAbsolute(file) === true) {
      console.log(file);
  } else {
      pathAbs = path.resolve(file);
      return pathAbs;    
  };
};
routeAbs(readme);

// función que imprime Validate
const validate = (res) => {

  const allResponse = {
      page: res.url,
      pageStatus: res.status,
      pageMessage: res.statusText
  };
   if (allResponse.pageStatus !== 200){
     const notFound = `PATH ${pathAbs} ${allResponse.page} ${allResponse.pageStatus} ${allResponse.pageMessage}`;
     console.log(notFound.red);
          
  }else{
    const linkFound = `PATH  ${pathAbs} ${allResponse.page} ${allResponse.pageStatus} ${allResponse.pageMessage}`;
    console.log(linkFound.bold.green);
    
  }

};
// Petición de enlaces funcionales o rotos
const getFetch = (link) => {
   //console.log(result);
  fetch(link).then((res) => {
      //console.log(res);
      validate(res);
   });
};

// Obtene al array de enlaces
const getLinks = (err, string) => {
  if (err) {
      console.log(err.message);
  } else {
      const regEx = /(https?):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))/g;
      let links = string.match(regEx);
      for (let i = 0; i < links.length; i++) {
          let cutLink = links[i].split(')');
          let result = cutLink[0];
          //console.log(result);
          getFetch(result);
      };
  };
};

// Lee el readme
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

