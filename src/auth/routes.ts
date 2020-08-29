import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
  }
);

router.post(
  "forgot-password",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
  }
);

export default router;
