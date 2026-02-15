export interface Registry {
    readonly name: string;
    readonly collName: string;

    init?(collection: unknown): Promise<void>;
}