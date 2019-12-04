const { check, validationResult } = require('express-validator');
const Users = require("../models/users");

class ValidationUser{
    static changePasswordValidator(){
        return  [
                check('old_password')
                    .isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
                check('new_password')
                    .isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
                check('old_password').custom((value, { req }) => {
                    return new Users().validateOldPassword(value,req.body.id).then(user => {
                        if (!user) {
                            return Promise.reject('Old Password does not match.');
                        }
                    });
                })
            ]
    }

    static updateProfileValidator(){
        return  [
                check('first_name')
                    .not().isEmpty().withMessage('First Name should not be blank.'),
                check('last_name')
                    .not().isEmpty().withMessage('Last Name should not be blank.'),
                check('mobile')
                    .not().isEmpty().withMessage('Mobile should not be blank.')
                    .isNumeric().withMessage('Mobile should be numeric')
                    .isLength({ min: 10 }).withMessage('Required 10 digit Mobile number.')
        ]
    }

    static getProfile(){
        return [
            check('id')
                    .not().isEmpty().withMessage('Profile ID not be blank.')
        ]
    }
}

module.exports = ValidationUser;