const MongoClient = require('mongodb').MongoClient;

class DatabaseAsyncAwait {

    constructor(){
        const url = 'mongodb://localhost:27017';
        this.client = new MongoClient(url, { useNewUrlParser: true })
        this.db = "employeedb"
    }

    async read(readParams){
        try{
            const conn = await this.client.connect();
            const db = conn.db(this.db);
            const collection = db.collection(readParams.collection);
            const docs = await collection
                               .find(readParams.criteria,readParams.projection)
                               .toArray();
            return docs;
        } catch (e){
            throw(e);
        }
    }

    async readOne(readParams){
        try{
            const conn = await this.client.connect();
            const db = conn.db(this.db);
            const collection = db.collection(readParams.collection);
            const docs = await collection
                               .findOne(readParams.criteria,readParams.projection);
            return docs;
        } catch (e){
            throw(e);
        }
    }

    async write(writeParams) {
        try{
            const conn = await this.client.connect();
            const db = conn.db(this.db);
            const collection = db.collection(writeParams.collection);
            const docs = await collection.insertOne(writeParams.criteria,writeParams.projection);
            return docs;
        } catch (e){
            throw(e);
        }
    }

    async writeMany(writeParams) {
        try{
            const conn = await this.client.connect();
            const db = conn.db(this.db);
            const collection = db.collection(writeParams.collection);
            const docs = await collection.insertMany(writeParams.criteria,writeParams.projection);
            return docs;
        } catch (e){
            throw(e);
        }
    }

    async update(updateParams) {
        try{
            const conn = await this.client.connect();
            const db = conn.db(this.db);
            const collection = db.collection(updateParams.collection);
            const docs = await collection.updateOne(updateParams.criteria,updateParams.projection);
            return docs;
        } catch (e){
            throw(e);
        }
    }

    async updateMany(updateParams) {
        try{
            const conn = await this.client.connect();
            const db = conn.db(this.db);
            const collection = db.collection(updateParams.collection);
            const docs = await collection.updateMany(updateParams.criteria,updateParams.projection);
            return docs;
        } catch (e){
            throw(e);
        }
    }
    
    async delete(deleteParams) {
        try{
            const conn = await this.client.connect();
            const db = conn.db(this.db);
            const collection = db.collection(deleteParams.collection);
            const docs = await collection.updateMany(deleteParams.criteria);
            return docs;
        } catch (e){
            throw(e);
        }
    }
}

module.exports=DatabaseAsyncAwait