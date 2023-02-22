import joi from "joi";

export interface ChangeProfileImageBody {
  file: Express.Multer.File | undefined;
}

export const changeProfileImageValidation = (body: ChangeProfileImageBody) => {
  return joi
    .object<ChangeProfileImageBody>({
      file: joi.required(),
    })
    .validate(body);
};
