import type http from "node:http";
import { WebSocketServer } from "ws";
import type { TopManager } from "./top.js";

export class WebsocketManager {
    wss;
    connectionList;
    constructor(server: http.Server, private top: TopManager) {
        this.wss = new WebSocketServer({ server });
        this.connectionList = new Set();

        this.wss.on("connection", (ws) => {
            const connId = Math.floor(Math.random() * 1e6);
            this.connectionList.add(ws);
            this.top.eventHandler.emit("ws:connection", connId);

            ws.on("close", () => {
                this.connectionList.delete(ws);
                this.top.eventHandler.emit("ws:disconnection", connId);
            });

            ws.on("message", (data) => {
                let parsed: unknown;
                try {
                    parsed = JSON.parse(data.toString());
                } catch {
                    return;
                }

                if (parsed.type === "device_init" && parsed.deviceId) {
                    this.top.eventHandler.emit("ws:device_init", parsed.deviceId, parsed.payload);
                }
            });
        })
    }
}