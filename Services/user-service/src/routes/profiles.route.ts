import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    service: "user-service",
    endpoint: "/profiles",
    message: "Profiles endpoint is working"
  });
});

export default router;
