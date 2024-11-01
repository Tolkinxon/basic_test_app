const user = require('./data');
const path = require('path');
const fs = require('fs');

const fileName = path.basename(__filename);
const dirName = path.dirname(__filename);
const extName = path.extname(__dirname)
const parse = path.parse(__filename)
const join = path.join(__dirname, "\hello.jj", "hello.kl")
const resolve = path.resolve(__dirname, "/hello", "hello.kl")

// fs.mkdir(path.join(__dirname, "hel"), (err) => {
//     if(err) throw err;
//     console.log('folder created');    
// })  

fs.writeFile(path.join(__dirname, "test", 'index.js'), "//hello tolkinxon", (err) => {
    if(err)  throw err;    
    console.log('file created successfully');    
})