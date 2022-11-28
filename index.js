const e = require('express');
var express = require('express')
const app = express();
const jwt = require('jsonwebtoken')

app.get('/api', function (req,res){
res.json({
    text: "api"
})
})

app.get('/api/login', function(req,res){
   const user = {id:3}
   const token = jwt.sign({user},'secret')
   res.json({
    token: token
})

})

const checktoken = (req,res,next)=>{
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const barer = bearerHeader.split(" ")
        const bearerToken = barer[1];
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403)
    }
}

app.get('/api/protected',checktoken, function(req,res){
    jwt.verify(req.token,'secret',function(err,data){
        if(err){
        res.sendStatus(403)
        }else{
            res.json({
                text:"this is protected",
                data:data
            })
        }
    })
    res.json({
        text: "this is protected"
    })
})




app.listen(3005,()=>{
    console.log("running 3005")
})