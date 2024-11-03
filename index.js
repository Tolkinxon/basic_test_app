const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res)=>{

    const headers = {
        'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      };


    if(req.url == '/'){
        fs.readFile(path.join(__dirname, "index.html"), "utf-8", (err, content)=>{ if(err){throw err}  res.end(content) })
    }

    if(req.method === 'POST'){
        const body = [];
        req.on('data', data => {
            body.push(Buffer.from(data).toString())
            console.log(body)
        })
    }

    if(req.url === '/api/users'){
        res.writeHead(200, headers);
        fs.readFile(
            path.join(__dirname, "data_base", "users.json"),  
            
            (err, data) => {
                if(err) throw err
                res.end(Buffer.from(data).toString());        
            })
    }
});

server.listen('5000',()=>{
    console.log('server initialized');    
});


