import joi from "joi";

export interface VerificationEmailLinkBody {
  email: string;
}

export const verificationEmailLinkValidation = (
  body: VerificationEmailLinkBody
) => {
  return joi
    .object<VerificationEmailLinkBody>({
      email: joi.string().email().trim(true).required(),
    })
    .validate(body);
};
