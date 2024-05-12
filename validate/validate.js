const validator = require('../helpers/validate');


const validate = (req, res, next) => {
    const validationRule = {
        Name: 'required|string',
        setNumber: 'required|string',
        peacesCount: 'required|string',
        Theme: 'required|string',
        price: 'string',
        Age: 'string',
        minifigs: 'string',
      };
      validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
          res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
          });
        } else {
          next();
        }
      });
};

module.exports = {validate};