#!/usr/bin/env node 
const mdLinks=require("./prueba.js")

const routeMD=process.argv[2]
const option=process.argv[3]


if(require.main===module){
    
    mdLinks(routeMD,option).then(console.log);
  
}

mdLinks(routeMD,option)
