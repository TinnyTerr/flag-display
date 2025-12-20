import EventEmitter from "node:events";
import type { ClassEvents } from "../types/events.js";
import { LoggerManager } from "../utils/log.js";
import { HttpManager } from "./http.js";
import { WebsocketManager } from "./ws.js";

/**
 * Owns the webserver, socket server, and all other managers.
 * Has main update loop and registry.
 */
export class TopManager {
	eventHandler = new EventEmitter<ClassEvents>();
    logger = new LoggerManager(this)
    http = new HttpManager(Number.parseInt(process.env.port ?? "", 10) ?? 3000, this);
    wss;
    constructor() {
        this.eventHandler.setMaxListeners(50)

        this.wss = new WebsocketManager(this.http.server, this);
    }
}

export default new TopManager();
