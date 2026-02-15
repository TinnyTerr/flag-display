// Stores persistence data about flags
// This may mean flags per series, or flag data

import { randomUUIDv7 } from "bun";
import type { Collection, Document } from "mongodb";
import type { Registry } from "../types/registry";
import type { Series } from "@shared/series";

class DisplayRegistry implements Registry {
    db?: Collection<Flag & Document>;
    name: string = "Display Registry";

    async init(collection: Collection<Flag & Document>): Promise<void> {
        this.db = collection
    }

    async findById(id: string): Promise<Flag | null> {
        if (!this.db) throw new Error("Database not initialized");
        return await this.db.findOne({ id });
    }

    async findByKey(key: string): Promise<Flag | null> {
        if (!this.db) throw new Error("Database not initialized");
        return await this.db.findOne({ key });
    }

    async newControlller(controller: Omit<Flag, "id">): Promise<Flag> {
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

interface Flag {
    id: string;
    name: string;
    description: string;
    series: Series[]
}

export default new DisplayRegistry();