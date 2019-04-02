// Declaración de módulos de NODEjs
const fs = require("fs");
const fetch = require('node-fetch');
const colors = require('colors');
const path = require('path');
const archive = ('./README.md');

// Función que accede a la ruta absoluta del archivo
const resolveRoute = (archive) => {
  if (path.isAbsolute(archive) === true) {

  } else {
    console.log(path.resolve(archive).bgGreen.black);

  };
};

// Función para acceder  los enlaces del readme y los imprime en la consola. 
const file = () => {
  fs.readFile(archive, 'utf-8', (error, data) => {
    if (error) {
      console.log('error')
    } else {
      const regExp = /(http:\/\/|https:\/\/|www\.)[^\s][^)]+/g;
      const links = data.match(regExp);
      console.log(links);

    }
  })
}





file();
resolveRoute(archive);
