import joi from "joi";

export const signupSchema = joi.object({
  name: joi.string().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi
    .string()
    .required(),
  confirmPassword: joi.string().valid(joi.ref("password")),
});

export const signinSchema = joi.object({
  email: joi
  .string()
  .email()
  .required(),
  senha: joi
  .string()
  .required(),
});

export const urlSchema = joi.object({
  url: joi.string().uri().required(),
});
