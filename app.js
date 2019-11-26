const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();

app.listen(8080);
app.use(express.json());
console.log("server started!...");

app.set('secretKey', 'nodeRestApi'); // jwt secret token

// Token Verification code
app.all("/api/*", (req,res,next) => {
    try{
        const token = req.header("token");
        if(!token){
            res.status(403).send();
        } else {
            jwt.verify(token,req.app.get('secretKey'), (err,decoded) => {
                if(!err){
                    next();
                } else {
                    res.status(500).send();
                }
            })
        }
    } catch(e){
        throw(e);
    }
})

app.get("/token", (req,res) => {
    const token = jwt.sign({"test":"test"}, 
                           req.app.get('secretKey'),
                           { expiresIn: '1h' });
    res.send({"token":token});
})

const DataRouter = require('./api-user-login');
app.use('/employee',new DataRouter().dataRouter);




