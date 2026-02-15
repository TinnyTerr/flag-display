import type express from "express";

type App = ReturnType<typeof express>;

/** All callable routing methods on an Express app */
type RouteMethod = {
	[K in keyof App]: App[K] extends (...args: unknown[]) => unknown ? K : never;
}[keyof App];

/** Narrow to only the HTTP verb methods */
type HttpMethod = Extract<
	RouteMethod,
	"all" | "get" | "post" | "put" | "patch" | "delete" | "options" | "head"
>;

/** Tuple representing a single route registration */
export type RouteDefinition = {
	method: HttpMethod;
	args: Parameters<App[HttpMethod]>;
	role?: string;
};

export interface Manager {
	routes?: RouteDefinition[];
	init?(app: App): Promise<void>;
}
