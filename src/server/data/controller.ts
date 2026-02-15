// Stores persistence data about controllers
// Passes auth data to managers/auth.ts

import type { Controller } from "@shared/controller";
import { randomUUIDv7 } from "bun";
import type { Collection, Document } from "mongodb";
import type { Registry } from "../types/registry";

class ControllerRegistry implements Registry {
    db?: Collection<Controller & Document>;
    name: string = "Controller Registry";
    collName: string = "controllers";

    async init(collection: Collection<Controller & Document>): Promise<void> {
        this.db = collection
    }

    async findById(id: string): Promise<Controller | null> {
        if (!this.db) throw new Error("Database not initialized");
        return await this.db.findOne({ id });
    }

    async findByKey(key: string): Promise<Controller | null> {
        if (!this.db) throw new Error("Database not initialized");
        return await this.db.findOne({ key });
    }

    async newController(controller: Omit<Controller, "id">): Promise<Controller> {
        if (!this.db) throw new Error("Database not initialized");
        const id = randomUUIDv7();
        await this.db.insertOne({ ...controller, id });
        return { id, ...controller };
    }

    async deleteController(id: string): Promise<void> {
        if (!this.db) throw new Error("Database not initialized");
        await this.db.deleteOne({ id });
    }
}

export default new ControllerRegistry();