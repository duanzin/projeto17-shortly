import joi from "joi";

export const signupSchema = joi.object({
  name: joi.string().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{1,30}$"))
    .required(),
  confirmPassword: joi.valid(userData.password),
});

export const signinSchema = joi.object({
  email: joi
  .string()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
  .required(),
  senha: joi
  .string()
  .pattern(new RegExp("^[a-zA-Z0-9]{1,30}$"))
  .required(),
});

export const urlSchema = joi.object({
  url: joi.string().uri().required(),
});
