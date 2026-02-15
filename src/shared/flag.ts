import type { Series } from "@shared/series";

export interface FlagData {
    id: string;
    name: string;
    description: string;
    series: Series[];
    display: DisplayBehaviour;
    logic: TrackLogic;
    follower?: FlagData["id"];
}

enum DisplayBehaviour {
    Static = "Static",
    Flashing = "Flashing",
    Animated = "Animated",
}

enum TrackLogic {
    CarBased = "CarBased",
    SingleMarshal = "SingleMarshal",
    SectorBased = "SectorBased",
    TrackBased = "TrackBased",
    PitBased = "PitBased",
}