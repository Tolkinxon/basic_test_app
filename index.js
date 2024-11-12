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

            user = {...user, page:1, isCorrect: 0}
            const compareFn = item => item.email == user.email
            if(users.some(compareFn)) res.end(JSON.stringify({message: "This email already excist", state: false}));
            else {
                users.push(user);
                fs.writeFile(path.join("database", "users.json"), JSON.stringify(users)); 
                        
                res.end(JSON.stringify({message: "This user successfully added", state: true, user:{...user}}));
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
                
            const foundedUser = users.find(item => item.email == user.email)
            if(foundedUser){
                res.end(JSON.stringify({message: 'Checking was successfully', state: true, user:{...foundedUser}}));
            }
            else {
                res.end(JSON.stringify({message: "We don't found your email please sign up", state: false}));
            }
        })
    }
    
    else if(req.url === '/users'){
            res.writeHead(200, headers);
            const users = await fs.readFile(path.join("database", "users.json"),  "UTF-8")
            res.end(users)
    }

    else if(req.url.includes('/questions')){
        res.writeHead(200, headers);
        let questions = await fs.readFile(path.join("database", "questions.json"),  "UTF-8")
            questions = questions ? JSON.parse(questions) : [];
        const page = req.url.at(-1)
        const currentQuestionPage = questions[page - 1];  
        res.end(JSON.stringify(currentQuestionPage))
    }
});

server.listen('5000',()=>{
    console.log('server initialized');    
});



