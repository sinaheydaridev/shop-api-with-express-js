import joi from "joi";

export interface ResetPasswordBody {
  token: string;
  userId: string;
  password: string;
}

export const resetPasswordValidation = (body: ResetPasswordBody) => {
  return joi
    .object<ResetPasswordBody>({
      token: joi.string().trim(true).required(),
      userId: joi.string().trim(true).required(),
      password: joi.string().min(8).trim(true).required(),
    })
    .validate(body);
};
