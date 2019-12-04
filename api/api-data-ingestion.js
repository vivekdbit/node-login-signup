const express = require("express");
const expressRouter = express.Router();
const Database = require("../models/database-async-await");
const ObjectID = require("mongodb").ObjectID;

const fs = require('fs');
const multer = require('multer');
const csv = require('fast-csv');

const upload = multer({ dest: 'uploads/' });

// Validations Middleware
const {ValidationDataIngestion,validationErrorHandler} = require("../middleware")

class DataIngestionRouter{
    dataIngestionRouter 
    constructor(){
        this.dataIngestionRouter = expressRouter;

        this.dataIngestionRouter.post("/data_ingestion", 
                                       //v.validation.dataIngestionValidator, 
                                       upload.single('file'), (req, res) => {
            const fileRows = [];

            // Q: csvtojson library 

            // open uploaded file
            csv.fromPath(req.file.path)
                .on("data", function (data) {
                // push each row
                fileRows.push({
                    fb_id: data[0],
                    path: data[1]
                });
            })
            .on("end", async function () {
                // remove temp file
                fs.unlinkSync(req.file.path);   
                //process "fileRows" and respond
                const writeManyParams = {
                    collection      : "master_data",
                    criteria        : fileRows
                }
                try{
                    const docs = await new Database().writeMany(writeManyParams);
                    res.send(docs);
                } catch(e){
                    res.status(500).send(`${e.message}-${e.stack}`);
                } 

            });            
        })
    }
}

module.exports = DataIngestionRouter;