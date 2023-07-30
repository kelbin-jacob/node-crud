const { body } = require('express-validator')

const ERROR_CODES = require('../utils/errorcodes.util');
const ERROR_MESSAGES = require('../utils/errormessages.util')

//Validator to validate the request body while adding/updating a book
const bookValidator = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage({
                errorCode: ERROR_CODES.TITILE_REQUIRED,
                message: ERROR_MESSAGES.TITILE_REQUIRED
            })
            .isString()
            .trim()
            .isLength({ min: 1, max: 25 })
            .withMessage({
                errorCode: ERROR_CODES.TITILE_MAXLENGTH,
                message: ERROR_MESSAGES.TITILE_MAXLENGTH
            }),
        body('author')
            .notEmpty()
            .withMessage({
                errorCode: ERROR_CODES.AUTHOR_REQUIRED,
                message: ERROR_MESSAGES.AUTHOR_REQUIRED
            })
            .isString()
            .trim()
            .isLength({ min: 1, max: 25 })
            .withMessage({
                errorCode: ERROR_CODES.AUTHOR_MAXLENGTH,
                message: ERROR_MESSAGES.AUTHOR_MAXLENGTH
            }),

    ]
}

module.exports = { bookValidator }



