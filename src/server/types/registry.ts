export interface Registry {
    readonly name: string;

    init?(collection: unknown): Promise<void>;
}