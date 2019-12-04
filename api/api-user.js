const express = require("express");
const expressRouter = express.Router();
const Database = require("../models/database-async-await");
const ObjectID = require("mongodb").ObjectID;
const bcrypt = require('bcrypt');

// Validations Middleware
const {ValidationUser,validationErrorHandler} = require("../middleware")

class UserRouter{
    userRouter 
    constructor(){
        this.userRouter = expressRouter;

        this.userRouter.put("/change_password", 
        ValidationUser.changePasswordValidator(), 
        validationErrorHandler.handleErrors, 
        async (req, res) => {
            try{
                let dat = { $set: {
                    'password' : bcrypt.hashSync(req.body.new_password, req.app.get('saltRounds')),
                    'updated_at' : new Date()
                } 
                };
                const updateParams = {
                    collection      : "users",
                    criteria        : { "_id": new ObjectID(req.body.id) },
                    data            : dat
                }
                const docs = await new Database().update(updateParams);
                res.send(docs);
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            } 
        })

        this.userRouter.put("/my_profile/:id", 
        ValidationUser.updateProfileValidator(), 
        validationErrorHandler.handleErrors, 
        async (req, res) => {

            let dat = { $set: {
                    'first_name' : req.body.first_name,
                    'last_name'  : req.body.last_name,
                    'mobile'     : req.body.mobile,
                    'role'       : {
                        'super_admin' :   true,
                        'admin' : false,
                        'user'  : false
                    },
                    'updated_at' : new Date()
                } 
            };
            try{
                const updateParams = {
                    collection      : "users",
                    criteria        : { "_id": new ObjectID(req.params.id) },
                    data            : dat
                }
                const docs = await new Database().update(updateParams);
                res.send(docs);
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            } 
        })

        this.userRouter.get("/my_profile/:id", 
        ValidationUser.getProfile(), 
        validationErrorHandler.handleErrors, 
        async (req, res) => {            
            try{
                const readParams = {
                    collection      : "users",
                    criteria        : { "_id": new ObjectID(req.params.id) },
                    projection      : {}
                }
                const docs = await new Database().readOne(readParams);
                if(docs){
                    res.send(docs);
                } else {
                    throw new Error('Profile Id does not exist.');
                }
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            } 
        })

    }
}

module.exports = UserRouter;