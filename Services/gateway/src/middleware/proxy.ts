import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response, NextFunction } from "express";
import { loadRoutesConfig } from "../utils/loadRoutes";

const routes = loadRoutesConfig();

export function proxyHandler(req: Request, res: Response, next: NextFunction) {
  const routeConfig = routes[req.path];

  if (!routeConfig) {
    return res.status(404).json({ error: "Route not found in gateway" });
  }

  if (!routeConfig.methods.includes(req.method as any)) {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return createProxyMiddleware({
    target: routeConfig.target,
    changeOrigin: true,
  })(req, res, next);
}
