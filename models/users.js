const Database = require("./database-async-await");
const bcrypt = require('bcrypt');
const ObjectID = require("mongodb").ObjectID;

class Users{

    async findByEmail(email){
        const readParams = {
            collection      : "users",
            criteria        : { "email" : email},
        }
        try{
            const docs = await new Database().readOne(readParams);
            if(docs){
                return docs;
            } else {
                return false;
            }
        } catch(e){
            throw(e);
        }
    }

    async validateOldPassword(oldPassword, id){
        
        const readParams = {
            collection      : "users",
            criteria        : { "_id": new ObjectID(id) },
            projection      : {}
        }

        try{
            const docs = await new Database().readOne(readParams);
            if(docs){
                if(bcrypt.compareSync(oldPassword, docs.password)) {
                    // Password Matched
                    return true;                    
                }else{
                    // Password does not matched
                    return false;
                } 
            } else {
                // User recored does not exist
                return false;
            }
        } catch(e){
            return false;
        }
    }
}

module.exports = Users;