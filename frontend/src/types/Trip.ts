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

export interface ExtendedTrip extends Trip {
  segments: TripSegment[];
}
