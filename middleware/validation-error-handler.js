const { validationResult } = require('express-validator');

class ValidationErrorHandlder {
  
    static handleErrors(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
             res.status(422).json({errors: errors.mapped()});
        } else {
          next();
        }
    }
}

module.exports = ValidationErrorHandlder