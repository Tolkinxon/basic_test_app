const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res)=>{
    if(req.url === '/'){
        res.end(`<h1>hello world</h1>`);
    }

    if(req.url === '/about'){
        res.end(`<h1>hello world</h1>`);
    }

    if(req.url === '/api/users'){
        fs.readFile(
            path.join(path.dirname(__dirname), "data_base", "users.json"),  
            
            (err, data) => {
            if(err) throw err
            console.log(Buffer.from(data));  
            res.end();          
            })
    }

});

server.listen('5000',()=>{
    console.log('server initialized');    
});