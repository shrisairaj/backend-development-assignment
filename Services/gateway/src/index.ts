import express from "express";
import { proxyHandler } from "./middleware/proxy";
import { authenticate } from "./middleware/auth";
import { rateLimiter } from "./middleware/rateLimiter";
import { validateRequest } from "./middleware/validate";
import { commonValidationRules } from "./utils/validationRules";

const app = express();
const PORT = 3000;

app.use(express.json());

// app.get("/health", (req, res) => {
//   res.json({ status: "API Gateway running" });
// });
app.get("/", (_req, res) => {
  res.json({
    service: "api-gateway",
    status: "running",
    version: "1.0.0",
  });
});

// Auth
app.use(authenticate);

// Rate limit
app.use(rateLimiter);

// Validation
app.use(commonValidationRules);
app.use(validateRequest);

// Forward
app.use(proxyHandler);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
