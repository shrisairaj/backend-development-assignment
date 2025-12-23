import { Router, Request, Response } from "express";

const router = Router();


router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    service: "task-service",
    endpoint: "/tasks",
    message: "Tasks endpoint is working"
  });
});


export default router;
