import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per window
  message: {
    error: "Too many requests, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
