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
        req.on('data', postData => {
            fs.readFile(
                path.join(__dirname, "data_base", "users.json"),  
                
                (err, data) => {
                if(err) throw err;
    
                const body = JSON.parse(Buffer.from(data).toString())
                
                const newUserArr = Buffer.from(postData).toString().split('&').map(item => item.split('='));
                const newUserObj =  Object.fromEntries(newUserArr);
                body.push(newUserObj);
 
                fs.writeFile(path.join(__dirname, "data_base", "users.json"), JSON.stringify(body) , (err) => {
                    if(err)  throw err;    
                    console.log('file created successfully'); 
                })
            })
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


