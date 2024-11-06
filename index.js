const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const server = http.createServer( async (req, res)=>{

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };

      
    if(req.url === '/signup'){
        res.writeHead(200, headers);

        let user = '';
        req.on('data', async data => {
            user = JSON.parse(Buffer.from(data).toString());
        })

        req.on('end', async ()=>{
            let users = await fs.readFile(path.join("database", "users.json"), "UTF-8");
                users = users ? JSON.parse(users) : [];
                
            const compareFn = item => item.email == user.email
            if(users.some(compareFn)) res.end(JSON.stringify({message: "This user already excist", state: false}));
            else {
                users.push(user);
                fs.writeFile(path.join("database", "users.json"), JSON.stringify(users)); 
                        
                res.end(JSON.stringify({message: "This user successfully added", state: true}));
            }
        })
    } 

    else if(req.url === '/login'){
        res.writeHead(200, headers);

        let user = '';
        req.on('data', async data => {
            user = JSON.parse(Buffer.from(data).toString());
        })

        req.on('end', async ()=>{
            let users = await fs.readFile(path.join("database", "users.json"), "UTF-8");
                users = users ? JSON.parse(users) : [];
                
            const compareFn = item => item.email == user.email
            if(users.some(compareFn)){
                res.end(JSON.stringify({message: 'Checking was successfully', state: true}));
            }
            else {
                res.end(JSON.stringify({message: "We don't found your email please sign up", state: false}));
            }
        })
    }
    
    else if(req.url === '/api/users'){
            res.writeHead(200, headers);
            const users = await fs.readFile(path.join("database", "users.json"),  "UTF-8")
            res.end(users)
    }
});

server.listen('5000',()=>{
    console.log('server initialized');    
});



