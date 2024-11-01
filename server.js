const user = require('./data');
const path = require('path');
const fs = require('fs');
const os = require('os');
const event = require('events');
const http = require('http');

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

// fs.writeFile(path.join(__dirname, "test", 'index.txt'), "//hello tolkinxon", (err) => {
//     if(err)  throw err;    
//     console.log('file created successfully'); 
// })

// fs.appendFile(
//     path.join(__dirname, "test", "index.js"),
//     "\n//hello soliyev",
//     (err) => {
//         if(err) throw err
//         console.log("file changed");
//     }
// )

// fs.readFile(
//     path.join(__dirname, "test", "index.js"),
//     (err, data) => {
//         if(err) throw err
//         console.log(data);
//     }
// )

// fs.readFile(
//     path.join(__dirname, "test", "index.js"),
//     (err, data) => {
//         if(err) throw err
//         console.log(Buffer.from(data).toString());
//     }
// )

// fs.readFile(
//     path.join(__dirname, "test", "index.js"),
//     "utf-8",
//     (err, data) => {
//         if(err) throw err
//         console.log(data);
//     }
// )


// fs.rename(
//     path.join(__dirname, "test", "index.js"),
//     path.join(__dirname, "test", "index.txt"),
//     (err) => {
//         if(err) throw err
//     }
// )

// console.log(os.platform()); // win 32 bu operatision tizim mac os bo'lsa mac os chiqaradi
// console.log(os.machine()); //x86_64
// console.log(os.arch()); // 64
// // console.log(os.cpus()); // protsessor haqida ma'lumot beradi
// console.log(os.freemem()); //  905932800
// console.log(os.totalmem()); // 4207755264
// console.log(os.homedir()); // C:\Users\Tolkinxon
// console.log(os.uptime()); // 18396.859 notebookni ishlash vaqtini ko'rsatadi


// class Car extends event {
//     sayHello(message){
//         this.emit('message', `message is: ${message}`)
//     }
// }

// const mers = new Car()

// mers.on('message',(data)=> {
//     console.log(data)
// })

// mers.sayHello('tolkinxon');

const server = http.createServer((req, res)=> {
    console.log(req.url);
    res.write('hello word');
    res.end('server ended')
    
})

server.listen('5000', ()=>{
    console.log('server worked');    
})






