const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const  createToken = require('./create-token.js');

const server = http.createServer( async (req, res)=>{

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
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

            user = {...user, page:1, isCorrect: 0, token: createToken()}
            const compareFn = item => item.email == user.email
            if(users.some(compareFn)) res.end(JSON.stringify({message: "This email already excist"}));
            else {
                users.push(user);
                fs.writeFile(path.join("database", "users.json"), JSON.stringify(users, null, 4)); 
                res.end(JSON.stringify({message: "This user successfully added", token: user.token}));
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
                res.end(JSON.stringify({message: 'Checking was successfully', token: foundedUser.token}));
            }
            else {
                res.end(JSON.stringify({message: "We don't found your email please sign up"}));
            }
        })
    }
    
    else if(req.url === '/users'){
            res.writeHead(200, headers);
            const authHeader = req.headers['authorization'];
           
            let user = '';
            req.on('data', async data => {
                answers = JSON.parse(Buffer.from(data).toString());
            })

            req.on('end', async ()=>{
                let users = await fs.readFile(path.join("database", "users.json"), "UTF-8");
                    users = users ? JSON.parse(users) : [];
    
                const editedUserIndex = users.findIndex(item => item.token == authHeader);
                if(editedUserIndex !== -1){ 
                    users[editedUserIndex] = {
                        ...users[editedUserIndex], 
                        isCorrect: users[editedUserIndex].isCorrect + answers.isCorrect,
                        page: users[editedUserIndex].page + 1
                    };
                                        
                    fs.writeFile(path.join("database", "users.json"), JSON.stringify(users, null, 4)); 
                    res.end(JSON.stringify({message: "data successfully confirmed"}));
                }
                else {
                    res.end(JSON.stringify({message: "Something went wrong please try again"}));
                }
            })
    }

    else if(req.url === '/questions'){
        res.writeHead(200, headers);
        const authHeader = req.headers['authorization'];

        let users = await fs.readFile(path.join("database", "users.json"), "UTF-8");
        users = users ? JSON.parse(users) : [];

        const foundedUser = users.find(item => item.token == authHeader)
        if(foundedUser){
            let questions = await fs.readFile(path.join("database", "questions.json"),  "UTF-8")
            questions = questions ? JSON.parse(questions) : [];
            const page = foundedUser.page
            let currentQuestionPage = questions[page - 1] || [];  
            currentQuestionPage = currentQuestionPage.sort((a, b) => 0.5 - Math.random()).slice(0, 5)
            res.end(JSON.stringify([currentQuestionPage, foundedUser]))
        }
        else {
            res.end(JSON.stringify({message: "We don't found your identity please sign up", state: false}));
        }
    }

    else if(req.url === '/statistics'){
        res.writeHead(200, headers);
        let users = await fs.readFile(path.join("database", "users.json"),  "UTF-8")
        users = users ? JSON.parse(users) : [];
        res.end(JSON.stringify(users))
    }

    else if(req.url === '/next-stage'){
        res.writeHead(200, headers);

        const authHeader = req.headers['authorization'];

        let users = await fs.readFile(path.join("database", "users.json"),  "UTF-8")
        users = users ? JSON.parse(users) : [];

        const foundedUser = users.find(item => item.token == authHeader)
        if(foundedUser){
            res.end(JSON.stringify({message: 'Checking was successfully', token: foundedUser.token}));
        }
        else {
            res.end(JSON.stringify({message: "We don't found your edentity please sign up"}));
        }
    }
    
});

server.listen('5000',()=>{
    console.log('server initialized');    
});



