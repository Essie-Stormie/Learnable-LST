import { model, Schema } from "mongoose";
import { Account } from "../types/account.type";
import { decrypt, encrypt } from "../utils/crypto.util";

const accountSchema = new Schema<Account>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: [true, "Phone number already exists"],
      set: (phoneNumber: string) => encrypt(phoneNumber),
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of birth is required"],
      set: (dateOfBirth: Date) => encrypt(dateOfBirth.toString()),
    },

    accountNumber: {
      type: String,
      required: [true, "Account number is required"],
      unique: [true, "Account number already exists"],
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

// Decrypt encrypted fields using virtuals
accountSchema.virtual("phoneNumberDecrypted").get(function () {
  return decrypt(this.phoneNumber);
});

accountSchema.virtual("dateOfBirthDecrypted").get(function () {
  return new Date(decrypt(this.dateOfBirth));
});

accountSchema.virtual("virtualCards", {
  ref: "VirtualCard",
  localField: "_id",
  foreignField: "accountId",
});

export const accountModel = model("Account", accountSchema);
