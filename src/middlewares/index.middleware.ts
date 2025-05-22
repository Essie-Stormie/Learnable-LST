import express from "express";

export const indexMiddleware = express.Router();

indexMiddleware.use(express.json());
indexMiddleware.use(express.urlencoded({ extended: true }));
