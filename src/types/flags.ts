import { UUID } from "node:crypto";

/* 
Every flag is in a sector
The user decides how sectors are split up
(mini-sectors, or split into 3, even one for the pitlane)

User can POST request every flag to an ID and get each flag to reference that ID
or, activate a optional setting to assign flags ID's at random as they connect to WS

Ask user for data source for cars (add later, just get the flag simulation going first)
*/

export type AssignmentID = string;
export type SectorId = UUID; // External as referenced several times

export interface Sector {
    id: SectorId;
    /**
     * Human readable name (possibly shown to flags during startup?)
     * 
     * @example "Sector 1"
     * @example "Pitlane Exit"
     * @example "Mini-Sector A"
     */
    name: string;
    /**
     * Integer ordering in the circuit
     * 
     * Will fail if numbered incorrectly or float
     */
    index: number;
    meta?: Record<string, string>; // any user metadata
};

export interface SectorLayout {
    id: UUID;
    /**
     * Human readable name
     * 
     * @example "Spa Francochamps"
     * @example "Track 1"
     */
    name: string;
    description?: string;
    sectors: Sector[]; // user-defined sectors, arbitrary length
    pitlaneSectorId?: SectorId;
    createdAt: string; // ISO timestamp
    updatedAt?: string;
};

// The following Hex colour codes are sourced from personal opinion
export enum FlagColor {
    GREEN = "GREEN", // #0fb400
    YELLOW = "YELLOW", // #fffb00
    RED = "RED", // #ff0000
    BLUE = "BLUE", // #0026ff
    WHITE = "WHITE", // #FFFFFF
    BLACK = "BLACK", // #000000
    CHECKERED = "CHECKERED"
}

export interface Flag {
    flag: FlagColor
    /**
     * HTML SVG representation of flag
     */
    html: string;
    /**
     * Hex of flag colour
     */
    colour: string;
    /**
     * For custom flags, optionally defined filename, saved in /data/flags/images
     */
    filename?: string;
}

export interface FlagState {
    color: FlagColor;
    data: Flag;
    timestamp: string; // ISO timestamp for this update
};