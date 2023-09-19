import joi from "joi"


export const createAccount = joi.object({
    userName: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().email.required(),
    confirm: joi.ref("password"),
})

export const signInUser = joi.object({
    email: joi.string.email.required(),
    password: joi.string.pattern.required()
})