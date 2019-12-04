const { check, validationResult } = require('express-validator');
const Users = require("../models/users");

class ValidationLogin{

    static signupValidator(){

        return [ check('first_name')
                    .isAlpha().withMessage('Name should not contain numbers.')
                    .matches(/^[A-Z]/).withMessage('First letter should be capital letter.'),
                check('mobile')
                    .not().isEmpty().withMessage('Mobile should not be empty')
                    .isNumeric().withMessage('Mobile should be numeric'),
                check('password')
                    .isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
                check('email')
                    .isEmail().withMessage('Invalid E-mail ID'),
                check('email').custom(value => {
                    return new Users().findByEmail(value).then(user => {
                        if (user) {
                            return Promise.reject('E-mail already in use');
                        }
                    });
                })
            ]
    }

    static loginValidator(){
        return [
                check('email')
                    .isEmail().withMessage('Invalid E-mail ID'),
                check('password')
                    .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
        ]
    }
}

module.exports = ValidationLogin;