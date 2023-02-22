import joi from "joi";

export interface LoginBody {
  email: string;
  password: string;
}

export const loginValidation = (body: LoginBody) => {
  return joi
    .object<LoginBody>({
      email: joi.string().email().trim(true).required(),
      password: joi.string().min(8).trim(true).required(),
    })
    .validate(body);
};
