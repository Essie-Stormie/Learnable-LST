import { model, Schema } from "mongoose";
import { VirtualCard } from "../types/virtualCard.type";
import { encrypt, decrypt } from "../utils/crypto.util";

const THREE_YEARS_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 365 * 3;

const virtualCardSchema = new Schema<VirtualCard>(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Account ID is required"],
    },
    cardNumber: {
      type: String,
      required: [true, "Card number is required"],
      set: (cardNumber: string) => encrypt(cardNumber),
    },
    expiryDate: {
      type: String,
      required: [true, "Expiry date is required"],
      default: new Date(Date.now() + THREE_YEARS_IN_MILLISECONDS).toString(),
      set: (expiryDate: unknown) =>
        encrypt(new Date(expiryDate as string).toString()),
    },
    cvv: {
      type: String,
      required: [true, "CVV is required"],
      min: [3, "CVV must be 3 digits"],
      max: [3, "CVV must be 3 digits"],
      set: (cvv: string) => encrypt(cvv),
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

// Decrypt encrypted fields using virtuals
virtualCardSchema.virtual("cardNumberDecrypted").get(function () {
  return decrypt(this.cardNumber);
});

virtualCardSchema.virtual("expiryDateDecrypted").get(function () {
  return new Date(decrypt(this.expiryDate));
});

virtualCardSchema.virtual("cvvDecrypted").get(function () {
  return decrypt(this.cvv);
});

export const virtualCardModel = model("VirtualCard", virtualCardSchema);
