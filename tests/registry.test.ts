import { describe, expect, mock, test } from "bun:test";
import controller from "../src/server/data/controller";
import display from "../src/server/data/display";
import flag from "../src/server/data/flag";
// import track from "../src/server/data/track";
import { MongoClient } from "mongodb";

const db = new MongoClient("mongodb://localhost:27017").db("test-flag-display");

describe("registry testing", () => {
	describe("controller registry", async () => {
		await db.dropCollection(controller.collName);
		const coll = db.collection(controller.collName);

		const data = {
			id: "string",
			key: "string",
			name: "string",
			description: "string",
		};

		coll.insertOne(data);

		const findOne = mock(({ id }) => coll.findOne({ id }));
		const insertOne = mock((doc) => coll.insertOne(doc));
		const deleteOne = mock(({ id }) => coll.deleteOne({ id }));

		// biome-ignore lint/suspicious/noExplicitAny: stop complaining its testing
		controller.init({ findOne, insertOne, deleteOne } as any);
		

		coll.insertOne(data);

		test("findById returns correct data", async () => {
			const result = await controller.findById(data.id);
			expect(findOne).toHaveBeenNthCalledWith(1, { id: data.id });
			expect(result).toEqual(data);
		});
		test("findById returns null for non-existent ID", async () => {
			const result = await controller.findById("non-existent-id");
			expect(findOne).toHaveBeenNthCalledWith(1, { id: "non-existent-id" });
			expect(result).toBeNull();
		});
		test("findById returns null for non-existent ID", async () => {
			const result = await controller.newController({
				name: "controller",
				description: "desc",
				key: "key",
			});
			expect(insertOne).toHaveBeenNthCalledWith(1, {
				name: "controller",
				description: "desc",
				key: "key",
			});
			expect(result).toBeTruthy();
		});
	});
});
