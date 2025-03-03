import type { Trip } from "../types/Trip";

export interface TripSegment {
  trainType: string;
  duration: string;
  transfers: number;
}

export interface ExtendedTrip extends Trip {
  segments: TripSegment[];
}

export const mockTrips: Record<string, ExtendedTrip[]> = {
  // Wien Hbf to Salzburg Hbf
  "Wien Hbf-Salzburg Hbf": [
    {
      id: 1,
      startStation: "Wien Hbf",
      endStation: "Salzburg Hbf",
      startTime: "08:25",
      endTime: "10:53",
      price: 29.9,
      segments: [
        {
          trainType: "RJX",
          duration: "2 Stunden 28 Min",
          transfers: 0,
        },
      ],
    },
    {
      id: 2,
      startStation: "Wien Hbf",
      endStation: "Salzburg Hbf",
      startTime: "10:30",
      endTime: "13:10",
      price: 24.9,
      segments: [
        {
          trainType: "ICE",
          duration: "2 Stunden 40 Min",
          transfers: 0,
        },
      ],
    },
    {
      id: 3,
      startStation: "Wien Hbf",
      endStation: "Salzburg Hbf",
      startTime: "14:55",
      endTime: "18:20",
      price: 19.9,
      segments: [
        {
          trainType: "REX",
          duration: "3 Stunden 25 Min",
          transfers: 1,
        },
      ],
    },
  ],

  // Wien Hbf to Graz Hbf
  "Wien Hbf-Graz Hbf": [
    {
      id: 4,
      startStation: "Wien Hbf",
      endStation: "Graz Hbf",
      startTime: "07:40",
      endTime: "10:12",
      price: 27.5,
      segments: [
        {
          trainType: "RJX",
          duration: "2 Stunden 32 Min",
          transfers: 0,
        },
      ],
    },
    {
      id: 5,
      startStation: "Wien Hbf",
      endStation: "Graz Hbf",
      startTime: "12:25",
      endTime: "15:45",
      price: 22.9,
      segments: [
        {
          trainType: "ICE",
          duration: "3 Stunden 20 Min",
          transfers: 1,
        },
      ],
    },
  ],

  // Wien Westbahnhof to Salzburg Hbf
  "Wien Westbahnhof-Salzburg Hbf": [
    {
      id: 6,
      startStation: "Wien Westbahnhof",
      endStation: "Salzburg Hbf",
      startTime: "09:15",
      endTime: "11:50",
      price: 28.9,
      segments: [
        {
          trainType: "RJX",
          duration: "2 Stunden 35 Min",
          transfers: 0,
        },
      ],
    },
    {
      id: 7,
      startStation: "Wien Westbahnhof",
      endStation: "Salzburg Hbf",
      startTime: "13:45",
      endTime: "17:20",
      price: 21.5,
      segments: [
        {
          trainType: "REX",
          duration: "3 Stunden 35 Min",
          transfers: 2,
        },
      ],
    },
  ],

  // Graz Hbf to Salzburg Hbf
  "Graz Hbf-Salzburg Hbf": [
    {
      id: 8,
      startStation: "Graz Hbf",
      endStation: "Salzburg Hbf",
      startTime: "08:10",
      endTime: "12:45",
      price: 34.9,
      segments: [
        {
          trainType: "ICE",
          duration: "4 Stunden 35 Min",
          transfers: 1,
        },
      ],
    },
    {
      id: 9,
      startStation: "Graz Hbf",
      endStation: "Salzburg Hbf",
      startTime: "11:30",
      endTime: "16:15",
      price: 29.9,
      segments: [
        {
          trainType: "RJX",
          duration: "4 Stunden 45 Min",
          transfers: 1,
        },
      ],
    },
  ],
};
