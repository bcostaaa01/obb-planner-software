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
      date: "2025-03-21",
      discount: "without_discounts",
      accessibility: {
        wheelchair: true,
        lowFloorAccess: true,
        assistanceAvailable: true,
      },
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
      date: "2025-03-21",
      discount: "family_card",
      accessibility: {
        wheelchair: false,
        lowFloorAccess: true,
        assistanceAvailable: true,
      },
    },
    {
      id: 3,
      startStation: "Wien Hbf",
      endStation: "Salzburg Hbf",
      startTime: "14:55",
      endTime: "18:20",
      price: 34.9,
      segments: [
        {
          trainType: "RJX",
          duration: "3 Stunden 25 Min",
          transfers: 1,
        },
      ],
      date: "2025-03-21",
      discount: "without_discounts",
      accessibility: {
        wheelchair: false,
        lowFloorAccess: true,
        assistanceAvailable: true,
      },
    },
  ],

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
      date: "2025-03-21",
      discount: "without_discounts",
      accessibility: {
        wheelchair: false,
        lowFloorAccess: true,
        assistanceAvailable: true,
      },
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
          trainType: "IC",
          duration: "3 Stunden 20 Min",
          transfers: 1,
        },
        {
          trainType: "RJX",
          duration: "3 Stunden 20 Min",
          transfers: 1,
        },
      ],
      date: "2025-03-21",
      discount: "student_card",
      accessibility: {
        wheelchair: false,
        lowFloorAccess: true,
        assistanceAvailable: true,
      },
    },
  ],

  "Graz Hbf-Wien Hbf": [
    {
      id: 6,
      startStation: "Graz Hbf",
      endStation: "Wien Hbf",
      startTime: "09:15",
      endTime: "11:50",
      price: 28.9,
      segments: [
        {
          trainType: "RJX",
          duration: "2 Stunden 35 Min",
          transfers: 0,
        },
        {
          trainType: "ICE",
          duration: "2 Stunden 35 Min",
          transfers: 0,
        },
      ],
      date: "2025-03-21",
      discount: "without_discounts",
      accessibility: {
        wheelchair: false,
        lowFloorAccess: true,
        assistanceAvailable: true,
      },
    },
  ],
};
