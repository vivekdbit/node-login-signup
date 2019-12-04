const { check, validationResult } = require('express-validator');

class ValidationDataIngestion{

    dataIngestionValidator(){
        return check('file')
               .not().isEmpty().withMessage('Please upload file.')
    }
}

module.exports = ValidationDataIngestion;