const {body, validationResult} = require('express-validator')

const validationRules = () => {
    return [
        body("Name").trim().notEmpty().isString().withMessage('please enter name'),
        body("setNumber").trim().notEmpty().isFloat().withMessage('please enter a set number'),
        body("peacesCount").trim().notEmpty().isInt().withMessage('please enter a peace count'),
        body("Theme").trim().notEmpty().isString().withMessage('please enter theme'),
        body("price").trim().notEmpty().isFloat().withMessage('please enter price'),
        body("Age").trim().notEmpty().isInt().withMessage('please enter name'),
        body("minifigs").trim().notEmpty().isInt().withMessage('please enter name')
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next()
    }
    const extractedError = [];
    errors.array().map(err => {
        extractedError.push({[err.param]: err.msg})
        return res.status(400).json({err : extractedError})
    })
}

module.exports = {validationRules, validate}