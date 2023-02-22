import { Gender } from "enums";
import joi from "joi";

export interface RegisterBody {
  username: string;
  email: string;
  password: string;
  mobileNumber: string;
  birthYear: number;
  skillSet: string[];
  is_active: boolean;
  image?: string;
  gender: Gender;
}

export const registerValidation = (body: RegisterBody) => {
  return joi
    .object<RegisterBody>({
      username: joi.string().alphanum().min(3).max(25).trim(true).required(),
      email: joi.string().email().trim(true).required(),
      password: joi.string().min(8).trim(true).required(),
      mobileNumber: joi.string().length(10).required(),
      // .pattern(/[6-9]{1}[0-9]{9}/)
      // .required(),
      birthYear: joi.number().integer().min(1920).max(2000),
      skillSet: joi
        .array()
        .items(joi.string().alphanum().trim(true))
        .default([]),
      is_active: joi.boolean().default(true),
      gender: joi.string().valid(...Object.values(Gender)),
    })
    .validate(body);
};
