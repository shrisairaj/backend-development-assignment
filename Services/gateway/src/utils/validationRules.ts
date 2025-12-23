import { header } from "express-validator";

export const commonValidationRules = [
  header("x-client-id")
    .notEmpty()
    .withMessage("x-client-id header is required"),
];
