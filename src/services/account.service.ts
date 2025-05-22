import { accountModel } from "../models/account.model";
import { AccountCreation, AccountVirtual } from "../types/account.type";
import { decrypt } from "../utils/crypto.util";
import { generateAccountNumber } from "../utils/finance.util";
import { virtualCardService } from "./virtualCard.service";

class AccountService {
  async createAccount(data: AccountCreation) {
    const accountNumber = generateAccountNumber();
    const account = await accountModel.create({
      ...data,
      accountNumber,
    });

    // Create a virtual card for the account
    await virtualCardService.createVirtualCard(account._id);

    return account.populate<AccountVirtual<"virtualCards">>("virtualCards");
  }

  async getAllAccounts() {
    return accountModel
      .find()
      .populate<AccountVirtual<"virtualCards">>("virtualCards");
  }

  /**
   * Returns decrypted values of all keys provided in the body
   * If an invalid encryption is found, it becomes null
   */
  getRecursiveDecryptions(obj: RecursiveRecord) {
    const results: Record<string, unknown> = {};

    for (const prop in obj) {
      const originalValue = obj[prop];
      const decryptedValue =
        typeof originalValue === "string"
          ? decrypt(originalValue)
          : Array.isArray(originalValue)
          ? originalValue.map((item) =>
              typeof item === "string"
                ? decrypt(item)
                : this.getRecursiveDecryptions(item)
            )
          : this.getRecursiveDecryptions(originalValue);
      results[prop] = originalValue === decryptedValue ? null : decryptedValue;
    }

    return results;
  }
}

export const accountService = new AccountService();
