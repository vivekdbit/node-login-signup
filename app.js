const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();

app.listen(8080);
app.use(express.json());
console.log("server started!...");

// jwt secret token
app.set('secretKey', 'nodeRestApi'); 

// Bcrypt SaltRound
app.set('saltRounds', 10);

// Token Verification code
app.all("/api/*", (req,res,next) => {
    try{
        const token = req.header("token");
        if(!token){
            res.status(403).send('Token not present');
        } else {
            jwt.verify(token,req.app.get('secretKey'), (err,decoded) => {
                if(!err){
                    next();
                } else {
                    res.status(500).send('Invalid Token');
                }
            })
        }
    } catch(e){
        throw(e);
    }
})

const DataRouter = require('./api/api-user-login');
app.use('/auth',new DataRouter().dataRouter);

const UserRouter = require('./api/api-user');
app.use('/api/v1/user', new UserRouter().userRouter);

const DataIngestionRouter = require('./api/api-data-ingestion');
app.use('/api/v1/ingest', new DataIngestionRouter().dataIngestionRouter);




