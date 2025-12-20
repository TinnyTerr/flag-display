import type { TopManager } from "./top.js";

export class DeviceManager {
	constructor(private top: TopManager) {
        this.top.eventHandler.on("devices:all", (data) => {});
    }
}
