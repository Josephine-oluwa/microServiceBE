import joi from "joi"

let regex =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;


export const createAccount = joi.object({
    userName: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().email.required(),
    confirm: joi.ref("password")

})
