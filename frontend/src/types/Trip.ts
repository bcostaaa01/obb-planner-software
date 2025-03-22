import type { Passenger } from "./Passenger";
import type { DiscountType } from "./Passenger";
export interface Trip {
  id: number;
  startStation: string;
  endStation: string;
  startTime: string;
  endTime?: string;
  price?: number;
  passenger?: Passenger;
  segments: TripSegment[];
  discount: DiscountType;
  date: string;
  accessibility: Accessibility;
}

export type SearchedTrip = Pick<
  Trip,
  | "startStation"
  | "endStation"
  | "startTime"
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

export interface ExtendedTrip extends Trip {
  segments: TripSegment[];
}
