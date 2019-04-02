const fs = require("fs");
const fetch = require('node-fetch');
const colors = require('colors');
const path = require('path');
const archive = ('./README.md');

const resolveRoute = (archive) => {
  if (path.isAbsolute(archive) === true) {
     
  } else {
      console.log(path.resolve(archive).green);    
     
  };
};
resolveRoute(archive);

const readingFile = () => {
  fs.readFile(archive, 'utf-8', (error, data) => {
    if (error) {
      console.log('error')
    } else {
      console.log(data);
    }
  })
}
readingFile();

const links = () => {

}
