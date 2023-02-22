import joi from "joi";

export interface ForgetPasswordBody {
  email: string;
}

export const forgetPasswordValidation = (body: ForgetPasswordBody) => {
  return joi
    .object<ForgetPasswordBody>({
      email: joi.string().email().trim(true).required(),
    })
    .validate(body);
};
