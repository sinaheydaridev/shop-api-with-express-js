import joi from "joi";

export interface ChangePasswordBody {
  password: string;
  newPassword: string;
}

export const changePasswordValidation = (body: ChangePasswordBody) => {
  return joi
    .object<ChangePasswordBody>({
      password: joi.string().trim(true).min(8).required(),
      newPassword: joi.string().trim(true).min(8).required(),
    })
    .validate(body);
};
