import { type customLevel, Logger } from "logmatic";
import type { TopManager } from "../managers/top.js";

export class LoggerManager {
	log;
	logLevels: customLevel[];
	constructor(private top: TopManager) {
		this.logLevels = [
			{ name: "system", colour: "magenta" },
			{ name: "startup", colour: "cyan" },
			{ name: "info", colour: "blue" },
			{ name: "event", colour: "green" },
			{ name: "state", colour: "yellow" },
			{ name: "ws", colour: "white" },
			{ name: "warning", colour: "yellowBright" }, // chalk has "orange" via hex, or swap to hex
			{ name: "error", colour: "red" },
			{ name: "fatal", colour: "redBright" },
		] as const;

		this.log = new Logger(
			"Logger Manager",
			{
				console: {
					enabled: true,
					format: true,
					indent: 4,
					suppressWarnings: false,
					// this is the levels to omit
					logLevel: [],
				},
				functions(level, ...data) {
					// Emit log events globally
					top.eventHandler.emit("log:class", level, data);
				},
			},
			[
				{ name: "defined", colour: "bgMagenta" },
				{ name: "startup", colour: "bgCyan" },
			] as const,
		);
	}

	public createLogger(name: string): Logger<typeof this.logLevels> {
		// biome-ignore lint/suspicious/noExplicitAny: type expects any[]
		const func = (level: customLevel, ...data: any[]) => {
			// Emit log events globally
			this.top.eventHandler.emit("log:log", level, data);
		};

		return new Logger<typeof this.logLevels>(
			name,
			{
				console: {
					enabled: true,
					format: true,
					indent: 4,
					suppressWarnings: false,
					// this is the levels to omit
					logLevel: [],
				},
				functions: func
			},
			this.logLevels,
		);
	}
}
