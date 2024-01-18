let http=require('http');

let express=require('express');

let fs=require('fs')

let app=express();

let bodyparser=require('body-parser')

app.use(bodyparser.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    fs.readFile('massage.txt',(err,data)=>{
        if(err){
            console.log(err);
            data="No chat exists"
        }
        res.send(
            `${data}<form action='/' onsubmit=document.getElementById('username').value=localStorage.getItem('username') method="post">
        <input type="text" name="massage" id="massage">
        <input type="hidden" name="username" id="username">
        <button type="submit">send massage</button>
        </form>`
        );
    })
    
})

app.post('/',(req,res)=>{
    
    console.log(req.body.username);
    console.log(req.body.massage);
    fs.writeFile("massage.txt",`${req.body.username}:${req.body.massage}`,{flag:'a'},(err)=>{
        if(err){
            console.log(err)
        };
    },
        res.redirect('/')
    );
})

app.get('/login',(req,res,next)=>{
    res.send('<form action="/product" method="POST" onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)"><input type="text" id="username" name="username"><button type="submit">Login</button></form>')
})

app.post('/product',(req,res,next)=>{
    //console.log(req.body)
    res.redirect('./')
})



let servar=http.createServer(app)

servar.listen(1001)