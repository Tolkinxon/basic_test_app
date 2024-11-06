const { log } = require('console');
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

      
    if(req.url === '/signin'){
        res.writeHead(200, headers);
            // req.on('data', async data => {
            //    const user = JSON.parse(Buffer.from(data).toString());
            //    let   users = await fs.readFile(path.join("database", "users.json"), "UTF-8");

            //    users = users ? JSON.parse(users) : [];
            //    let response = {}

            //    const compareFn = item => item.email == user.email
            //     if(users.some(compareFn)) response = {message: "This user already excist"};
            //     else {
            //         users.push(user);
            //         fs.writeFile(path.join("database", "users.json"), JSON.stringify(users)); 
            //         response = {message: "This user successfully added"};
            //     }

            //     fs.writeFileSync(path.join("database", "responses.json"), JSON.stringify(response));   
            // });

            let user = '';
            req.on('data', async data => {
                user = JSON.parse(Buffer.from(data).toString());
            })

            req.on('end', async ()=>{
                
                    let   users = await fs.readFile(path.join("database", "users.json"), "UTF-8");
                    users = users ? JSON.parse(users) : [];
                
                    
                    const compareFn = item => item.email == user.email
                    if(users.some(compareFn)) res.end(JSON.stringify({message: "This user already excist"}));
                    else {
                        users.push(user);
                        fs.writeFile(path.join("database", "users.json"), JSON.stringify(users)); 
                        console.log(user);
                        
                        res.end(JSON.stringify({message: "This user successfully added"}));
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




// fs.readFile(
//     path.join(__dirname, "data_base", "users.json"),  
    
//     (err, data) => {
//     if(err) throw err;

//     // const newUserArr = Buffer.from(postData).toString().split('&').map(item => item.split('='));
//     // const newUserObj =  Object.fromEntries(newUserArr);

//     const users = JSON.parse(Buffer.from(data).toString())
//     const newUserObj = JSON.parse(Buffer.from(postData).toString());
//     const compareFn = item => {return item.name == newUserObj.name && item.sure_name == newUserObj.sure_name &&
//                                       item.email == newUserObj.email && item.password == newUserObj.password 
//                               }

//     console.log(newUserObj);
//     if(users.some(compareFn)){
//         res.end(JSON.stringify({message:"this user already excist"}))
//     } else {
//         users.push(newUserObj);

//         fs.writeFile(path.join(__dirname, "data_base", "users.json"), JSON.stringify(users) , (err) => {
//             if(err)  throw err;  
            
//             res.writeHead(200, { 'Content-Type': 'text/json' });
//             res.end(JSON.stringify({message:"hello world 2"}))
//         })
//     }

// })


