import joi from "joi";

export interface VerificationEmailBody {
  token: string;
}

export const verificationEmailValidation = (body: VerificationEmailBody) => {
  return joi
    .object<VerificationEmailBody>({
      token: joi.string().trim(true).required(),
    })
    .validate(body);
};
