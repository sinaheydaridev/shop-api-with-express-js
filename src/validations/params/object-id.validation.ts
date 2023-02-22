import mongoose from "mongoose";
import { BadRequestException } from "utils";

export const objectIdValidation = ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new BadRequestException(`${name} not valid`);
};
