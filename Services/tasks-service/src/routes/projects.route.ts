import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    service: "task-service",
    endpoint: "/projects",
    message: "Projects endpoint is working"
  });
});

export default router;
