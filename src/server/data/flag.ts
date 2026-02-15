// Stores persistence data about flags
// This may mean flags per series, or flag data

import type { FlagData } from "@shared/flag";
import { randomUUIDv7 } from "bun";
import type { Collection, Document } from "mongodb";
import type { Registry } from "../types/registry";

class DisplayRegistry implements Registry {
    db?: Collection<FlagData & Document>;
    name: string = "Display Registry";

    async init(collection: Collection<FlagData & Document>): Promise<void> {
        this.db = collection
    }

    async findById(id: string): Promise<FlagData | null> {
        if (!this.db) throw new Error("Database not initialized");
        return await this.db.findOne({ id });
    }

    async findByKey(key: string): Promise<FlagData | null> {
        if (!this.db) throw new Error("Database not initialized");
        return await this.db.findOne({ key });
    }

    async newControlller(controller: Omit<FlagData, "id">): Promise<FlagData> {
        if (!this.db) throw new Error("Database not initialized");
        const id = randomUUIDv7();
        await this.db.insertOne({ ...controller, id });
        return { id, ...controller };
    }

    async deleteDisplay(id: string): Promise<void> {
        if (!this.db) throw new Error("Database not initialized");
        await this.db.deleteOne({ id });
    }
}


export default new DisplayRegistry();