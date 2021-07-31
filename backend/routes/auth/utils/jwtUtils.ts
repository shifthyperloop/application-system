import {IUser} from "../../../models/User";
import jwt from "jsonwebtoken";
import express from "express";

const tokenSecret = process.env.JWT_SECRET;

export function generateToken(user: IUser) {
  return jwt.sign({data: user._id}, tokenSecret, {expiresIn: '24h'})
}

export function setJwtToken(res: express.Response, token: string) {
  res.cookie("authorization", token, {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expires: new Date(Date.now() + 24*60*60*1000),
  });
}