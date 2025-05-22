import { VirtualCard } from "./virtualCard.type";

export interface AccountCreation {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
}

export interface Account extends Omit<AccountCreation, "dateOfBirth"> {
  accountNumber: string;
  dateOfBirth: string;
  phoneNumberDecrypted: string;
  dateOfBirthDecrypted: Date;
}

interface VirtualCardVirtualMap {
  virtualCards: VirtualCard[];
}

export type AccountVirtual<T extends keyof VirtualCardVirtualMap> = {
  [key in T]: VirtualCardVirtualMap[key];
};
