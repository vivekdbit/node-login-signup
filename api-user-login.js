const express = require("express");
const expressRouter = express.Router();
const Database = require("./database-async-await");
const ObjectID = require("mongodb").ObjectID;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Validations Middleware
const v = require('./middleware/validations');

class DataRouter{
    dataRouter 
    constructor(){
        this.dataRouter = expressRouter;

        this.dataRouter.get("/login", v.validation.loginValidator, async (req,res) => {    
            const readParams = {
                collection      : "users",
                criteria        : { "email" : req.body.email},
                projection      : {}
            }

            try{
                const docs = await new Database().readOne(readParams);
                if(docs){
                    if(bcrypt.compareSync(req.body.password, docs.password)) {
                    
                        const token = jwt.sign({email: docs.email}, 
                                                req.app.get('secretKey'), 
                                                { expiresIn: '1h' });
            
                        return res.send({status:"success", 
                                        message: "user found!!!", 
                                        data:
                                            {user: docs, 
                                            token:token}
                                        });
                        
                    }else{
                        return res.send({status:"error", 
                                message: "Invalid Mobile/password!!!", 
                                data:null});
                    }
                } else {
                    return res.send({status:"error", 
                            message: "User not found!!!", 
                            data:null});
                }
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            }
        })

        this.dataRouter.post("/signup", v.validation.signupValidator, async (req, res) => {

            let dat = req.body;
            dat.password = bcrypt.hashSync(dat.password, saltRounds);

            const writeParams = {
                collection      : "users",
                criteria        : dat,
                projection      : {}
            }
            try{
                const docs = await new Database().write(writeParams);
                res.send(docs)
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            }
        })
    }
}

module.exports = DataRouter;