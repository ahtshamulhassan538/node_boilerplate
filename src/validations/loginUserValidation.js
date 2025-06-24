const Joi = require("joi");
const responseHandler = require("../utils/apiResponseUtil");

const loginUserValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "email is required",
    "any.required": "email is required",
    "string.email": "email must be a valid email",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "password is required",
    "any.required": "password is required",
    "string.min": "password should have a minimum length of 6",
  }),
});

const loginValidation = (req, res, next) => {
  const { error } = loginUserValidationSchema.validate(req.body);
  if (error) {
    return responseHandler.errorResponse(res, error.details[0].message, 422);
  }
  next();
};

module.exports = { loginValidation };
