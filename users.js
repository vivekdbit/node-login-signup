const Database = require("./database-async-await");

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
}

module.exports = Users;