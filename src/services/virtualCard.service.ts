import { virtualCardModel } from "../models/virtualCard.model";
import { generateCardNumber, generateCVV } from "../utils/finance.util";

class VirtualCardService {
  async createVirtualCard(accountId: ObjectId) {
    await virtualCardModel.create({
      accountId,
      cardNumber: generateCardNumber(),
      cvv: generateCVV(),
    });
  }
}

export const virtualCardService = new VirtualCardService();
