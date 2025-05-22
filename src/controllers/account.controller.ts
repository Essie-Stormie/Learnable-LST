import { Request, Response } from "express";
import { accountService } from "../services/account.service";

class AccountController {
  async createAccount(req: Request, res: Response) {
    const createdAccount = await accountService.createAccount(req.body);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: createdAccount,
    });
  }

  async getAllAccounts(req: Request, res: Response) {
    const accounts = await accountService.getAllAccounts();

    res.status(200).json({
      success: true,
      message: "Accounts retrieved successfully",
      data: accounts,
    });
  }

  async getDecryptions(req: Request, res: Response) {
    res.json({
      sucess: true,
      message: "Encrypted values parsed successfully",
      data: accountService.getRecursiveDecryptions(req.body),
    });
  }
}

export const accountController = new AccountController();
