import type { Accessibility } from "../types/Trip";

export interface TripSegment {
  trainType: string;
  duration: string;
  transfers: number;
}

export interface ExtendedTrip extends TripSegment {
  id: string;
  startStation: string;
  endStation: string;
  startTime: string;
  endTime: string;
  price: number;
  date: string;
  segments: TripSegment[];
  discount: string;
  accessibility: Accessibility;
}

type TripsByDate = {
  [key: string]: {
    [key: string]: ExtendedTrip[];
  };
};

export const mockTrips: TripsByDate = {
  "2025-03-20": {
    "Salzburg Hbf-Graz Hbf": [
      {
        id: "1",
        startStation: "Salzburg Hbf",
        endStation: "Graz Hbf",
        startTime: "14:35",
        endTime: "17:05",
        price: 29.9,
        date: "2025-03-20",
        trainType: "RJ",
        duration: "2h 30min",
        transfers: 1,
        segments: [
          {
            trainType: "RJ",
            duration: "2h 30min",
            transfers: 1,
          },
          {
            trainType: "RJ",
            duration: "1h 30min",
            transfers: 1,
          },
        ],
        discount: "without_discounts",
        accessibility: {
          wheelchair: false,
          lowFloorAccess: true,
          assistanceAvailable: true,
        },
      },
    ],
    "Graz Hbf-Salzburg Hbf": [
      {
        id: "2",
        startStation: "Graz Hbf",
        endStation: "Salzburg Hbf",
        startTime: "09:30",
        endTime: "12:00",
        price: 29.9,
        date: "2025-03-20",
        trainType: "RJ",
        duration: "2h 30min",
        transfers: 1,
        segments: [
          {
            trainType: "RJ",
            duration: "2h 30min",
            transfers: 1,
          },
          {
            trainType: "RJ",
            duration: "1h 30min",
            transfers: 1,
          },
        ],
        discount: "without_discounts",
        accessibility: {
          wheelchair: false,
          lowFloorAccess: true,
          assistanceAvailable: true,
        },
      },
    ],
  },
  "2025-03-21": {
    "Wien Hbf-Graz Hbf": [
      {
        id: "1",
        startStation: "Wien Hbf",
        endStation: "Graz Hbf",
        startTime: "14:35",
        endTime: "17:05",
        price: 29.9,
        date: "2025-03-21",
        trainType: "RJ",
        duration: "2h 30min",
        transfers: 0,
        segments: [
          {
            trainType: "RJ",
            duration: "2h 30min",
            transfers: 0,
          },
        ],
        discount: "without_discounts",
        accessibility: {
          wheelchair: false,
          lowFloorAccess: true,
          assistanceAvailable: true,
        },
      },
    ],
  },
};
