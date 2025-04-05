import type { Passenger } from "./Passenger";
import type { DiscountType } from "./Passenger";
export interface Trip {
  id: number;
  startstation: string;
  endstation: string;
  starttime: string;
  endtime?: string;
  price?: number;
  passenger?: Passenger;
  segments: TripSegment[];
  discount: DiscountType;
  date: string;
  accessibility: Accessibility;
}

export type SearchedTrip = Pick<
  Trip,
  | "startstation"
  | "endstation"
  | "starttime"
  | "passenger"
  | "discount"
  | "date"
>;

export type Accessibility = {
  wheelchair: boolean;
  lowFloorAccess: boolean;
  assistanceAvailable: boolean;
};

export interface TripSegment {
  trainType: string;
  duration: string;
  transfers: number;
}

export interface TripUpdate {
  id: string;
  user_id: string;
  trip_id: string;
  message: string;
  severity: TripUpdateSeverity;
  read: boolean;
  created_at: string;
}

export enum TripUpdateType {
  DELAY = "delay",
  DISRUPTION = "disruption",
}

export enum TripUpdateSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface ExtendedTrip extends Trip {
  segments: TripSegment[];
  updates: TripUpdate[];
}
