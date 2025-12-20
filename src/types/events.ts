import type { customLevel } from "logmatic";

// Global event register for all classes
export interface ClassEvents {
	// Logging
	"log:log": [customLevel, unknown[]];
	"log:class": [customLevel, unknown[]];

	// Device events
	"devices:all": [unknown[]];
	"devices:controller": [unknown[]];
	"devices:display": [unknown[]];
	"devices:manager": [unknown[]];
	[k: `devices:device_${string}`]: unknown[];

	// WebSocket events
	"ws:connection": [number];
	"ws:disconnection": [number];
	"ws:device_init": [string, unknown];

	// HTTP events
	"http:request": [string, string];
}
