export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RouteConfig {
  target: string;
  methods: HttpMethod[];
}

export type RoutesMap = Record<string, RouteConfig>;
