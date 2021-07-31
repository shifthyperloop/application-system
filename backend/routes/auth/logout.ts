import express from "express";

const logout = async (req: express.Request, res: express.Response) => {
  res.cookie("authorization", "", {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expires: new Date(),
  });
  res.json({data: 'ok'});
}

export default logout;