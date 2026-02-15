// Stores persistence data about displays
// Passes auth data to managers/auth.ts

import type { Display } from "@shared/display";
import { randomUUIDv7 } from "bun";
import type { Collection, Document } from "mongodb";
import type { Registry } from "../types/registry";

class DisplayRegistry implements Registry {
	db?: Collection<Display & Document>;
	name: string = "Display Registry";
	collName: string = "displays";

	async init(collection: Collection<Display & Document>): Promise<void> {
		this.db = collection;
	}

	async findById(id: string): Promise<Display | null> {
		if (!this.db) throw new Error("Database not initialized");
		return await this.db.findOne({ id });
	}

	async findByKey(key: string): Promise<Display | null> {
		if (!this.db) throw new Error("Database not initialized");
		return await this.db.findOne({ key });
	}

	async newDisplay(display: Omit<Display, "id">): Promise<Display> {
		if (!this.db) throw new Error("Database not initialized");
		const id = randomUUIDv7();
		await this.db.insertOne({ ...display, id });
		return { id, ...display };
	}

	async deleteDisplay(id: string): Promise<void> {
		if (!this.db) throw new Error("Database not initialized");
		await this.db.deleteOne({ id });
	}
}

export default new DisplayRegistry();
