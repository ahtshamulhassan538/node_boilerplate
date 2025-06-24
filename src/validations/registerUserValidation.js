// validators/userValidation.js
const Joi = require("joi");
const responseHandler = require("../utils/apiResponseUtil");

const registerUserSchema = Joi.object({
  username: Joi.string()
    // .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.empty": "username is required",
      "any.required": "username is required",
      "string.alphanum": "username must only contain alphanumeric characters",
      "string.min": "username should have a minimum length of 3",
      "string.max": "username should have a maximum length of 30",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "password is required",
    "any.required": "password is required",
    "string.min": "password should have a minimum length of 6",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "email is required",
    "any.required": "email is required",
    "string.email": "email must be a valid email",
  }),
});

const registerValidation = (req, res, next) => {
  const { error } = registerUserSchema.validate(req.body);
  if (error) {
    return responseHandler.errorResponse(res, error.details[0].message, 422);
  }
  next();
};

module.exports = { registerValidation };
