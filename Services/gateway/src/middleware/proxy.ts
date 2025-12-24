import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, NextFunction } from "express";
import { IncomingMessage, ServerResponse } from "http";
import { loadRoutesConfig } from "../utils/loadRoutes";


export function proxyHandler(req: Request, res: any, next: NextFunction) {
  
  const routes = loadRoutesConfig();
  const routeConfig = routes[req.path];
console.log(
  `[GATEWAY] ${req.method} ${req.originalUrl} → ${routeConfig.target}`
);
  if (!routeConfig) {
    return res.status(404).json({
      error: "Route not found in gateway configuration",
    });
  }

  if (!routeConfig.methods.includes(req.method as any)) {
    return res.status(405).json({
      error: "HTTP method not allowed for this route",
    });
  }


  return createProxyMiddleware({
  target: routeConfig.target,
  changeOrigin: true,
  timeout: 5000,
  proxyTimeout: 5000,

  on: {
    error(err: any, req: any, res: any) {
      console.error("Proxy Error:", err.message);

      if (res && !res.headersSent) {
        res.writeHead(502, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: "Target service unreachable",
          })
        );
      }
    },
  },
})(req, res, next);

}
