export interface Trip {
  id: number;
  startStation: string;
  endStation: string;
  startTime: string;
  endTime: string;
  price: number;
  segments: TripSegment[];
}

export interface SearchedTrip {
  startStation: string;
  endStation: string;
  startTime: string;
}

export interface TripSegment {
  trainType: string;
  duration: string;
  transfers: number;
}

export interface ExtendedTrip extends Trip {
  segments: TripSegment[];
}
