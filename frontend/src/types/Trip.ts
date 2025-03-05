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
}

export type SearchedTrip = Pick<
  Trip,
  "startStation" | "endStation" | "startTime" | "passenger" | "discount"
>;

export interface TripSegment {
  trainType: string;
  duration: string;
  transfers: number;
}

export interface ExtendedTrip extends Trip {
  segments: TripSegment[];
}
