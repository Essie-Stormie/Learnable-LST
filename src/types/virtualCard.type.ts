export interface VirtualCard {
  accountId: ObjectId;
  cardNumber: string;
  expiryDate: string;
  cvv: string;

  cardNumberDecrypted: string;
  expiryDateDecrypted: Date;
  cvvDecrypted: string;
}
