import http from "node:http";
import express from "express";
import type { TopManager } from "./top.js";

export class HttpManager {
	app;
	// @ts-expect-error: It is defined...
	public server: http.Server;
	constructor(
		port: number,
		private top: TopManager,
	) {
		this.app = express();

		this.assignRoutes(this.app).then(() => {
			this.server = http.createServer(this.app).listen(port);
		});
	}

	async assignRoutes(app: typeof this.app) {}
}
