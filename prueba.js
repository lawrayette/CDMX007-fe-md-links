//

const fs = require('fs'); 
const fetch = require('node-fetch');
const path = require('path');
const markdownLinkExtractor = require('markdown-link-extractor');


const mdLinks = (routeMD, option) => {
    // statSync reads information about the file specified in the path parameter
    let stats = fs.statSync(routeMD);
    //Get the extension from a file path 
    extension = path.extname(routeMD) 
    
    if (extension === ".md") {
        
        const markdown = fs.readFileSync(routeMD).toString();
        const links = markdownLinkExtractor(markdown);
        let resultLinks = [];
            for (let i = 0; i < links.length; i++) {
                   
            const arrPromise = fetch(links[i])
            .then(res => {
                 if (option === "--validate") {
                    let objetLinks = {
                        urlLinks: `${res.url}`,
                        statusLinks: `${res.status}`,
                        statusTextLinks: `${res.statusText}`,
                        ruta: `${routeMD}`
                        };
                        return objetLinks
                    } else {
                        let objetLinks = {
                            urlLinks: `${res.url}`,
                            ruta: `${routeMD}`,
                          };
                        return objetLinks
                    }
                })
                .catch((err) => {
                    const objetErr = { statusLinks: "Fail" };
                    return objetErr;
                })
            resultLinks.push(arrPromise)
           
        }
        
        const data =  Promise.all(resultLinks)
        return data //
       //returns a single Promise that resolves when all of the promises passed as an 
       //iterable have resolved or when the iterable contains no promises. Promise.all() 
       //method can be useful for aggregating the results of multiple promises. 
    }

    else {
        console.log("El archivo tiene que ser formato .md ")
    }
}
module.exports = mdLinks;