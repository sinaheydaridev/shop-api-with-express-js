import { Gender } from "enums";
import User from "models/user.model";
import { hashPassword } from "utils/password";

export const createUserSeedData = async () => {
  await User.create({
    email: "test@test.com",
    username: "superuser",
    password: await hashPassword("12345678"),
    mobileNumber: "1234567890",
    birthYear: 1950,
    skillSet: [],
    gender: Gender.Male,
    isVerifyEmail: true,
    profileImage: "upload",
  });
};
