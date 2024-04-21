export const joiValidation = (schema) => (req, res, next) => {
    const { body } = req;
    const { error } = schema.validate(body);

    if(error){
        // Validation fail
        console.log('Validation error====>', error.details[0].message)
        res.status(400).json({
            message: error.details[0].message
        })
    }
    else{
        // Validation Successful
        next();
    }
}